import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/Slices/likeSlice";
import VideoList from "../components/VideoList";
import { makeVideosNull } from "../store/Slices/videoSlice";
import Container from "../components/Container";

function LikedVideos() {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.like?.loading);
	const likedVideos = useSelector((state) => state.like?.likedVideos);
	console.log(likedVideos?.videoDetails);

	useEffect(() => {
		dispatch(getLikedVideos());
		return () => dispatch(makeVideosNull());
	}, [dispatch]);

	if (loading) {
		return <span className="text-center">Loading</span>;
	}

	if (likedVideos.length == 0) {
		<span className="text-center">No videos Found</span>;
	}
    console.log(likedVideos?.ownerDetails?.avatar)
	if (likedVideos.length > 0) {
		return (
			<>
				<Container>
					<div className="text-black mb-20 sm:mb-0 max-h-screen min-w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
						{likedVideos?.map((video) => (
							<VideoList
								key={video.videoDetails?._id}
								avatar={video.videoDetails.ownerDetails?.avatar}
								thumbnail={video?.videoDetails.thumbnail?.url}
								duration={video?.videoDetails.duration}
								title={video?.videoDetails?.title}
								views={video?.videoDetails.views}
								createdAt={video?.videoDetails?.createdAt}
								channelName={video?.videoDetails.ownerDetails?.username}
								videoId={video?.videoDetails._id}
							/>
						))}
					</div>
				</Container>
			</>
		);
	}
}

export default LikedVideos;
