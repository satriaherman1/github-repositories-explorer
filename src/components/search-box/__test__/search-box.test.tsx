import SearchBox from "@src/components/search-box";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";

const mockProps = {
  className: "custom-class",
  onType: vi.fn(),
  onSearch: vi.fn(),
  disabled: false,
  placeholder: "Search Repo by username",
  name: "search-input",
};

describe("Testing Search Box Component", () => {
  it("should render search box correctly", () => {
    render(<SearchBox {...mockProps} />);
    expect(screen.getByTestId("input-search")).toBeInTheDocument();
    expect(screen.getByTestId("button-search")).toBeInTheDocument();
  });

  it("should render input attribute correctly", () => {
    render(<SearchBox {...mockProps} />);

    const input = screen.getByTestId("input-search");

    expect(input).toHaveAttribute("placeholder", mockProps.placeholder);
    expect(input).toHaveAttribute("name", mockProps.name);
  });

  it("should disabled search button", () => {
    render(<SearchBox {...mockProps} disabled />);

    const button = screen.getByTestId("button-search");

    expect(button).toHaveAttribute("disabled");
  });

  it("should call onType when input onchange", () => {
    render(<SearchBox {...mockProps} />);
    const input = screen.getByTestId("input-search");

    fireEvent.change(input, { target: { value: "satria" } });

    expect(input).toHaveValue("satria");
    expect(mockProps.onType).toHaveBeenCalled();
  });

  it("should call onSearch when search button clicked", () => {
    render(<SearchBox {...mockProps} />);

    const button = screen.getByTestId("button-search");

    fireEvent.click(button);

    expect(mockProps.onSearch).toHaveBeenCalled();
  });
});
