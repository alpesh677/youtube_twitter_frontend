import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import Container from "../components/Container";
import VideoList from "../components/VideoList";

function HomePage() {
	const dispatch = useDispatch();
	const videos = useSelector((state) => state.video?.videos?.docs);
	// console.log(videos);
	const loading = useSelector((state) => state.video?.loading);
	const hasNextPage = useSelector(
		(state) => state.video?.videos?.hasNextPage,
	);

	useEffect(() => {
		dispatch(getAllVideos({}));
		return () => dispatch(makeVideosNull());
	}, [dispatch]);
	return (
		<>
			<h1>This is Homepage</h1>
			<div className="text-black mb-20 sm:mb-0 max-h-screen min-w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
				{videos?.map((video) => (
					<VideoList
						key={video._id}
						avatar={video.ownerDetails?.avatar}
						thumbnail={video.thumbnail?.url}
						duration={video.duration}
						title={video.title}
						views={video.views}
						createdAt={video.createdAt}
						channelName={video.ownerDetails?.username}
						videoId={video._id}
					/>
				))}
			</div>

			{loading && <div className="text-center">Loading...</div>}
		</>
	);
}

export default HomePage;
