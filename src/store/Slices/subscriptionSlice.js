import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    subscribed: true,
    channelSubscribers: [],
    mySubscriptions: []
}

export const toggleSubscriptions = createAsyncThunk("toggleSubsciptions",
    async (channelId) => {
        try {
            const response = await axiosInstance.post(`/subscriptions/c/${channelId}`);
            return response.data.data.isSubscribed;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getUserSubscibers = createAsyncThunk("getUserSubscibers",
    async (channelId) => {
        try {
            const response = await axiosInstance.get(`/subscriptions/c/${channelId}`);
            return response.data.data.isSubscribed;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getSubscribedChannels = createAsyncThunk("getSubscribedChannels",
    async (subscriberId) => {
        try {
            const response = await axiosInstance.get(`/subscriptions/u/${subscriberId}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
);

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscriptions.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(toggleSubscriptions.fulfilled, (state)=>{
            state.loading = false;
        })
        builder.addCase(getUserSubscibers.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(getUserSubscibers.fulfilled, (state,action)=>{
            state.loading = false;
            state.channelSubscribers = action.payload;
        })
        builder.addCase(getSubscribedChannels.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(getSubscribedChannels.fulfilled,(state,action)=>{
            state.loading = false;
            state.mySubscriptions = action.payload;
        })
    }
});

export default subscriptionSlice.reducer;