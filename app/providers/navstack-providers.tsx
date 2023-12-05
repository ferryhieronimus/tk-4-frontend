"use client";
import React, { createContext, useContext, useState } from "react";

interface NavStackContextProps {
  stack: number;
  handleSetStack: (stack: number) => void;
}

const NavStackContext = createContext<NavStackContextProps | undefined>(
  undefined
);

export const NavStackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stack, setStack] = useState(1);

  const handleSetStack = (stack: number) => {
    setStack(stack);
  };

  const contextValue: NavStackContextProps = {
    stack,
    handleSetStack,
  };

  return (
    <NavStackContext.Provider value={contextValue}>
      {children}
    </NavStackContext.Provider>
  );
};

export const useNavStack = () => {
  const contextValue = useContext(NavStackContext);

  if (!contextValue) {
    throw new Error("useNavStack must be used within a NavStackProvider");
  }

  return contextValue;
};
