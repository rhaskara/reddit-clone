'use client'

import { Button, Flex, Image, Tooltip } from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import React from 'react';
import SearchInput from './SearchInput';
import { NAVBAR_HEIGHT } from '@/utils';

const Navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return <Flex
    bg="black"
    height={NAVBAR_HEIGHT}
    padding="0px 8px"
    position="fixed"
    top="0"
    width="100%"
    zIndex="1000"
  >
    <Flex align="center">
      <Tooltip hasArrow label='Go to Home' shouldWrapChildren mt='3'>
        <Button
          id="home-button"
          onClick={handleClick}
          leftIcon={
            <Image alt="reddit-logo" height="32px" src="/images/redditFace.svg" />
          }
          variant="ghost"
          color="inherit"
          _hover={{ backgroundColor: "transparent", borderColor: "transparent" }}
        >
          <Image
            alt="reddit-text"
            display={{ base: "none", md: "unset" }}
            height="54px"
            src="/images/redditTextWhite.svg"
          />
        </Button>
      </Tooltip>
      <SearchInput />
    </Flex>
  </Flex>;
}

export default Navbar;
