"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import ResultsRow from "../results-row";
import { useNavStack } from "@/app/providers/navstack-providers";
import { Result } from "../search";
import { Progress } from "@chakra-ui/react";

interface ResultsPageProps {
  results: Result[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  isFetching: boolean;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
  onChange,
  onEnter,
  isFetching,
}) => {
  const { handleSetStack } = useNavStack();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className='relative h-full flex flex-col gap-4 p-8'>
      {isFetching && (
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
          <InputRightElement>
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
        {results.map((result, index) => (
          <ResultsRow key={index} result={result} />
        ))}
        <div className='h-8 invisible'>End of result</div>
      </div>
    </div>
  );
};

export default ResultsPage;
