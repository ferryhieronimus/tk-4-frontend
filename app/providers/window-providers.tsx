"use client";
import React, { createContext, useContext, useState } from "react";
import { useNavStack } from "./navstack-providers";

interface WindowContextProps {
  isMinimized: boolean;
  handleSetMinimized: (minimized: boolean) => void;
  isMaximized: boolean;
  handleSetMaximized: (maximized: boolean) => void;
  isClosed: boolean;
  handleSetClosed: (closed: boolean) => void;
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined);

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const { handleSetStack } = useNavStack();

  const handleSetMinimized = (minimized: boolean) => {
    setIsMinimized(minimized);
  };

  const handleSetMaximized = (maximized: boolean) => {
    setIsMaximized(maximized);
  };

  const handleSetClosed = (closed: boolean) => {
    handleSetStack(1)
    setIsClosed(closed);
  };

  const contextValue: WindowContextProps = {
    isMinimized,
    handleSetMinimized,
    isMaximized,
    handleSetMaximized,
    isClosed,
    handleSetClosed,
  };

  return (
    <WindowContext.Provider value={contextValue}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const contextValue = useContext(WindowContext);

  if (!contextValue) {
    throw new Error("useWindow must be used within a WindowProvider");
  }

  return contextValue;
};
