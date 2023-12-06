"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import ResultsRow from "../results-row";
import { useNavStack } from "@/app/providers/navstack-providers";
import { Result } from "../search";
import { Progress } from "@chakra-ui/react";
import { Cormorant_SC } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { useAddress } from "@/app/providers/address-providers";

const csc = Cormorant_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface ResultsPageProps {
  results: Result[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  isFetching: boolean;
  isError: boolean;
  isFirstFetching: boolean;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
  onChange,
  onEnter,
  isFetching,
  isError,
  isFirstFetching,
}) => {
  const { handleSetStack } = useNavStack();
  const { address, setAddress } = useAddress();
  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const visibleResults = results.slice(startIndex, endIndex);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView();
      if (page != 1) {
        setAddress(address.replace(`&page=${currentPage}`, `&page=${page}`));
      }
      setCurrentPage(page);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  return (
    <div className='relative h-full flex flex-col gap-4 p-8' ref={containerRef}>
      {isFetching && (
        <Progress
          size='xs'
          isIndeterminate
          className='absolute top-0 left-0 w-full'
        />
      )}
      {isError && (
        <Progress
          size='xs'
          isIndeterminate
          className='absolute top-0 left-0 w-full'
        />
      )}
      <div className='flex justify-between gap-4'>
        <Image
          src='/google.png'
          alt='Icon'
          width={120}
          height={184}
          onClick={() => handleSetStack(1)}
        />
        <InputGroup className='w-1/2 rounded-3xl'>
          <Input
            placeholder={"Search..."}
            className='rounded-none shadow-md'
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement onClick={onEnter} className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </InputRightElement>
        </InputGroup>
        <div className='invisible w-[120px]'></div>
      </div>
      <hr className='h-[2px] results-page-separator' />
      <div className='flex flex-col gap-8 h-full w-3/4 ml-16 mt-4'>
        {!isFirstFetching && !isError ? (
          results.length === 0 ? (
            <div className='h-4 -my-4'>No result</div>
          ) : (
            <div className='h-4 -my-4'>{`${results.length} Document(s) Found`}</div>
          )
        ) : null}
        {visibleResults.map((result, index) => (
          <ResultsRow key={index} result={result} />
        ))}
        <div>
          <div>
            {!isFirstFetching && results.length !== 0 && (
              <div className={`${csc.className} mx-auto select-none mt-8`}>
                <h1 className='flex justify-center text-7xl'>
                  <span className='text-[#0145C9]'>G</span>
                  <span className='text-[#CB0F08]'>o</span>
                  <span className='text-[#EEC238]'>ooooo</span>
                  <span className='text-[#0145C9]'>g</span>
                  <span className='text-[#2F9A30]'>o</span>
                  <span className='text-[#CB0F08]'>l</span>
                </h1>
              </div>
            )}
            <div className='flex mt-2 w-full justify-center'>
              {Array.from({ length: Math.ceil(results.length / 8) }).map(
                (_, index) => (
                  <p
                    className={twMerge(
                      "text-base w-8 text-center cursor-pointer",
                      currentPage === index + 1
                        ? "text-[rgb(22,96,232)]"
                        : "text-gray-700 hover:text-[rgb(22,96,232)] hover:underline"
                    )}
                    key={index}
                    onClick={() => {
                      handlePageChange(index + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {index + 1}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
        <div className='h-8 invisible'>End of result</div>
      </div>
    </div>
  );
};

export default ResultsPage;
