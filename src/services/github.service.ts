class GithubService {
  private token = import.meta.env.VITE_GITHUB_TOKEN;
  private baseUrl = import.meta.env.VITE_GITHUB_API_BASE_URL;

  async getUsers(query: string, limit: number = 5) {
    try {
      const req = await fetch(
        `${this.baseUrl}/search/users?q=${query}&per_page=${limit}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
          },
        }
      );

      if (!req.ok) {
        const errText = req.text();
        throw Error(`Failed to get username: ${errText}`);
      }

      return req.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async getRepos(username: string) {
    try {
      const req = await fetch(`${this.baseUrl}/users/${username}/repos`, {
        headers: {
          Authorization: `token ${this.token}`,
        },
      });

      if (!req.ok) {
        const errText = req.text();
        throw Error(`Failed to get repos: ${errText}`);
      }

      return req.json();
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  get retrieveToken() {
    return this.token;
  }

  set updateToken(newToken: string) {
    if (typeof newToken !== "string") return;

    this.token = newToken;
  }
}

export default GithubService;
