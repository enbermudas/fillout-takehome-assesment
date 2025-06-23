// Vendor
import { Plus } from "lucide-react";

// Types
interface IconButtonProps {
  size?: number;
  onClick?: () => void;
}

export default function IconButton({ size = 16, onClick }: IconButtonProps) {
  return (
    <button
      className="bg-[#FFFFFF] rounded-full border-1 border-[#E1E1E1] p-1 shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2)] cursor-pointer"
      onClick={onClick}
    >
      <Plus color="#000000" size={size} />
    </button>
  );
}
