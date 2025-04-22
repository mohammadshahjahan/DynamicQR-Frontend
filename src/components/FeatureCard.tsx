import { ComponentType } from "react";
import Icon from "./Icon";
import { SvgIconProps } from "@mui/material";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ComponentType<SvgIconProps>;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-200">
    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 mb-5 text-xl">
      <Icon icon={icon} color="disabled" fontSize="medium" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
