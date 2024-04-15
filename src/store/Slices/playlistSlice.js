import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    playlists: []

}
export const createPlayList = createAsyncThunk("createPlayList",
    async (name, description) => {
        try {
            const response = await axiosInstance.post("/playlist", { name, description })
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }
);

export const updatePlayList = createAsyncThunk("updatePlayList",
    async (playlistId, name, description) => {
        try {
            const response = await axiosInstance.post(`/playlist/${playlistId}`, { name, description })
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }
);

export const addVideoToPlayList = createAsyncThunk("addVideoToPlayList",
    async (videoId, playlistId) => {
        try {
            const response = await axiosInstance.patch(`/playlist/${videoId}/${playlistId}`)
            toast.success(response.data?.message);
            return response.data?.data;
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }
);

export const removeVideoToPlayList = createAsyncThunk("removeVideoToPlayList",
    async (videoId, playlistId) => {
        try {
            const response = await axiosInstance.patch(`/playlist/${videoId}/${playlistId}`)
            toast.success(response.data?.message);
            return response.data?.data;
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }
);

export const deletePlaylist = createAsyncThunk("deletePlatList",
    async (playlistId) => {
        try {
            const response = await axiosInstance(`/playlist/${playlistId}`)
            toast.success(response.data?.message);
            return response.data?.data;
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }
);

export const getPlayListById = createAsyncThunk("getPlayListById",
    async(playlistId)=>{
        try {
            const response = await axiosInstance(`/playlist/${playlistId}`)
            toast.success(response.data?.message);
            return response.data?.data;
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }    
)

export const getUserPlayList = createAsyncThunk("getUserPlayList",
    async(userId) => {
        try {
            const response = await axiosInstance.get(`/playlist/${userId}`);
            return response.data?.data
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
)

const playlistSlice = createSlice({
    name : "playlist",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getUserPlayList.fulfilled,(state,action)=>{
            state.playlists = action.payload;
        })
    }
})

export default playlistSlice.reducer;