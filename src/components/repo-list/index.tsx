import { StartIcon } from "@src/components/icons";
import classNames from "classnames";

type RepoListProps = {
  name: string;
  description: string | null;

  stargazers_count: number;
  className?: string;
};

export default function RepoList({
  name,
  description,
  stargazers_count,
  className,
}: RepoListProps) {
  return (
    <div
      data-testid="repo-list-box"
      className={classNames(
        className,
        "m-4 gap-x-2 flex justify-between bg-gray-100  rounded-lg px-4 py-3"
      )}
    >
      <section>
        <h3 data-testid="repo-list-name">{name}</h3>
        <p
          data-testid="repo-list-description"
          className="text-gray-600 text-sm break-words   mt-1"
        >
          {description}
        </p>
      </section>

      <div className="flex gap-x-2 items-start">
        <span className="leading-[12px] text-sm">({stargazers_count})</span>
        <StartIcon width={15} height={15} />
      </div>
    </div>
  );
}
