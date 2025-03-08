import UserList from "@src/components/user-list";
import { fireEvent, render, screen } from "@testing-library/react";

const mockProps = {
  username: "satria",
  avatarUrl: "https://avatars.githubusercontent.com/u/46556496?v=4",
};

describe("Testing User List Component", () => {
  it("should render user list correctly", () => {
    render(<UserList {...mockProps} />);
    const userListBox = screen.getByTestId("user-list-box");
    const username = screen.getByTestId("user-list-username");

    expect(userListBox).toBeInTheDocument();
    expect(username).toHaveTextContent("satria");
  });

  it("should open repo list when user list clicked", () => {
    render(<UserList {...mockProps} />);

    const userListBox = screen.getByTestId("user-list-box");
    const repoListBox = screen.getByTestId("repo-list-box");

    fireEvent.click(userListBox);

    expect(repoListBox).toHaveClass("max-h-[100vh]");
  });
});
