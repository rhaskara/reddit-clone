"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Select } from "@chakra-ui/react";
import { fetchPosts } from '@/redux/features/listingSlice';
import { setView } from '@/redux/features/viewTypeSlice';
import PostList from './PostList';
import SortingOptions from './SortingOptions';
import { ViewMode } from '@/utils';

const PostListWrapper = ({
  queryURLPathname,
  sortOption,
  subreddit,
}) => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.view.mode);
  const after = useSelector((state) => state.listing.after);
  const isFetching = useSelector((state) => state.listing.loading);

  const fetchMore = () => {
    // Call fetchPosts with the 'after' parameter and reset false
    dispatch(fetchPosts(queryURLPathname, after, false));
  };

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) &&
      !isFetching
    ) {
      fetchMore();
    }
  };
  
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debounceScroll = debounce(handleScroll, 500);

  useEffect(() => {
    // Fetch posts when the component mount
    dispatch(fetchPosts(queryURLPathname, null, true));
  }, [dispatch, queryURLPathname]);

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener('scroll', debounceScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', debounceScroll);
    };
  }, [debounceScroll]);

  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center">
        <Flex
          direction="column"
          width={{ base: "100%", lg: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          <Flex justify={queryURLPathname ? "space-between" : "flex-end"} align="center" mb={5}>
            {subreddit && (<SortingOptions subreddit={subreddit} sortOption={sortOption} />)}
            <Flex justify="flex-end">
              <Select value={viewMode} onChange={(e) => dispatch(setView(e.target.value))}>
                <option value={ViewMode.CARD}>Card</option>
                <option value={ViewMode.CLASSIC}>Classic</option>
              </Select>
            </Flex>
          </Flex>
          <PostList />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostListWrapper;
