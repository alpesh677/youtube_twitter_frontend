import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { toggleSubscriptions } from "../store/Slices/subscriptionSlice";
import { Dot } from "lucide-react";
function ChannelHeader({
	avatar,
	coverImage,
	username,
	fullName,
	subscriberCount,
	subscribedCount,
	isSubscribed,
	channelId,
}) {
	const dispatch = useDispatch();
	console.log(subscriberCount);
	const [currentSubscriberCount, setCurrentSubscriberCount] = useState(subscriberCount);
	const [currentSubStatus, setCurrentSubStatus] = useState(isSubscribed);
	const userProfile = useSelector((state) => state.user?.userData?._id);
	const user = useSelector((state) => state.auth?.userData?._id);

	const handleSubmit = () => {
		dispatch(toggleSubscriptions(channelId));
		setCurrentSubStatus((prev) => !prev);
		if (currentSubStatus) {
			setCurrentSubscriberCount((prev) => prev - 1);
		} else {
			setCurrentSubscriberCount((prev) => prev + 1);
		}
	};

	return (
		<>
			<div className="w-full mt-2">
				<section className="w-full">
					<div>
						{true ? (
							<img
								src={coverImage}
								alt="coverImage"
								className="sm:h-32 h-24 w-full object-cover rounded-md"
							/>
						) : (
							<div className="sm:h-32 h-24 w-full bg-black"></div>
						)}
					</div>
				</section>
				<section className="w-full sm:px-5 p-2 sm:flex-row flex-col items-start">
					<div className="h-12 relative">
						<img
							src={avatar}
							alt="Avatar"
							className="sm:w-32 w-28 sm:h-32 h-28 rounded-full absolute sm:-bottom-1/2 outline-none"
						/>
					</div>
					<div className="flex justify-between items-start text-start mt-6">
						<div>
							<h1 className="text-3xl font-bold">
								{fullName}
							</h1>
							<h3 className="text-base text-slate-500">
								@{username}
							</h3>
							<div className="flex gap-2">
								<p className="text-base text-slate-500 flex">
									{currentSubscriberCount} subscribers
									<Dot className="w-3 my-auto" />
									{subscribedCount} subscribed channels 
								</p>
							</div>
						</div>
						{user !== userProfile && (
							<div onClick={handleSubmit}>
								<Button
									textColor="text-white"
									bgColor="bg-black"
									className="hover:scale-105 transition-all font-semibold"
								>
									{currentSubStatus
										? "Subsscribed"
										: "Subscribe"}
								</Button>
							</div>
						)}

						{user === userProfile && (
							<Button
								textColor="black"
								bgColor="bg-red-600"
								className="hover:scale-105 transition-all font-semibold"
							>
								Edit //TODO: EDIT Functionality
							</Button>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

export default ChannelHeader;
