import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import Video from "../components/Video";
import videojs from "video.js";
import VideoJS from "../components/VideoJS";
import Description from "../components/Description";
import {
	getVideoComments,
	cleanUpComments,
} from "../store/Slices/commentSlice";

function VideoDetail() {
	const dispatch = useDispatch();
	const { videoId } = useParams();

	const video = useSelector((state) => state?.video?.video);
	const totalComments = useSelector((state) => state?.comment?.totalComments);
	const comments = useSelector((state) => state?.comment?.comments);


	useEffect(()=>{
		dispatch(getVideoById({ videoId }));
	},[dispatch,videoId])

	// console.log(video);
	// useEffect(() => {
	// 	if (videoId) {
	// 		console.log("in if statement");
	// 		dispatch(getVideoById({ videoId }));
	// 		dispatch(
	// 			getVideoComments({
	// 				videoId: "660e80e22fb691d504bd6ada",
	// 				page: 1,
	// 				limit: 10,
	// 			}),
	// 		);
	// 	}
	// 	console.log("comments", comments);
	// 	return () => dispatch(cleanUpComments());
	// }, [dispatch, videoId]);

	//TODO: thubnail of video
	const playerRef = React.useRef(null);
	const videoURL = video?.videoFile?.url;
	const thumbnailURL = video?.thumbnail?.url;
	const parts = videoURL
		? videoURL.split(".")[videoURL.split(".").length - 1]
		: "";

	const videoJsOptions = {
		autoplay: false,
		controls: true,
		// poster : thumbnailURL,
		responsive: true,
		fluid: true,
		disablePictureInPicture: false,
		enableDocumentPictureInPicture: true,
		enableSmoothSeeking: true,
		playbackRates: [0.5, 1, 1.5, 2],
		breakpoints: {
			tiny: 300,
			xsmall: 400,
			small: 500,
			medium: 600,
			large: 700,
			xlarge: 800,
			huge: 900,
		},
		controlBar: {
			skipButtons: {
				forward: 10,
				backward: 10,
			},
		},
		userActions: {
			hotkeys: true,
		},
		sources: [
			{
				src: videoURL,
				type: `video/${parts}`,
			},
		],
	};

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on("waiting", () => {
			videojs.log("player is waiting");
		});

		player.on("dispose", () => {
			videojs.log("player will dispose");
		});
	};
	return (
		<>
			<VideoJS
				className="rounded-2xl "
				options={videoJsOptions}
				onReady={handlePlayerReady}
			/>
			<Description
				avatar={video?.owner?.avatar}
				title={video?.title}
				totalSubscribers={video?.owner?.totalSubscribers}
				isSubscribed={video?.owner?.isSubscribed}
				channelName={video?.owner?.username}
				createdAt={video?.createdAt}
				description={video?.description}
				views={video?.views}
				videoKey={video?._id}
				channelId={video?.owner?._id}
				videoId={video?._id}
				likeCount={video?.likeCount}
				isLiked={video?.isLiked}
			/>

			<div className="text-black font-semibold sm:px-5 px-3">
				{totalComments} Comments
			</div>
		</>
	);
}

export default VideoDetail;