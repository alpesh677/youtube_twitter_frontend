import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../store/Slices/tweetSlice";
import TweetList from "../components/TweetList";

export default function Tweets() {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state?.user?.userData?._id);
	const authId = useSelector((state) => state?.auth?.userData?._id);
	const tweets = useSelector((state) => state?.tweet?.tweets);
  console.log("tweets", tweets)
	
	useEffect(() => {
		dispatch(getUserTweets({ userId }));
	},[userId]);


	if (tweets.length <= 0) {
		return (
			<p className="text-center text-2xl font-bold text-red-600">
				No Tweets Found
			</p>
		);
	}
	const sortedLike = [...tweets]
		.sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt))
		.reverse();

	return (
		<>
			<div className="w-full sm:max-w-4xl">
				{tweets &&
					sortedLike.map((tweet) => (
						<div className="" key={tweet?._id}>
							<TweetList
								tweetId={tweet?._id}
								avatar={tweet?.ownerDetails?.avatar}
								commentId={tweet?._id}
								content={tweet?.content}
								createdAt={tweet?.createdAt}
								fullName={tweet?.ownerDetails?.fullName}
								isLiked={tweet?.isLiked}
								likesCount={tweet?.totalLikes}
								username={tweet?.ownerDetails?.username}
							/>
						</div>
					))}
			</div>
		</>
	);
}
