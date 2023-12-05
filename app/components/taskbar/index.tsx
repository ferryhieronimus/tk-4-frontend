"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Tab from "../tab";
import React from "react";
import StartMenu from "../start-menu";
import { useWindow } from "@/app/providers/window-providers";

export default function Taskbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  const divRef = React.useRef<HTMLDivElement | null>(null);
  const { isMinimized } = useWindow();

  const handleSetIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  }

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleSetIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log("Clicked outside");
    if (divRef.current) {
      console.log("divRef.current:", divRef.current);
      console.log("event.target:", event.target);
      if (!divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      {isOpen && (
        <div ref={divRef} className='absolute bottom-8 left-0 z-50'>
          <StartMenu handleSetIsOpen={handleSetIsOpen}/>
        </div>
      )}
      <div className='fixed bottom-0 left-0 w-full taskbar flex justify-between items-center z-40 select-none'>
        <div className='flex items-center gap-2'>
          <Image
            priority
            onClick={handleImageClick}
            src='/windows-start.png'
            alt='Picture of the author'
            width={100}
            height={30}
            className='hover:brightness-110 active:brightness-90 select-none'
          />
          <div className='flex'>
            {isMinimized && (
              <Tab
                additionalClass='tab'
                App='Internet Explorer'
                src='/ie.png'
              />
            )}
            {!isMinimized && (
              <Tab
                additionalClass='tab-focus'
                App='Internet Explorer'
                src='/ie.png'
              />
            )}
          </div>
        </div>
        <div className='flex gap-1 px-2 h-8 taskbar-right items-center border-l-2 border-[#1559C7]'>
          <Image src='/audio.png' alt='audio' width={15} height={15} />
          <Image src='/settings.png' alt='settings' height={15} width={15} />
          <div
            className='text-white px-1 text-sm'
            suppressHydrationWarning={true}
          >
            {dayjs(time).format("HH:mm:ss")}
          </div>
        </div>
      </div>
    </>
  );
}
