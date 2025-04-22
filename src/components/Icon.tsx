import { SvgIconProps } from "@mui/material";
import React, { ComponentType } from "react";

interface IconProps extends SvgIconProps {
  icon: ComponentType<SvgIconProps>;
}

const Icon = ({ icon: IconComponent, ...props }: IconProps) => (
  <IconComponent {...props} />
);

export default Icon;
