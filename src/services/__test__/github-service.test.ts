import GithubService from "@src/services/github.service";
import { GithubRepository } from "@src/types/github-repo";
import { GithubUserSearchResponse } from "@src/types/github-user";

describe("Testing Github Service (Real Request)", () => {
  const githubService = new GithubService();

  it("should fetch users data from github api correctly", async () => {
    const users: GithubUserSearchResponse = await githubService.getUsers(
      "satriaherman"
    );

    expect(users).toHaveProperty("items");
    expect(users.items.length).toBeGreaterThan(0);
    expect(users.items[0]).toHaveProperty("login");
  });

  it("should paginate user data correctly", async () => {
    const req: GithubUserSearchResponse = await githubService.getUsers(
      "satr",
      10
    );

    expect(req.total_count).toBeGreaterThan(0);
    expect(req.items.length).toEqual(10);
  });

  it("should fetch user's repository based from users correctly", async () => {
    const repos: GithubRepository[] = await githubService.getRepos(
      "satriaherman1"
    );

    expect(repos.length).toBeGreaterThan(0);
    expect(repos[0]).toHaveProperty("name");
  });

  //   negative test case
  it("should throw and error when fetching request with invalid token", () => {
    const invalidGithubService = new GithubService();

    invalidGithubService.updateToken = "";

    expect(invalidGithubService.getUsers("satria")).rejects.toThrow();
  });
});
