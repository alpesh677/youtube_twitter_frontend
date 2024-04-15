import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
	loading: false,
	status: false,
	userData: null,
};

export const createAccount = createAsyncThunk("/register", async (data) => {
	const formData = new FormData();
	if (data.avatar && data.avatar.length > 0) {
		formData.append("avatar", data.avatar[0]);
	}
	formData.append("username", data.username);
	formData.append("email", data.email);
	formData.append("password", data.password);
	formData.append("fullName", data.fullName);

	if (data.coverImage) formData.append("coverImage", data.coverImage[0]);

	try {
		const response = await axiosInstance.post("/users/register", formData);
		toast.success("Registered successfully!!!");
		return response.data;
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.error || "An error occurred");
		throw error;
	}
});

export const userLogin = createAsyncThunk("login", async (data) => {
	try {
		const response = await axiosInstance.post("/users/login", data);
		// console.log("this is login slice");
		toast.success("Logged in successfully");
		console.log(response.data.data);
		return response.data.data.user;
	} catch (error) {
		const errorMessage = parseErrorMessage(error.response.data);
		console.log(errorMessage);
		toast.error(errorMessage);
		throw error;
	}
});
const parseErrorMessage = (htmlResponse) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlResponse, "text/html");
	const errorMessageElement = doc.querySelector("pre");
	if (errorMessageElement) {
		// Extract the error message using regex
		const errorMessageMatch =
			errorMessageElement.textContent.match(/Error: (.+)/);
		if (errorMessageMatch && errorMessageMatch[1]) {
			return errorMessageMatch[1].trim();
		}
	}
	return "An error occurred";
};

export const userLogout = createAsyncThunk("logout", async () => {
	try {
		const response = await axiosInstance.post("/users/logout");
		return response.data;
	} catch (error) {
		toast.error(error?.response?.data?.error);
		throw error;
	}
});

export const refreshAccessToken = createAsyncThunk(
	"refreshAccessToken",
	async (data) => {
		try {
			const response = await axiosInstance.post(
				"/users/refresh-token",
				data,
			);
			return response.data;
		} catch (error) {
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

export const changePassword = createAsyncThunk(
	"changePassword",
	async (data) => {
		try {
			const response = await axiosInstance.post(
				"/users/change-password",
				data,
			);
			toast.success(response.data?.message);
			return response.data;
		} catch (error) {
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
	const response = await axiosInstance.get("/users/current-user");
	return response.data.data;
});

export const updataAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
	try {
		const response = await axiosInstance.patch(
			"/users/update-avatar",
			avatar,
		);
		toast.success("avatar updated successfully!!!");
		return response.data.data;
	} catch (error) {
		toast.error(error?.response?.data?.error);
		throw error;
	}
});

export const updateCoverImage = createAsyncThunk(
	"updateCoverImage",
	async (coverImage) => {
		try {
			const response = await axiosInstance.patch(
				"/users/update-coverImage",
				coverImage,
			);
			toast.success(response.data?.message);
			return response.data.data;
		} catch (error) {
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

export const updateUserDetails = createAsyncThunk(
	"updataUserDetails",
	async (data) => {
		try {
			const response = await axiosInstance.patch(
				"/users/update-user",
				data,
			);
			toast.success("user details updated successfully!!!");
			return response.data.data;
		} catch (error) {
			toast.error(error?.response?.data?.error);
			throw error;
		}
	},
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createAccount.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createAccount.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createAccount.rejected, (state) => {
			state.loading = false;
		});

		builder.addCase(userLogin.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.loading = false;
			state.status = true;
			state.userData = action.payload;
		});
		builder.addCase(userLogout.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(userLogout.fulfilled, (state) => {
			state.loading = false;
			state.status = false;
			state.userData = null;
		});

		builder.addCase(getCurrentUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.loading = false;
			state.status = true;
			state.userData = action.payload;
		});
		builder.addCase(getCurrentUser.rejected, (state) => {
			state.loading = false;
			state.status = false;
			state.userData = null;
		});

		builder.addCase(updataAvatar.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updataAvatar.fulfilled, (state) => {
			state.loading = false;
			state.userData = action.payload;
		});

		builder.addCase(updateCoverImage.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateCoverImage.fulfilled, (state) => {
			state.loading = false;
			state.userData = action.payload;
		});
		builder.addCase(updateCoverImage.rejected, (state) => {
			state.loading = false;
		});

		builder.addCase(updateUserDetails.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserDetails.fulfilled, (state) => {
			state.loading = false;
			state.userData = action.payload;
		});
	},
});

export default authSlice.reducer;
