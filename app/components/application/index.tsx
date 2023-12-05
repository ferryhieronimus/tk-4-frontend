import React from "react";
import Image from "next/image";

interface ApplicationProps {
  additionalClass?: string;
  App: string;
  src: string;
}

const Application: React.FC<ApplicationProps> = ({ additionalClass, App, src }) => {
  return (
    <>
      <div
        className={`text-white px-2 flex flex-col items-center gap-1  ${additionalClass}`}
      >
        <Image src={src} alt='Icon' width={35} height={35} />
        <div className="menu-text text-xs break-words whitespace-pre-line">{App}</div>
      </div>
    </>
  );
};

export default Application;
