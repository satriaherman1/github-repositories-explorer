import classNames from "classnames";
import { useState } from "react";

export type AvatarProps = {
  width?: string | number;
  height?: string | number;
  imgUrl: string;
  className?: string;
  altText: string;
  fallbackSrc?: string;
};

export default function Avatar({
  imgUrl,
  width = 30,
  height = 30,
  altText,
  fallbackSrc = "https://avatars.githubusercontent.com/u/360918?v=4",
  className,
}: AvatarProps) {
  const [imgSrc, setImgSrc] = useState<string>(imgUrl);
  return (
    <img
      data-testid="avatar"
      src={imgSrc}
      height={height}
      width={width}
      alt={altText}
      className={classNames(className, "rounded-full")}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
