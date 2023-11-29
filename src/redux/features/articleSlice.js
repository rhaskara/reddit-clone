// ArticleSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { REDDIT_API_BASE_URL } from '@/utils';

const initialState = {
  articleData: null,
  comments: [],
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleData: (state, action) => {
      state.articleData = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setArticleData, setComments, setLoading, setError } = articleSlice.actions;

export const fetchArticleAndComments = (subreddit, articleId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetch(`${REDDIT_API_BASE_URL}/r/${subreddit}/comments/${articleId}.json`);
    const data = await response.json();

    const articleData = data[0]?.data?.children?.[0]?.data || null;
    const comments = data[1]?.data?.children || [];

    dispatch(setArticleData(articleData));
    dispatch(setComments(comments));

    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error fetching article data and comments:', error);
    throw new Error('Failed to fetch article data and comments');
  }
};

export default articleSlice.reducer;