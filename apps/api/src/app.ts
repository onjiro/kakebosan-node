import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import oauthPlugin from '@fastify/oauth2'
import { FastifyPluginAsync } from 'fastify';
import fastifyPrismaClient from "fastify-prisma-client";
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';


export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;


import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }
}

declare module "fastify" {
  interface Session {
    user_id: number
    id?: number
  }
}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  void fastify.register(fastifyPrismaClient);

  void fastify.register(oauthPlugin, {
    name: 'githubOAuth2',
    scope: [],
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID!,
        secret: process.env.GITHUB_CLIENT_SECRET!,
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION
    },
    callbackUri: process.env.GITHUB_CALLBACK_URL!,
    startRedirectPath: process.env.GITHUB_REDIRECT_PATH!,
  });

  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      maxAge: 60 * 60 * 24 * 7,
      secure: (process.env.SESSION_COOKIE_SECURE || '') === 'true',
    }
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
};

export default app;
export { app, options }
