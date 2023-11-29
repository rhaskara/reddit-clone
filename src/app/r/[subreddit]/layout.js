import { Box, Center, Heading } from '@chakra-ui/react';

export default function SubredditLayout({
  children,
  params
}) {
  const { subreddit } = params;

  return (
    <Box>
      <Box p={{base: "10px", md:"10p x 100px"}}>
        <Heading size="xl">r/{subreddit}</Heading>
      </Box>
      {children}
    </Box>
  )
}
