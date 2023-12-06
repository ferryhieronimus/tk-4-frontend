"use client";
import React, { createContext, useContext, useState } from "react";

interface AddressContextProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressContext = createContext<AddressContextProps | undefined>(
  undefined
);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [address, setAddress] = useState("");

  const contextValue: AddressContextProps = {
    address,
    setAddress,
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
