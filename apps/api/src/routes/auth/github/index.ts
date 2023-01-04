import { FastifyPluginAsync } from "fastify";
import { Octokit } from "@octokit/rest";
import pick from "underscore/modules/pick.js";

const githubCallback: FastifyPluginAsync = async (fastify, opts): Promise<void> => {


  void fastify.get('/callback', async function (request, reply) {
    const { token } = await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    fastify.log.info("access_token acquired.");

    const octokit = new Octokit({ auth: token.access_token });
    const githubUser = await octokit.rest.users.getAuthenticated();
    fastify.log.info(pick(githubUser.data, "id", "login", "name"), "github user:");

    const provider = "github"
    const uid = githubUser.data.id.toString();
    const name = githubUser.data.name;

    const user = await fastify.prisma.users.findFirst({
      where: { provider, uid },
      select: { id: true }
    });

    if (user) {
      fastify.log.info(user, "users.id:");
      request.session.user_id = user.id;

    } else {
      fastify.log.info("user not found.");
      const createdUser = await fastify.prisma.users.create({
        data: { provider, uid, name },
        select: { id: true }
      });
      fastify.log.info(createdUser, "user created. id:");
      request.session.user_id = createdUser.id;
    }

    return "ok"
  });
}

export default githubCallback;
