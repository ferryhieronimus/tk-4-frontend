"use client";
import React from "react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Result } from "../search";
import { useNavStack } from "@/app/providers/navstack-providers";
import { useResult } from "@/app/providers/result-providers";

interface ResultsRowProps {
  result: Result;
}

const ResultsRow: React.FC<ResultsRowProps> = ({ result }) => {
  const { handleSetStack } = useNavStack();
  const { handleSetResult } = useResult();

  const handleClick = () => {
    handleSetResult(result);
    handleSetStack(3);
  };

  return (
    <div className='w-full flex flex-col gap-2' onClick={handleClick}>
      <Heading as='h1' size='md' noOfLines={1} color='blue.700' className="hover:underline">
        {result.title}
      </Heading>
      <Text fontSize='sm' noOfLines={2} color='gray.700'>
        {result.content}
      </Text>
    </div>
  );
};

export default ResultsRow;
