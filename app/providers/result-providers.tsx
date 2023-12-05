"use client";
import React, { createContext, useContext, useState } from "react";
import { Result } from "../components/search";

interface ResultContextProps {
  result: Result;
  handleSetResult: (result: Result) => void;
}

const ResultContext = createContext<ResultContextProps | undefined>(undefined);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [result, setResult] = useState({} as Result);

  const handleSetResult = (result: Result) => {
    setResult(result);
  };

  const contextValue: ResultContextProps = {
    result,
    handleSetResult,
  };

  return (
    <ResultContext.Provider value={contextValue}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const contextValue = useContext(ResultContext);

  if (!contextValue) {
    throw new Error("useResult must be used within a ResultProvider");
  }

  return contextValue;
};
