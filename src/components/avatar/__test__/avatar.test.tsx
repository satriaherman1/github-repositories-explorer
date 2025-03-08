import Avatar, { AvatarProps } from "@src/components/avatar";
import { fireEvent, render, screen } from "@testing-library/react";

const mockProps: AvatarProps = {
  width: "80px",
  height: "80px",
  imgUrl: "https://avatars.githubusercontent.com/u/46556496?v=4",
  className: "w-[80px]",
  altText: "github-avatar-url",
  fallbackSrc: "https://avatars.githubusercontent.com/u/360918?v=4",
};

describe("Testing Avatar Component", () => {
  it("should render avatar component correctly", () => {
    render(<Avatar {...mockProps} />);

    const avatar = screen.getByTestId("avatar");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("width", "80px");
    expect(avatar).toHaveAttribute("height", "80px");
    expect(avatar).toHaveAttribute("alt", mockProps.altText);
    expect(avatar).toHaveAttribute("src", mockProps.imgUrl);
  });

  // negative test case

  it("should showing alt text when avatar is not loaded correctly", () => {
    render(<Avatar {...mockProps} imgUrl="" />);

    const avatar = screen.getByTestId("avatar");

    fireEvent.error(avatar);

    expect(avatar).toHaveAttribute("src", mockProps.fallbackSrc);
  });
});
