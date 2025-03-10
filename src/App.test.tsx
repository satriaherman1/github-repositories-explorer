import App from "@src/App";
import GithubService from "@src/services/github.service";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

vi.spyOn(GithubService.prototype, "getUsers").mockImplementation(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            total_count: 3,
            items: [
              {
                login: "satria",
                avatar_url: "https://example.com/avatar1.png",
              },
              {
                login: "herman",
                avatar_url: "https://example.com/avatar2.png",
              },
              {
                login: "satriaherman",
                avatar_url: "https://example.com/avatar3.png",
              },
            ],
          }),
        200
      );
    })
);

describe("Testing App Component", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should render App Component correctly", () => {
    render(<App />);

    expect(
      screen.getByText("Github Repositories Explorer")
    ).toBeInTheDocument();
  });

  it("should change query when user type on search box", () => {
    render(<App />);
    const searchInput = screen.getByTestId("input-search");

    fireEvent.change(searchInput, { target: { value: "satria" } });

    expect(searchInput).toHaveValue("satria");
  });

  it("should call github api to when user type on search box or click on search button", async () => {
    render(<App />);

    const githubService = new GithubService();
    const searchInput = screen.getByTestId("input-search");
    const searchButton = screen.getByTestId("button-search");

    fireEvent.change(searchInput, { target: { value: "sat" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(githubService.getUsers).toHaveBeenCalled();
      expect(githubService.getUsers).toHaveBeenCalledWith("satria");
    });
  });

  it("should showing loading state while fetching users data", async () => {
    vi.useFakeTimers();
    render(<App />);

    const searchInput = screen.getByTestId("input-search");
    fireEvent.change(searchInput, { target: { value: "satria" } });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    // check if skeleton is showing
    expect(screen.queryAllByTestId("user-list-skeleton")).toHaveLength(5);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    // check if skeleton is disappear
    expect(screen.queryAllByTestId("user-list-skeleton")).toHaveLength(0);

    vi.useRealTimers();
  });

  it("should display error component when request to github api error", async () => {
    vi.spyOn(GithubService.prototype, "getUsers").mockRejectedValueOnce(
      new Error("Failed to get users data")
    );

    render(<App />);

    const searchInput = screen.getByTestId("input-search");

    fireEvent.change(searchInput, { target: { value: "budi hariyanto" } });

    await waitFor(() => {
      expect(screen.getByTestId("error-alert")).toBeInTheDocument();
    });
  });
});
