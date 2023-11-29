import { REDDIT_API_BASE_URL, UserVoteValue } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  after: null, // Track the 'after' parameter for pagination
  userVotes: {},
  initialLoad: true,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      // Reset posts with new data
      state.posts = action.payload.map((post) => {
        const postId = post.data.id;
        const userVote = state.userVotes[postId];
        const scoreIncrementor = userVote ? userVote : 0;

        return {
          ...post,
          data: {
            ...post.data,
            score: post.data.score + scoreIncrementor,
          },
        };
      });
      state.loading = false;
    },
    appendPosts: (state, action) => {
      // Append new data to existing posts
      state.posts = action.payload.map((post) => {
        const postId = post.data.id;
        const userVote = state.userVotes[postId];
        const scoreIncrementor = userVote ? userVote : 0;

        return {
          ...post,
          data: {
            ...post.data,
            score: post.data.score + scoreIncrementor,
          },
        };
      });
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAfter: (state, action) => {
      state.after = action.payload;
    },
    upvotePost: (state, action) => {
      const postId = action.payload;
      const userVote = state.userVotes[postId];
      
      // Check if the user has already upvoted, remove the upvote
      if (userVote === UserVoteValue.INCREMENT) {
        state.userVotes[postId] = null;
        state.posts = state.posts.map((post) =>
          post.data.id === postId ? { ...post, data: { ...post.data, score: post.data.score - UserVoteValue.INCREMENT } } : post
        );
      } else {
        // Upvote the post
        const scoreIncrementor = state.userVotes[postId] === UserVoteValue.DECREMENT
        ? UserVoteValue.INCREMENT + 1 : UserVoteValue.INCREMENT; // +2 score if user's previous vote was down
        state.userVotes[postId] = UserVoteValue.INCREMENT;
        state.posts = state.posts.map((post) =>
          post.data.id === postId ? { ...post, data: { ...post.data, score: post.data.score + scoreIncrementor } } : post
        );
      }
    },
    downvotePost: (state, action) => {
      const postId = action.payload;
      const userVote = state.userVotes[postId];
      
      // Check if the user has already downvoted, remove the downvote
      if (userVote === UserVoteValue.DECREMENT) {
        state.userVotes[postId] = null;
        state.posts = state.posts.map((post) =>
          post.data.id === postId ? { ...post, data: { ...post.data, score: post.data.score - UserVoteValue.DECREMENT } } : post
        );
      } else {
        // Downvote the post
        const scoreIncrementor = state.userVotes[postId] === UserVoteValue.INCREMENT
          ? UserVoteValue.DECREMENT - 1 : UserVoteValue.DECREMENT; // -2 score if user's previous vote was up
        state.userVotes[postId] = UserVoteValue.DECREMENT;
        state.posts = state.posts.map((post) =>
          post.data.id === postId ? { ...post, data: { ...post.data, score: post.data.score + scoreIncrementor } } : post
        );
      }
    },
    setInitialLoad: (state, action) => {
      state.initialLoad = action.payload;
    }
  },
});

export const { setPosts, appendPosts, setLoading, setAfter, upvotePost, downvotePost, setInitialLoad } = listingSlice.actions;

// Async action using Redux Thunk with parameters for url path, 'after' parameter, and reset flag
export const fetchPosts = (urlPath, after, reset = false) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    if (!after) {
      dispatch(setInitialLoad(true));
    }
    const defaultURLPath = 'best';
    const queryURLPath = urlPath || defaultURLPath;
    
    // Include 'after' parameter if provided
    const afterParam = after ? `?after=${after}` : '';

    const response = await fetch(`${REDDIT_API_BASE_URL}/${queryURLPath}.json${afterParam}`);
    const data = await response.json();

    const posts = data?.data?.children?.map(child => {
      return {
        data: {
          name: child.data.name,
          subreddit: child.data.subreddit,
          id: child.data.id,
          title: child.data.title,
          author: child.data.author,
          selfText: child.data.selfText,
          url: child.data.url,
          score: child.data.score,
          num_comments: child.data.num_comments,
          created_utc: child.data.created_utc,
        }
      }
    }) || [];

    // Use setPosts or appendPosts based on the reset flag
    if (reset) {
      dispatch(setPosts(posts));
    } else {
      dispatch(appendPosts(posts));
    }

    // Update 'after' parameter in the store for pagination
    dispatch(setAfter(data.data.after));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch post list');
  }
};

export default listingSlice.reducer;
