import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster, toast } from "react-hot-toast";
import { getCurrentUser } from "./store/Slices/authSlice";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "./components/AuthLayout";
import Navbar from "./components/Header/Navbar";
import { useNavigate } from "react-router-dom";
import VideoDetail from "./pages/VideoDetail";
import Sidebar from "./components/Sidebar";
import History from "./pages/History";
import LikedVideos from "./pages/LikedVideos";


function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useSelector((state) => state.auth?.userData?._id) | false;
	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const location = window.location.pathname;
		const publicUrl = location === "/login" || location === "/signup";
		// console.log(publicUrl);
		try {
			if (id) {
				return;
			}
			const user = dispatch(getCurrentUser());
			// console.log(user);
			if (!user && publicUrl) {
				navigate("/login");
			} else {
				navigate("/home");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<>
			<Navbar />
			<Sidebar />
			<Routes>
				<Route
					path="/home"
					element={
						<AuthLayout authentication={false}>
							{<HomePage />}
						</AuthLayout>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route
					path="/watch/:videoId"
					element={
						<AuthLayout authentication={false}>
							<VideoDetail />
						</AuthLayout>
					}
				/>
				<Route
					path="/history"
					element = {
						<AuthLayout authentication>
							<History/>
						</AuthLayout>
					}
				/>
				<Route
					path="/likedVideos"
					element = {
						<AuthLayout authentication>
							<LikedVideos/>
						</AuthLayout>
					}
				/>
			</Routes>

			<Toaster
				position="top-right"
				reverseOrder={true}
				toastOptions={{
					error: {
						style: {
							borderRadius: "0",
							color: "red",
						},
					},
					success: {
						style: { borderRadius: "0", color: "green" },
					},
					duration: 3000,
				}}
			/>
		</>
	);
}

export default App;
