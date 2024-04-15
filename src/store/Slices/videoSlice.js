import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants.js";

const initialState = {
	loading: false,
	uploading: false,
	uploaded: false,
	videos: {
		docs: [],
		hasNextPage: false,
	},
	video: null,
	publishToggle: false,
};

export const getAllVideos = createAsyncThunk(
	"getAllVideos",
	async ({ userId, sortBy, sortType, query, page, limit }) => {
		try {
			const url = new URL(`${BASE_URL}/videos`);
            
			if (userId) url.searchParams.set("userID", userId);
			if (query) url.searchParams.set("query", query);
			if (page) url.searchParams.set("page", page);
			if (limit) url.searchParams.set("limit", limit);
			if (sortBy && sortType) {
				url.searchParams.set("sortBy", sortBy);
				url.searchParams.set("sortType", sortType);
			}

			const response = await axiosInstance.get(url);
			// console.log("this is response : ", response.data.data);
			return response.data.data;
		} catch (error) {
			toast.error(error.response.data.error);
			throw error;
		}
	},
);

export const publishAvideo = createAsyncThunk("publishAvideo", async (data) => {
	try {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("videoFile", data.videofile[0]);
		formData.append("thumbnail", data.thumbnail[0]);

		const response = await axiosInstance.post("/videos", formData);
		toast.success(response?.data?.message);
		return response?.data?.data;
	} catch (error) {
		toast.error(error?.response?.data?.error);
		throw error;
	}
});

export const updateVideo = createAsyncThunk(
	"updateVideo",
	async (videoId, data) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", description);
		formData.append("thumbnail", data.thumbnail[0]);

		try {
			const response = await axiosInstance.patch(
				`/videos/${videoId}`,
				formData,
			);
			toast.success(response?.data?.message);
			return response?.data?.data;
		} catch (error) {
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

export const deleteVideo = createAsyncThunk("deleteVideo", async (videoId) => {
	try {
		const response = await axiosInstance.delete(`/video/${videoId}`);
		toast.success(response?.data?.message);
		return response?.data?.data;
	} catch (error) {
		toast.error(error?.response?.data?.error);
		throw error;
	}
});

export const getVideoById = createAsyncThunk(
	"getVideoById",
	async ({videoId}) => {
		try {
			const response = await axiosInstance.get(`/videos/${videoId}`);
			toast.success(response?.data?.message);
			// console.log(response);
			return response?.data?.data;
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

export const updateToggleStatus = createAsyncThunk(
	"toggleStatus",
	async (videoId) => {
		try {
			const response = await axiosInstance.get(
				`/video/toggle/publish/${videoId}`,
			);
			toast.success(response?.data?.message);
			return response?.data?.data;
		} catch (error) {
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {
		updateUploadStatus: (state) => {
			state.uploading = false;
			state.uploaded = false;
		},
		makeVideosNull: (state) => {
			state.videos.docs = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllVideos.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAllVideos.fulfilled, (state, action) => {
			state.loading = false;
			state.videos.docs = [...state.videos.docs, ...action.payload.docs];
			state.hasNextPage = action.payload.hasNextPage;
		});

		builder.addCase(publishAvideo.pending, (state) => {
			state.uploaded = false;
		});

		builder.addCase(publishAvideo.fulfilled, (state) => {
			state.uploading = false;
			state.uploaded = true;
		});

		builder.addCase(updateVideo.pending, (state) => {
			state.uploaded = false;
		});
		builder.addCase(updateVideo.fulfilled, (state) => {
			(state.uploaded = true), (state.uploading = false);
		});

		builder.addCase(deleteVideo.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteVideo.fulfilled, (state) => {
			state.loading = false;
		});

		builder.addCase(getVideoById.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getVideoById.fulfilled, (state, action) => {
			state.loading = true; 
			state.video = action.payload;
		});

		builder.addCase(updateToggleStatus.fulfilled, (state) => {
			state.publishToggle = !state.publishToggle;
		});
	},
});

export const { updateUploadStatus, makeVideosNull } = videoSlice.actions;
export default videoSlice.reducer;
