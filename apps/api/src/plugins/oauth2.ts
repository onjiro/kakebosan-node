import fp from 'fastify-plugin'
import oauthPlugin, { FastifyOAuth2Options } from '@fastify/oauth2'
import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }
}

export default fp<FastifyOAuth2Options>(async (fastify) => {
  fastify.register(oauthPlugin, {
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
});
