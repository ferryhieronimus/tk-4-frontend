"use client";
import React from "react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useResult } from "@/app/providers/result-providers";
import { useAddress } from "@/app/providers/address-providers";

const ResultsDetail: React.FC = () => {
  const { result } = useResult();
  const { setAddress } = useAddress();

  setAddress(`http://www.google.com/${encodeURIComponent(result.title)}`)

  return (
    <div className='w-full max-w-screen-xl flex flex-col gap-2 p-16'>
      <Heading as='h1' size='lg' color='blue.900'>
        {result.title}
      </Heading>
      <hr className='my-4' />
      <Text fontSize='md' color='gray.600'>
        {result.content}
      </Text>
    </div>
  );
};

export default ResultsDetail;
