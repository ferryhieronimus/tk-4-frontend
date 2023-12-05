import React from "react";
import Image from "next/image";
import { LeftMenu, RightMenu } from "../menu";
import { useWindow } from "@/app/providers/window-providers";

interface StartMenuProps {
  handleSetIsOpen: (isOpen: boolean) => void;
}
const StartMenu: React.FC<StartMenuProps> = ({ handleSetIsOpen }) => {
  const { handleSetClosed } = useWindow();

  return (
    <div className='h-[500px] w-[400px] start-menu rounded flex flex-col select-none'>
      <div className='flex start-menu-header p-2 rounded-t items-center gap-2'>
        <Image
          priority
          src={"/profilepicture.jpg"}
          alt='Icon'
          width={40}
          height={40}
          className='rounded border-2 border-gray-200'
        />
        <h2 className='text-sm text-white menu-text font-bold'>
          Ferry & Rahmat
        </h2>
      </div>

      <div className='flex flex-col flex-1 '>
        <hr className='hr-orange h-[2px] border-none' />
        <div className='flex-1 flex'>
          <div className='flex-1 h-full bg-white'>
            <div
              onClick={() => {
                handleSetClosed(false);
                handleSetIsOpen(false);
              }}
            >
              <LeftMenu
                title='Internet'
                desc='Internet Explorer'
                src='/iemenu.png'
              />
            </div>
            <LeftMenu
              title='Temu Balik Informasi'
              desc='SceLe CSUI'
              src='/ui.png'
            />
            <hr className='h-[2px]' />
            <LeftMenu title='Paint' src='/paint.png' />
            <LeftMenu title='Winamp' src='/winamp.png' />
            <LeftMenu title='Windows Media Player' src='/wmp.png' />
            <LeftMenu title='Minesweeper' src='/minesweeper.png' />
          </div>
          <div className='flex-1 start-menu-body-right h-full'>
            <RightMenu title='My Computer' src='/mycomputer.png' bold />
            <RightMenu title='My Documents' src='/mydocs.png' bold />
            <RightMenu title='My Pictures' src='/mypics.png' bold />
            <hr className='h-[2px] my-1 border-none right-menu-separator' />
            <RightMenu title='Control Panel' src='/control-panel.png' />
            <RightMenu title='Printers and Faxes' src='/paf.png' />
            <RightMenu title='Help' src='/help.png' />
          </div>
        </div>
      </div>

      <div className='flex justify-end start-menu-footer p-2 rounded-t items-center gap-2'>
        <div className='flex gap-1 text-white menu-text items-center'>
          <Image
            src={"/logoff.png"}
            alt='Icon'
            width={25}
            height={25}
            className='rounded overflow-hidden hover:brightness-110 active:brightness-90 select-none'
          />
          Log Off
        </div>
        <div className='flex gap-1 text-white menu-text items-center'>
          <Image
            src={"/poweroff.png"}
            alt='Icon'
            width={25}
            height={25}
            className='rounded overflow-hidden hover:brightness-110 active:brightness-90 select-none'
          />
          Shut Down
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
