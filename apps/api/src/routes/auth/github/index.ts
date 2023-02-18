import { FastifyPluginAsync } from "fastify";
// @ts-ignore
import pick from "underscore/modules/pick.js";
import * as users from "@gateways/users";
import * as github from "@gateways/github";

const githubCallback: FastifyPluginAsync = async (fastify, opts): Promise<void> => {


  void fastify.get('/callback', async function (request, reply) {
    // request to token
    const { token } = await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    fastify.log.info("access_token acquired.");

    // token to github user
    const githubUser = await github.getAuthenticatedUser(token.access_token);
    fastify.log.info(pick(githubUser.data, "id", "login", "name"), "github user:");

    const uid = githubUser.data.id.toString();
    const name = githubUser.data.name || "";

    // github user to app user
    const user = await users.findByGitHubId(fastify.prisma, uid)
      || await users.createWithGitHubId(fastify.prisma, uid, name);

    // set user_id to session
    fastify.log.info(user, "users.id:");
    request.session.user_id = user.id;

    return "ok"
  });
}

export default githubCallback;
