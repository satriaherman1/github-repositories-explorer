import Avatar from "@src/components/avatar";
import { ArrowDownIcon } from "@src/components/icons";
import RepoList from "@src/components/repo-list";
import RepoListSkeleton from "@src/components/repo-list/skeleton";
import GithubService from "@src/services/github.service";
import { GithubRepository } from "@src/types/github-repo";
import classNames from "classnames";
import { useEffect, useState } from "react";

type UserListProps = {
  className?: string;
  username: string;
  avatarUrl: string;
};

export default function UserList({
  username,
  className,
  avatarUrl,
}: UserListProps) {
  const [isOpenReposList, setIsOpenReposList] = useState<boolean>(false);
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const githubService = new GithubService();

  const getRepoList = async () => {
    try {
      setIsLoading(true);
      const req = await githubService.getRepos(username);
      setRepos(req);
    } catch (err) {
      console.log(err);
      setError("Failed to get repositories");
    } finally {
      setIsLoading(false);
    }
  };

  const renderRepoList = () => {
    switch (true) {
      case isLoading:
        return (
          <>
            <RepoListSkeleton />
            <RepoListSkeleton />
            <RepoListSkeleton />
            <RepoListSkeleton />
          </>
        );
      case !isLoading && repos.length > 0:
        return repos.map(({ description, id, name, stargazers_count }) => (
          <RepoList
            key={id}
            name={name}
            stargazers_count={stargazers_count}
            description={description}
            className="mx-4"
          />
        ));
      case !isLoading && repos.length === 0 && !error:
        return (
          <div className="px-4 py-3 m-4 rounded-lg bg-gray-100">
            <h3 className="text-lg text-center">No Repositories Found</h3>
          </div>
        );
    }
  };

  useEffect(() => {
    if (!isOpenReposList) return;
    if (repos?.length > 0) return;

    getRepoList();
  }, [isOpenReposList]);

  return (
    <div className={classNames(className, "bg-white overflow-hidden")}>
      <div
        data-testid="user-list-box"
        onClick={() => setIsOpenReposList(!isOpenReposList)}
        className={classNames(
          "flex justify-between bg-white p-5  items-center hover:bg-gray-100 cursor-pointer"
        )}
      >
        <section className="flex gap-x-3 items-center">
          <Avatar className="h-fit" imgUrl={avatarUrl} altText={username} />
          <div>
            <h2 data-testid="user-list-username">{username}</h2>
          </div>
        </section>

        <ArrowDownIcon
          width={15}
          height={15}
          fill="#303030"
          classname={classNames({
            "duration-300": true,
            "rotate-180": isOpenReposList,
          })}
        />
      </div>

      {/* repos list */}
      <div
        data-testid="repo-list-box"
        className={classNames({
          " space-y-2 duration-300 transition-all  bg-white": true,
          "max-h-0 overflow-hidden clip-path-inset-100": !isOpenReposList,
          "max-h-[100vh] overflow-y-scroll clip-path-inset-0 border-t border-gray-200":
            isOpenReposList,
        })}
      >
        {renderRepoList()}
        {error && (
          <div className="m-4 flex items-center gap-x-3 px-3 py-2 rounded-xl  border border-red-500 bg-red-100 text-red-900">
            <span className=" w-6 h-6 flex items-center font-semibold justify-center text-white bg-red-500 rounded-full ">
              i
            </span>{" "}
            <section>
              <p className="font-semibold">Oops! Something went wrong.</p>
              <p className="italic">{error}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
