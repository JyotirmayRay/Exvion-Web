import React from "react";
import { icons } from "./registry";

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export const Icon = ({
  name,
  size = 20,
  color = "currentColor",
  className = "",
  strokeWidth = 1.5,
}: IconProps) => {
  const IconSvg = icons[name];
  if (!IconSvg) return null;
  return (
    <IconSvg
      width={size}
      height={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
};
