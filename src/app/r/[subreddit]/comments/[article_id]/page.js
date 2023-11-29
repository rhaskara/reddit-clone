"use client"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Badge, Box, Button, Flex, Heading, Image, Link, SkeletonText, Text, Tooltip } from '@chakra-ui/react';
import Comment from '@/app/components/Comment';
import { fetchArticleAndComments } from '@/redux/features/articleSlice';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { REDDIT_API_BASE_URL } from '@/utils';

const ArticlePage = ({
  params
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { subreddit, article_id } = params;
  const articleLoading = useSelector((state) => state.article.loading);
  const articleData = useSelector((state) => state.article.articleData);
  const comments = useSelector((state) => state.article.comments);
  
  useEffect(() => {
    if (!subreddit) {
      router.replace('/');
    } else if (!article_id) {
      router.replace(`/r/${subreddit}`);
    } else {
      dispatch(fetchArticleAndComments(subreddit, article_id));
    }
  }, [dispatch, router, subreddit, article_id]);

  const handleRedirect = url => {
    router.push(url);
  }

  return (<Flex w="100%" justify="center">
    {
      (articleLoading || !articleData) ? (
        <Box p='6' boxShadow='lg' bg='white' w={{ base: "100%", lg: "80%", xl: "60%" }}>
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      ) : (
        <Box p={10} borderRadius="md" boxShadow='lg' bg='white' w={{ base: "100%", lg: "80%", xl: "60%" }}>
          <Button
            leftIcon={<ArrowLeftIcon/>}
            variant="link"
            p="0"
            size="sm"
            mb="2"
            onClick={() => handleRedirect(`/r/${subreddit}`)}
          >
            Back
          </Button>
          <Flex align="center" justify="space-between">
            <Heading size="md">{articleData?.title}</Heading>
            <Badge ml={2} justify="flex-end">{formatDistanceToNow(new Date(articleData?.created_utc * 1000))} ago</Badge>
          </Flex>
          {/* Render article content here */}
          <Text fontSize="sm" mt={2}>Posted by u/{articleData?.author}</Text>
          <Text fontSize="md">{ articleData?.selftext }</Text>
          {
            articleData?.url.includes('.png') || articleData?.url.includes('.jpg') ?
              <Image src={articleData.url} alt="Article Image" mb={2} />
            : null
          }
          {
            articleData?.url.includes('gifv') && (
              <Box w="100%" justify="center" display="flex" flexDirection="column" align="center">
                <Image src={articleData.thumbnail} alt="Article Gif Thumbnail" w={100} m="auto" />
                <Tooltip hasArrow label="Gifs aren't supported yet, but we got you covered!" shouldWrapChildren mt='3'>
                  <Link href={articleData?.url} target="_blank" _hover={{ color: "brand.100" }}>Click to Open in New Tab</Link>
                </Tooltip>
              </Box>
            )
          }
          {
            articleData?.permalink && (
              <Link href={`${REDDIT_API_BASE_URL}/${articleData?.permalink}`} target="_blank" _hover={{ color: "brand.100" }}>Permalink</Link>
            )
          }
          {comments.map(comment => (
            <Comment key={comment.data.id} comment={comment} />
          ))}
        </Box>
      )
    }
  </Flex>);
};

export default ArticlePage;
