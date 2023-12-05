"use client";
import React, { createContext, useContext, useState } from "react";

interface AddressContextProps {
  address: string;
  handleSetAddress: (address: string) => void;
}

const AddressContext = createContext<AddressContextProps | undefined>(undefined);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState("");

  const handleSetAddress = (address: string) => {
    setAddress(address);
  };

  const contextValue: AddressContextProps = {
    address,
    handleSetAddress,
  };

  return (
    <AddressContext.Provider value={contextValue}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const contextValue = useContext(AddressContext);

  if (!contextValue) {
    throw new Error("useAddress must be used within a AddressProvider");
  }

  return contextValue;
};
