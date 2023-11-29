"use client"
import { usePathname, useRouter } from 'next/navigation';
import { Box, Flex, Text, IconButton, Spacer, Badge, Heading, Image, SkeletonText } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { upvotePost, downvotePost } from '@/redux/features/listingSlice';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { formatDistanceToNow } from 'date-fns';
import { UserVoteValue, ViewMode } from '@/utils';

const ListingComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const posts = useSelector((state) => state.listing.posts);
  const loading = useSelector((state) => state.listing.loading);
  const viewMode = useSelector((state) => state.view.mode);
  const userVotes = useSelector((state) => state.listing.userVotes);
  const initialLoad = useSelector((state) => state.listing.initialLoad);
  const handleRedirect = url => {
    router.push(url);
  }

  return (
    <Box>
      {loading && initialLoad ? (
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      ) : (
        <>
          {posts.map((post) => (
            <Box
              bg="white"
              borderRadius={viewMode === ViewMode.CARD ? "md" : "0"}
              boxShadow="md"
              key={post.data.id}
              mb={viewMode === ViewMode.CARD ? 10 : 0} p={10}
              onClick={() => handleRedirect(`/r/${post.data.subreddit}/comments/${post.data.id}`)}
              _hover={{
                bg: "gray.100",
                cursor: "pointer",
              }}
            >
              <Flex direction="column" justify="space-between" h="100%">
                { pathname === '/' && (
                  <Heading
                    size="sm"
                    mb={4}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRedirect(`/r/${post.data.subreddit}`)
                    }}
                    _hover={{
                      color: "brand.100",
                      cursor: "pointer",
                    }}
                  >
                    r/{post.data.subreddit}
                  </Heading>
                )}
                <Flex align="center" justify="space-between">
                  <Heading size="md" noOfLines={1}>{post.data.title}</Heading>
                  <Badge ml={2} justify="flex-end">{formatDistanceToNow(new Date(post.data.created_utc * 1000))} ago</Badge>
                </Flex>
                <Text fontSize="sm" mt={2}>Posted by u/{post.data.author}</Text>
                {viewMode === ViewMode.CARD && (
                  <>
                    {Boolean(post.data.selftext) ? (
                      <Text fontSize="sm">{post.data.selftext}</Text>
                    ) : (
                      post.data.url.includes('.png') || post.data.url.includes('.jpg') ?
                        <Image src={post.data.url} alt="Post Preview" mb={2} />
                      : null
                    )}
                  </>
                )}
                <Flex align="center" mt={4}>
                  <IconButton
                    aria-label="Upvote"
                    icon={<TriangleUpIcon />}
                    size="md"
                    variant="ghost"
                    color={userVotes[post.data.id] === UserVoteValue.INCREMENT ? 'brand.100' : 'gray.500'}
                    _hover={{
                      color: 'brand.100',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(upvotePost(post.data.id))
                    }}
                  />
                  <Text fontSize="sm" mx={2} alignSelf="center">{post.data.score}</Text>
                  <IconButton
                    aria-label="Downvote"
                    icon={<TriangleDownIcon />}
                    size="md"
                    variant="ghost"
                    color={userVotes[post.data.id] === UserVoteValue.DECREMENT ? 'brand.100' : 'gray.500'}
                    _hover={{
                      color: 'brand.100',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(downvotePost(post.data.id))
                    }}
                  />
                  <Spacer />
                  <Text fontSize="sm">{post.data.num_comments} comments</Text>
                </Flex>
              </Flex>
            </Box>
          ))}
          { loading && (
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ListingComponent;