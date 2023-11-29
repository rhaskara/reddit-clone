'use client'

import { Button, Center, Flex, Heading } from "@chakra-ui/react"

 
export default function GlobalError({ error, reset }) {
  return (
    <Center>
      <Flex direction="column" justify="center" align="center">
        <Heading mt={20} size="md" color="brand.100">Something went wrong!</Heading>
        <Button
          mt={5}
          bg="black"
          color="brand.100"
          onClick={() => reset()}
          _hover={{
            bg: "white"
          }}
        >
          Try again
        </Button>
      </Flex>
    </Center>
  )
}