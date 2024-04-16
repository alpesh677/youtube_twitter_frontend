import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import { Bell } from "lucide-react";
import { timeCreated } from "../helpers/time";
import { toggleSubscriptions } from "../store/Slices/subscriptionSlice";
import Like from "./Like";
import { Dot } from "lucide-react";
import {
	getVideoComments,
	cleanUpComments,
} from "../store/Slices/commentSlice";

function Description({
	avatar,
	title,
	channelName,
	createdAt,
	description,
	views,
	videoKey,
	channelId,
	videoId,
	totalSubscribers,
	isSubscribed,
	likeCount,
	isLiked,
}) {
	// console.log(isSubscribed)
	const dispatch = useDispatch();
	const comments = useSelector((state) => state?.comment?.comments);
	useEffect(() => {
		if (videoId) {
			dispatch(
				getVideoComments({
					videoId: videoKey,
					page: 1,
					limit: 10,
				}),
			);
		}
		return () => dispatch(cleanUpComments());
	}, [dispatch, videoId]);
	console.log("comments", comments);

	const [isLocalSubscribed, setIsLocalSubscribed] = useState(isSubscribed);
	const [subscriberCount, setSubscriberCount] = useState(totalSubscribers);
	// console.log(channelId)
	// console.log(videoId)

	const handlesubscribe = () => {
		dispatch(toggleSubscriptions(channelId));
		console.log(isLocalSubscribed);
		setIsLocalSubscribed((prev) => !prev);
		console.log(isLocalSubscribed);
		if (isLocalSubscribed) {
			if (subscriberCount >= 0) setSubscriberCount((prev) => prev - 1);
		} else {
			setSubscriberCount((prev) => prev + 1);
		}
	};

	return (
		<div>
			<div className="sm:max-w-4xl w-full p-5 sm:p-2 space-y-2 flex items-start">
				<div className="w-full">
					<div className="mb-2 space-y-2">
						<h1 className="sm:text-2xl font-semibold">{title}</h1>
					</div>
					<div className="flex justify-between items-center gap-4">
						<Link
							to={`/channel/${channelName}`}
							className="flex gap-4"
						>
							<img
								src={avatar}
								alt="avatar image"
								className="w-12 h-12 rounded-full objec"
							/>
							<div>
								<h1 className="font-semibold text-xl">
									{channelName}
								</h1>
								<p className="text-sm text-slate-400">
									{subscriberCount} subscribers
								</p>
							</div>
						</Link>
						<div className="flex">
							<div className="rounded-full flex justify-center w-24">
								<Like
									isLiked={isLiked}
									likeCount={likeCount}
									videoId={videoId}
									size={25}
								/>
							</div>
						</div>
						<div>
							<Button
								onClick={handlesubscribe}
								bgColor="bg-black"
								className="hover-slate-500 hover:scale-105 transition-all text-white rounded-3xl font-bold"
							>
								{isLocalSubscribed ? "subscribed" : "subscribe"}
							</Button>
						</div>
					</div>
					<div className="mt-4 w-full bg-gray-200 rounded-xl ">
						<div className=" pl-3 pt-2 text-black  rounded-xl flex items-start">
							<div className="font-semibold flex">
								{`${views} views`}{" "}
								<Dot className="w-3 my-auto" />
								{timeCreated(createdAt)}
							</div>
						</div>
						<div className="flex flex-start pl-3 pb-2">
							{description}
						</div>
					</div>
				</div>
			</div>

			<div>

			</div>
		</div>
	);
}

export default Description;
