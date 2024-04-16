import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    likedVideos: [],
    likedTweets: []
}

export const toggleVideoLike = createAsyncThunk("toggleVideoLike",
    async (videoId) => {
        try {
            const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const toggleCommentLike = createAsyncThunk("toggleCommentLike",
    async (commentId) => {
        try {
            const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
            console.log("response from commentlike :",response.data.data)
            return response.data.data;
        } catch (error) {
            console.log("error from commentlike ",error?.response?.data?.error)
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const toggleTweetLike = createAsyncThunk("toggleTweetLike",

    async (tweetId) => {
        try {
            const response = await axiosInstance.get(`/likes/toggle/t/${tweetId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)

export const getLikedVideos = createAsyncThunk("getLikedVideos",
    async () => {
        try {
            const response = await axiosInstance.get(`/likes/videos`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)

export const getLikedTweets = createAsyncThunk("getLikedTweets",
    async () => {
        try {
            const response = await axiosInstance.get(`/likes/tweets`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVideos = action.payload;
        })

        builder.addCase(getLikedTweets.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getLikedTweets.fulfilled, (state, action) => {
            state.loading = false;
            state.likedTweets = action.payload;
        })
    }
})

export default likeSlice.reducer;