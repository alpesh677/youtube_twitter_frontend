import React, { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { useDispatch } from "react-redux";
import {
	toggleVideoLike,
	toggleTweetLike,
	toggleCommentLike,
} from "../store/Slices/likeSlice";

function Like({ isLiked, likeCount = 0, tweetId, videoId, commentId, size }) {
	const dispatch = useDispatch();
	const [isLocalLiked, setIsLocalLiked] = useState(isLiked);
	const [localLikeCount, setLocalLikeCount] = useState(likeCount);
	const [isLocalDisliked, setIsLocalDisliked] = useState(false);

	const handleLike = () => {
		if (isLocalLiked) {
			setLocalLikeCount((prev) => prev - 1);
		} else {
			setLocalLikeCount((prev) => prev + 1);
		}

		setIsLocalLiked((prev) => !prev);
		setIsLocalDisliked(false);

		if (tweetId) {
			dispatch(toggleTweetLike(tweetId));
		}
		if (commentId) {
			dispatch(toggleCommentLike(commentId));
		}

		if (videoId) {
			dispatch(toggleVideoLike(videoId));
		}
	};

	const handleDislike = () => {
		setIsLocalDisliked((prev) => !prev);
		if (isLocalLiked) {
			setIsLocalLiked(false);
			setLocalLikeCount((prev) => prev - 1);
		}
	};

	useEffect(() => {
		setIsLocalLiked(isLiked);
		setLocalLikeCount(likeCount);
	}, [isLiked, likeCount]);

	return (
		<>
			<div className="flex items-center gap-2">
				<ThumbsUp
					size={size}
					onClick={handleLike}
					className={`cursor-pointer ${
						isLocalLiked ? "text-purple-500" : ""
					}`}
				/>
				<span className="text-sm mr-3">{localLikeCount}</span>
				<ThumbsDown size={size} onClick={handleDislike} className={`cursor-pointer ${
					isLocalDisliked ? "text-purple-500" : ""
				}`}/>
			</div>
		</>
	);
}

export default Like;
