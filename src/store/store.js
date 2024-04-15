import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import commentSlice from "./Slices/commentSlice.js"
import dashboardSlice from "./Slices/dashboardSlice.js";
import likeSlice from "./Slices/likeSlice.js"
import playlistSlice from "./Slices/playlistSlice.js"
import subscriptionSlice from "./Slices/subscriptionSlice.js"
import tweetSlice from "./Slices/tweetSlice.js"
import userSliceReducer from "./Slices/userSlice.js";
import videoSliceReducer from "./Slices/videoSlice.js"

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        comment : commentSlice,
        dashboard : dashboardSlice,
        like : likeSlice,
        playlist : playlistSlice,
        subscription : subscriptionSlice,
        tweet : tweetSlice,
        user : userSliceReducer,
        video : videoSliceReducer
    }
})

export default store;