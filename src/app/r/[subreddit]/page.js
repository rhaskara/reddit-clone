"use client"

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PostListWrapper from '@/app/components/PostListWrapper';

const SubredditPage = ({
  params
}) => {
  const router = useRouter();
  const { subreddit } = params;
  const pathname = usePathname();
  useEffect(() => {
    if (!subreddit) {
      router.replace(`/`);
    }
  }, [router, subreddit])

  return (<>
    <PostListWrapper queryURLPathname={pathname} subreddit={subreddit} />
  </>);
};

export default SubredditPage;