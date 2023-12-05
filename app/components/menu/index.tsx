import React, { useRef } from "react";
import Image from "next/image"; // Replace with the actual library you are using

interface MenuProps {
  title: string;
  desc?: string;
  src: string;
  bold?: boolean;
}

export const LeftMenu: React.FC<MenuProps> = ({ title, desc, src }) => {
  const hoverRef = useRef(false);

  return (
    <div
      className={`flex gap-2 items-center px-2 py-2 ${
        hoverRef.current
          ? "bg-[#4282d6] text-white"
          : "hover:bg-[#4282d6] hover:text-white"
      }`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <Image loading="eager" src={src} alt='Icon' width={30} height={30} />
      {desc && (
        <div className='flex flex-col'>
          <div
            className={`text-xs font-bold ${
              hoverRef.current ? "text-white" : ""
            }`}
          >
            {title}
          </div>
          <div
            className={`text-xs text-gray-500${
              hoverRef.current && "!text-white"
            }`}
          >
            {desc}
          </div>
        </div>
      )}
      {!desc && (
        <div className='flex flex-col items-center gap-1'>
          <div className={`text-xs ${hoverRef.current ? "text-white" : ""}`}>
            {title}
          </div>
        </div>
      )}
    </div>
  );
};

export const RightMenu: React.FC<MenuProps> = ({ title, bold, src }) => {
  return (
    <div className="flex gap-2 items-center px-2 py-1 hover:bg-[#4282d6] text-blue-900 hover:text-white">
      <Image loading="eager" src={src} alt="Icon" width={28} height={28} />
      <div className="flex flex-col">
        <div className={`text-xs ${bold && '!font-bold'}`}>
          {title}
        </div>
      </div>
    </div>
  );
};

