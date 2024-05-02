import React, { useEffect, useState } from "react";
import VideoList from "../components/VideoList";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";

function ChannelVideos() {
	const dispatch = useDispatch();
	const videos = useSelector((state) => state.video?.videos?.docs);
	const userId = useSelector((state) => state.user?.userData?._id);
	console.log(userId);
	const [activeButton, setActiveButton] = useState("button1");
	const [searchParams, setSearchParams] = useState();

	useEffect(() => {
		const sortBy = searchParams?.sortBy;
		const sortType = searchParams?.sortType;
		dispatch(getAllVideos({ userId, sortBy, sortType }));

		return () => dispatch(makeVideosNull());
	}, [dispatch, userId, searchParams]);

	if (videos.length <= 0) {
		return (
			<div className="flex justify-center items-center">
				<p className="text-center text-2xl font-bold text-red-600">
					No Videos Found
				</p>
			</div>
		);
	}

	const handleSort = (sortBy, sortType = "asc") => {
		setSearchParams({ sortBy, sortType });
	};

	return (
		<>
			<div className="w-full p-2 text-black flex gap-4 group">
				<button
					onClick={() => {
						setActiveButton("button1");
						handleSort("createdAt", "desc");
					}}
					className={`p-1 px-4 rounded-md ${
						activeButton === "button1"
							? "bg-sky-800 text-white"
							: "bg-slate-200 hover:bg-slate-300 transition duration-700 ease-in-out text-black"
					}`}
				>
					latest
				</button>
				<button
					onClick={() => {
						setActiveButton("button2");
						handleSort("views", "desc");
					}}
					className={`p-1 px-4 rounded-md ${
						activeButton === "button2"
							? "bg-sky-800 text-white"
							: "bg-slate-200 hover:bg-slate-300 transition duration-700 ease-in-out text-black"
					}`}
				>
					Popular
				</button>
			</div>
			<div className="grid lg:grid-cols-3 sm:grid-cols-2 text-black">
				{videos.map((video) => (
					<VideoList
						key={video?._id}
						avatar={video.ownerDetails?.avatar}
						thumbnail={video.thumbnail?.url}
						duration={video.duration}
						title={video.title}
						views={video.views}
						createdAt={video.createdAt}
						videoId={video._id}
					/>
				))}
			</div>
		</>
	);
}

export default ChannelVideos;
