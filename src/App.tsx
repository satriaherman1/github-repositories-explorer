import SearchBox from "@src/components/search-box";
import UserList from "@src/components/user-list";
import UserListSkeleton from "@src/components/user-list/skeleton";
import GithubService from "@src/services/github.service";
import { GithubUser, GithubUserSearchResponse } from "@src/types/github-user";
import debounce from "just-debounce-it";
import { useEffect, useRef, useState } from "react";

function App() {
  const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const githubService = new GithubService();

  const getGithubUsers = async (query: string) => {
    try {
      setIsNotFound(false);
      setError("");
      setIsLoading(true);
      const req: GithubUserSearchResponse = await githubService.getUsers(query);

      if (req.total_count === 0) setIsNotFound(true);

      setGithubUsers(req.items);
    } catch (err) {
      console.log(err);
      setError("Failed to get users data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOntype = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOnSearch = () => {
    if (searchQuery.length === 0) setGithubUsers([]);
    if (searchQuery.length > 2) {
      getGithubUsers(searchQuery);
    }
  };

  const debouncedSearchUsers = useRef(
    debounce((query: string) => getGithubUsers(query), 600)
  ).current;

  useEffect(() => {
    if (searchQuery.length === 0) {
      debouncedSearchUsers.cancel();
      setIsNotFound(false);
      setGithubUsers([]);
    }
    if (searchQuery.length > 2) {
      debouncedSearchUsers(searchQuery);
    }
  }, [searchQuery]);

  console.log(isLoading);

  const renderUserList = (key: number, username: string, avatarUrl: string) => {
    switch (true) {
      case githubUsers.length === 1:
        return (
          <UserList
            key={username}
            className="rounded-lg border-b border-gray-200"
            username={username}
            avatarUrl={avatarUrl}
          />
        );
      case key === 0:
        return (
          <UserList
            key={username}
            className="rounded-t-lg border-b border-gray-200"
            username={username}
            avatarUrl={avatarUrl}
          />
        );
      case key === githubUsers.length - 1:
        return (
          <UserList
            key={username}
            username={username}
            avatarUrl={avatarUrl}
            className="rounded-b-lg"
          />
        );

      default:
        return (
          <UserList
            key={username}
            username={username}
            avatarUrl={avatarUrl}
            className="border-b border-gray-200"
          />
        );
    }
  };

  return (
    <main className="py-10 container px-3 max-w-[800px] mx-auto ">
      <h1 className="text-center uppercase">Github Repositories Explorer </h1>
      <p className="text-center mt-1">Search Github Repository by username</p>
      {error && (
        <div className="mt-3 flex items-center gap-x-3 px-3 py-2 rounded-xl  border border-red-500 bg-red-100 text-red-900">
          <span className=" w-6 h-6 flex items-center font-semibold justify-center text-white bg-red-500 rounded-full ">
            i
          </span>
          <section>
            <p className="font-semibold">Oops! Something went wrong.</p>
            <p className="italic">{error}</p>
          </section>
        </div>
      )}

      <SearchBox
        name="search-box"
        disabled={isLoading || searchQuery.length < 3}
        onSearch={handleOnSearch}
        onType={handleOntype}
        className="mt-5"
      />

      {searchQuery.length >= 3 && (
        <div className="w-fit rounded-full  px-3 py-1 text-sm bg-white my-3">
          Showing Users for <b>{searchQuery}</b>
        </div>
      )}

      <div className="mt-3">
        {isLoading ? (
          <>
            <UserListSkeleton className="rounded-t-lg" />
            <UserListSkeleton />
            <UserListSkeleton />
            <UserListSkeleton />
            <UserListSkeleton className="rounded-b-lg" />
          </>
        ) : (
          githubUsers?.map(({ login, avatar_url }, key) =>
            renderUserList(key, login, avatar_url)
          )
        )}

        {isNotFound && (
          <div className="bg-white p-4 rounded-lg text-center">
            <img
              src="/ilustration/not-found.svg"
              className="mx-auto w-[90%] max-w-[400px]"
            />
            <h3 className="text-xl font-semibold mt-4">
              We couldn't find this user
            </h3>
            <span>User not found or renamed.</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
