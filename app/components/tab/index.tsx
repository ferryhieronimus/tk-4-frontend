import React from "react";
import Image from "next/image";
import { useWindow } from "@/app/providers/window-providers";

interface TabProps {
  additionalClass?: string;
  App: string;
  src: string;
}

const Tab: React.FC<TabProps> = ({ additionalClass, App, src }) => {
  const { isMinimized, handleSetMinimized, isClosed } =
    useWindow();

  return (
    !isClosed && (
      <div
        className={`h-6 w-40 rounded-sm text-white px-2 flex items-center gap-1 ${additionalClass} select-none`}
        onClick={() => {
          handleSetMinimized(!isMinimized);
        }}
      >
        <Image src={src} alt='Icon' width={15} height={15} />
        {App}
      </div>
    )
  );
};

export default Tab;
