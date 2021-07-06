import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    loading: false,
    error: '',
    comments: []
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts: (state) => {
            state.loading = true
        },
        getPostsSuccess: (state, { payload }) => {
            state.loading = false
            state.posts = payload
        },
        getPostsFail: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        updatePosts: (state, {payload}) => {
            state.posts = payload
        }
    }
})

export const { getPosts, getPostsSuccess, getPostsFail, updatePosts } = postsSlice.actions

export const postsSelector = (state) => state.postsReducer

export default postsSlice.reducer