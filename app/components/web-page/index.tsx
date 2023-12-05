"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { placeholders } from "@/app/utils/placeholders";

interface WebPageProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

const WebPage: React.FC<WebPageProps> = ({ onChange, onEnter }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(
    placeholders[0]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  React.useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setCurrentPlaceholder(placeholders[index]);

      index = (index + 1) % placeholders.length;
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='h-full flex flex-col justify-center gap-8 items-center'>
      <Image src='/google.png' alt='Icon' width={272} height={184} />
      <InputGroup className='w-1/2 rounded-3xl'>
        <Input
          placeholder={currentPlaceholder}
          className='rounded-none shadow-md'
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement onClick={onEnter} className="cursor-pointer">
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
    </div>
  );
};

export default WebPage;
