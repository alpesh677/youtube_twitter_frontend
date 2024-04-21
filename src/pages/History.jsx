import React, { useEffect } from "react";
import { getWatchHistory } from "../store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import  VideoList  from "../components/VideoList";

function History() {
	const loading = useSelector((state) => state.user?.loading);
	const videos = useSelector((state) => state.user?.history);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getWatchHistory());
	}, [dispatch]);

	if (loading) {
		return (
			<>
				<span className="text-center">Loading</span>
			</>
		);
	}

	if (videos.length == 0) {
		return (
			<>
				<span className="text-center">No videos found...</span>
			</>
		);
	}

	if (videos.length > 0) {
		return (
			<>
				<Container>
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
				</Container>
			</>
		);
	}
}

export default History;
