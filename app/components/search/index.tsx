"use client";
import React, { ChangeEvent } from "react";
import Draggable from "react-draggable";
import { useWindow } from "@/app/providers/window-providers";
import { useNavStack } from "@/app/providers/navstack-providers";
import { useAddress } from "@/app/providers/address-providers";
import WebPage from "../web-page";
import ResultsPage from "../results-page";
import Image from "next/image";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import ResultsDetail from "../results-detail";

export type Result = {
  id: number;
  title: string;
  content: string;
};

export default function Search() {
  const {
    isMinimized,
    handleSetMinimized,
    isMaximized,
    handleSetMaximized,
    isClosed,
    handleSetClosed,
  } = useWindow();
  const { stack, handleSetStack } = useNavStack();
  const { address, handleSetAddress } = useAddress();
  const [value, setValue] = React.useState("");
  const [results, setResults] = React.useState<Result[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = async () => {
    if (value === "") return;
    handleSetAddress(
      `http://www.google.com/search?q=${encodeURIComponent(value)}`
    );
    handleSetStack(2);
    setIsFetching(true);
    const data = await fetchData(value);
    setIsFetching(false);
    setResults(data);
  };

  const handleBack = async () => {
    handleSetStack(stack - 1 > 0 ? stack - 1 : 1);
  };

  const fetchData = async (query: string): Promise<Result[]> => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000?q=${query}`);
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  React.useEffect(() => {
    if (stack === 1) {
      setValue("");
      handleSetAddress("");
      setResults([]);
    }
  }, [stack]);

  return (
    !isMinimized &&
    !isClosed && (
      <Draggable handle='.handle'>
        <div
          className={twMerge(
            "window h-[90vh] mb-6",
            isMaximized ? "w-full h-[97%]" : "w-5/6 md:w-3/4"
          )}
        >
          <div className='title-bar handle'>
            <div className='title-bar-text'>Internet Explorer</div>
            <div className='title-bar-controls'>
              <button
                aria-label='Minimize'
                onClick={() => handleSetMinimized(true)}
              />
              {isMaximized && (
                <button
                  aria-label='Restore'
                  onClick={() => handleSetMaximized(false)}
                ></button>
              )}
              {!isMaximized && (
                <button
                  aria-label='Maximize'
                  onClick={() => handleSetMaximized(true)}
                />
              )}
              <button
                aria-label='Close'
                onClick={() => handleSetClosed(true)}
              />
            </div>
          </div>

          <div className='window-body !my-0 h-full overflow-hidden'>
            <div className='flex items-center gap-1 border-b-2 h-8 leading-8 border-gray-300 select-none'>
              <div
                className={twMerge(
                  "flex gap-1 px-1",
                  stack !== 1 ? "hover:shadow-md" : "hover:shadow-none",
                  stack !== 1 ? "cursor-pointer" : "cursor-not-allowed"
                )}
                onClick={handleBack}
              >
                <Image
                  loading='eager'
                  src='/back.png'
                  alt='Icon'
                  width={30}
                  height={30}
                  className={stack === 1 ? "saturate-0" : ""}
                />
                Back
              </div>
              {["File", "Edit", "View", "Tools", "Help"].map((item, index) => (
                <div
                  key={index}
                  className='hover:text-white hover:bg-[rgb(22,96,232)] cursor-pointer px-1'
                >
                  {item}
                </div>
              ))}
            </div>
            <div className='field-row px-3'>
              <label htmlFor='address-bar' className='text-gray-500'>
                Address
              </label>
              <input
                value={address}
                id='address-bar'
                type='text'
                disabled
                className='border-2 border-gray-500 w-full cursor-not-allowed'
              />
              <progress max='100' value='85'></progress>
            </div>
            <div className='h-[86%] bg-white overflow-auto pb-2 shadow-md border-2 border-gray-300'>
              {stack === 1 && (
                <WebPage onChange={handleChange} onEnter={handleSearch} />
              )}
              {stack === 2 && (
                <ResultsPage
                  results={results}
                  onChange={handleChange}
                  onEnter={handleSearch}
                  isFetching={isFetching}
                />
              )}
              {stack === 3 && <ResultsDetail />}
            </div>
          </div>
        </div>
      </Draggable>
    )
  );
}
