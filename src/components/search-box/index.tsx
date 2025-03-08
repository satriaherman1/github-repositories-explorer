import { SearchIcon } from "@src/components/icons";
import classNames from "classnames";
import "./styles.css";

type SearchBoxProps = {
  className?: string;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder?: string;
  onSearch: () => void;
  name: string;
};

export default function SearchBox({
  className,
  onType,
  onSearch,
  disabled,
  name,
  placeholder = "Type here to search",
}: SearchBoxProps) {
  return (
    <section
      className={classNames(
        className,
        "p-5 md:p-9 rounded-2xl bg-white shadow-lg"
      )}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <section className="flex gap-x-2 items-center w-full bg-slate-100 rounded-lg px-3 py-2">
          <SearchIcon width={20} height={20} />
          <input
            onChange={onType}
            placeholder={placeholder}
            name={name}
            data-testid="input-search"
            type="text"
            className="w-full outline-none  "
          />
        </section>
        <button
          data-testid="button-search"
          disabled={disabled}
          onClick={onSearch}
          className="disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer w-full md:w-fit hover:bg-gray-700 bg-gray-800 py-2 px-4 rounded-lg text-white"
        >
          SEARCH
        </button>
      </div>
    </section>
  );
}
