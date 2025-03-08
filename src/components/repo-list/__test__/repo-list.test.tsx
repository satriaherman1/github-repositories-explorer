import RepoList from "@src/components/repo-list";
import { render, screen } from "@testing-library/react";

const mockProps = {
  name: "cloudplexo",
  description: "cloudplexo project",
  stargazers_count: 3,
};

describe("Testing Repo List Component", () => {
  it("should render repo list correctly", () => {
    render(<RepoList {...mockProps} />);

    const repoListBox = screen.getByTestId("repo-list-box");
    const repoListName = screen.getByTestId("repo-list-name");
    const repoListDescription = screen.getByTestId("repo-list-description");

    expect(repoListBox).toBeInTheDocument();
    expect(repoListName).toHaveTextContent("cloudplexo");
    expect(repoListDescription).toHaveTextContent("cloudplexo project");
  });
});
