// Vendors
import { useRef } from "react";
import classNames from "classnames";

// Hooks
import onClickOutside from "@/app/hooks/onClickOutside";

// Components
import Button from "@/app/components/Button";

// Types
interface SettingsMenProps {
  isShowing: boolean;
  position: {
    x: number;
    y: number;
  };
  handleHide: () => void;
  handleDelete: () => void;
  handleDuplicate: () => void;
}

export default function SettingsMenu({
  isShowing,
  position,
  handleHide,
  handleDelete,
  handleDuplicate,
}: SettingsMenProps) {
  const wrapperRef = useRef(null);
  onClickOutside(wrapperRef, handleHide);

  const settingsClassName = classNames(
    "absolute opacity-0 invisible bg-[#ffffff] rounded-xl max-w-[240px] w-full border-1 border-[#E1E1E1] transition-all duration-300 ease-in-out z-30 shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2)]",
    { "opacity-100 visible": isShowing },
  );

  return (
    <div
      ref={wrapperRef}
      className={settingsClassName}
      style={{ transform: "translate(-50%, 0)", top: "130px", left: position.x }}
    >
      <div className="bg-[#FAFBFC] p-3 font-medium text-base text-[#1A1A1A] rounded-t-xl">Settings</div>
      <div className="px-3 pt-3 pb-3.5 flex gap-1 flex-col items-start border-t-1 border-[#E1E1E1]">
        <Button text="Set as first page" iconName="flag" iconColor="#2F72E2" isAction isGhost />
        <Button text="Rename" iconName="pencil-line" isAction isGhost />
        <Button text="Copy" iconName="clipboard" isAction isGhost />
        <Button text="Duplicate" iconName="copy" isAction isGhost onClick={handleDuplicate} />
        <div className="w-full h-[1px] bg-[#E1E1E1]"></div>
        <Button text="Delete" iconName="trash" isAction isGhost buttonContext="danger" onClick={handleDelete} />
      </div>
    </div>
  );
}
