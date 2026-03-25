import React from "react";
import { Icon } from "./Icon";
import type { ServiceConfig } from "@exvion/types";

interface ServiceIconProps {
  iconId: ServiceConfig["iconId"];
  size?: number;
  color?: string;
  className?: string;
}

export const ServiceIcon = ({
  iconId,
  size = 24,
  color,
  className = "",
}: ServiceIconProps) => (
  <Icon
    name={iconId as any}
    size={size}
    color={color || "currentColor"}
    className={className}
  />
);
