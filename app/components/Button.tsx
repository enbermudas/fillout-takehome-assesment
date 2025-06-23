// Vendor
import { EllipsisVertical } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import classNames from "classnames";

// Types
import type { IconName } from "lucide-react/dynamic";

interface ButtonProps {
  text: string;
  iconName: IconName;
  isActive?: boolean;
  isAction?: boolean;
  onClick?: () => void;
}

export default function Button({ text, iconName, isActive = false, isAction = false, onClick }: ButtonProps) {
  const buttonClassName = classNames(
    "transition-all duration-300 ease-in-out flex items-center justify-center py-2 px-2.5 rounded-lg cursor-pointer border-1 focus:border-[#2F72E2]! focus:shadow-[0px_0px_0px_1.5px_rgba(147,_51,_234,_0.25)] bg-[rgba(157,164,178,0.15)] border-transparent hover:bg-[rgba(157,164,178,0.35)] hover:text-[#677289]",
    {
      "bg-[#FFFFFF]! shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2)] border-[#E1E1E1]!": isActive || isAction,
      "focus:border-[#E1E1E1]! focus:shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2)]!": isAction,
    },
  );

  const iconClassName = classNames("text-[#8C93A1]", {
    "text-[#F59D0E]": isActive,
    "text-[#1A1A1A]!": isAction,
  });

  const textClassName = classNames("ml-1.5 text-sm font-medium text-[#677289]", {
    "text-[#1A1A1A]! mr-2": isActive || isAction,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      <DynamicIcon className={iconClassName} name={iconName} size={20} />
      <span className={textClassName}>{text}</span>
      {isActive && (
        <EllipsisVertical
          className="text-[#9DA4B2] rounded-full transition-all duration-300 ease-in-out hover:bg-[rgba(157,164,178,0.15)]"
          size={16}
        />
      )}
    </button>
  );
}
