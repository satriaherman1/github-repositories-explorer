type ErrorAlertProps = {
  title?: string;
  description: string;
};

export default function ErrorAlert({
  title = "Oops! Something went wrong.",
  description,
}: ErrorAlertProps) {
  return (
    <div
      data-testid="error-alert"
      className="mt-3 flex items-center gap-x-3 px-3 py-2 rounded-xl  border border-red-500 bg-red-100 text-red-900"
    >
      <span className=" w-6 h-6 flex items-center font-semibold justify-center text-white bg-red-500 rounded-full ">
        i
      </span>
      <section>
        <p className="font-semibold">{title}</p>
        <p className="italic">{description}</p>
      </section>
    </div>
  );
}
