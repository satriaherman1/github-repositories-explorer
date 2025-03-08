export default function RepoListSkeleton() {
  return (
    <div className="m-4 flex justify-between bg-gray-50  rounded-lg px-4 py-3">
      <section className="animate-pulse space-y-2 w-full">
        <div className="py-2 w-2/3 bg-gray-300 rounded-lg"></div>
        <div className="py-1 w-1/3 bg-gray-300 rounded-lg text-sm"></div>
      </section>

      <div className="flex space-x-2 items-start w-fit">
        <span className="h-5 rounded-full w-5 bg-gray-300 text-sm"></span>
        <div className="w-5 h-5 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
