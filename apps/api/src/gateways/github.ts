import { Octokit } from "@octokit/rest";

const getAuthenticatedUser = async (access_token: string) => {
    const octokit = new Octokit({ auth: access_token });
    return await octokit.rest.users.getAuthenticated();
}

export { getAuthenticatedUser };