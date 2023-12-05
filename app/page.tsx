"use client";
import React from "react";
import Application from "./components/application";
import Search from "./components/search";
import Taskbar from "./components/taskbar";
import { useWindow } from "@/app/providers/window-providers";

export default function Home() {
  const { handleSetClosed } = useWindow();
  return (
    <main className='bg-hero bg-no-repeat bg-cover bg-center bg-fixed h-screen overflow-hidden flex justify-center items-center'>
      <div className='absolute left-2 top-6 flex flex-col gap-8 z-0'>
        <div
          onDoubleClick={() =>
            window.open("https://scele.cs.ui.ac.id/", "_blank")
          }
        >
          <Application App={"SCeLE"} src={"/ui.png"} />
        </div>
        <Application App={"My Computer"} src={"/mycomputer.png"} />
        <Application App={"Recycle Bin"} src={"/recycle-bin.png"} />
        <div
          onDoubleClick={() =>
            window.open(
              "https://amv.ui.ac.id/autonomous-surface-vehicle/",
              "_blank"
            )
          }
        >
          <Application App={"AMV UI"} src={"/amvui.jpg"} />
        </div>
        <div onDoubleClick={() => handleSetClosed(false)}>
          <Application App={"Internet\nExplorer"} src={"/iemenu.png"} />
        </div>
      </div>
      <Search />
      <Taskbar />
    </main>
  );
}
