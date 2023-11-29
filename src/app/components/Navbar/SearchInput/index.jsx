import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement, Tooltip } from '@chakra-ui/react';
import React from 'react';

const SearchInput = () => {
  return (
    <Flex
      align="center"
      flexGrow={1}
      ml={{
        base: 5,
        md: 10,
      }}
      mr={2}
    >
      <Tooltip hasArrow label='Disabled in this version' shouldWrapChildren mt='3'>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="white" mb={1} />
          </InputLeftElement>
          <Input
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
            _hover={{
              bg: "gray.600",
            }}
            _placeholder={{ color: "gray.400" }}
            bg="gray.700"
            border="0px"
            borderRadius="17px"
            color="white"
            fontSize="10pt"
            height="34px"
            minWidth="150px"
            placeholder="Search Reddit"
            width={{
              base: "50vw",
              md: "400px",
            }}
            disabled
          />
        </InputGroup>
      </Tooltip>
  </Flex>
  );
};

export default SearchInput;