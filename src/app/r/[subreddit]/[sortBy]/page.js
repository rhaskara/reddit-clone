"use client"

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SortOptions } from '@/utils';
import PostListWrapper from '@/app/components/PostListWrapper';

const SubredditSortPage = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { subreddit, sortBy } = params;

  useEffect(() => {
    // Check if sortby is not a valid option
    if (sortBy && subreddit && !Object.values(SortOptions).includes(sortBy)) {
      // Redirect back to the base subreddit page
      router.replace(`/r/${subreddit}`);
    }
  }, [subreddit, sortBy, router]);

  return (<>
    <PostListWrapper queryURLPathname={pathname} subreddit={subreddit} sortOption={sortBy} />
  </>);
};

export default SubredditSortPage;