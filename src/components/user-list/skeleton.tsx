import classNames from "classnames";

type UserListSkeletonProps = {
  className?: string;
};

export default function UserListSkeleton({ className }: UserListSkeletonProps) {
  return (
    <div
      data-testid="user-list-skeleton"
      className={classNames(
        className,
        "flex justify-between bg-white py-7 px-5  items-center"
      )}
    >
      <section className="flex gap-x-3 items-center animate-pulse w-2/3">
        <div className="rounded-full  min-w-[30px] h-[30px] bg-gray-200"></div>
        <div className="w-full space-y-[10px]">
          <div className="py-[7px] rounded-full bg-gray-200 block"></div>
          <div className="py-[5px] w-2/3 rounded-full bg-gray-200 block"></div>
        </div>
      </section>
      <div className="rounded-full  min-w-8 h-8 bg-gray-200"></div>
    </div>
  );
}
