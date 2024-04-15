import React from "react";
import { useNavigate } from "react-router-dom";
import { Dot } from "lucide-react";
import { timeCreated, timeDuration } from "../helpers/time";
import { motion } from "framer-motion";

function VideoList({
	thumbnail,
	duration,
	title,
	createdAt,
	channelName,
	videoId,
	views,
	avatar,
}) {
	const navigate = useNavigate();

	return (
		<>
			<motion.div
				initial={{
					opacity: 0,
					y: 100,
				}}
				whileInView={{
					// opacity: 1,
					y: 0,
					opacity: 0.8
				}}
				transition={{
					type: "spring",
					duration: 1,
				}}
				whileHover={{
					scale: 1.02,
					opacity: 1
				}}
				whileTap={{
					scale: 0.94,
				}}
				className="w-full sm:p-2 cursor-pointer"
				onClick={() => navigate(`/watch/${videoId}`)}
			>
				<div className="relative h-52">
					<img
						src={thumbnail}
						alt="thumnail"
						className="w-full h-full object-cover rounded-2xl"
					/>
					<span className="absolute bottom-2 right-2 rounded-lg bg-black/20 text-white text-sm px-1 py-1">
						{timeDuration(duration)}
					</span>
				</div>
				<div className="py-2">
					<div className="flex flex-row gap-2">
						<div className="">
							{avatar && (
								<div>
									<img
										src={avatar}
										alt="profilePicture"
										className="w-10 h-10 rounded-full object-cover"
									/>
								</div>
							)}
						</div>
						<div className="flex flex-col">
							<h2 className="font-semibold text-xl text-start capitalize">
								{title}
							</h2>
							<div className="text-sm capitalize text-slate-700 text-start">
								{channelName}
							</div>
							<div className="flex gap-0 text-start text-sm">
								<span>{views} views</span>
								<Dot className="w-3 my-auto" />
								<span>{timeCreated(createdAt)}</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}

export default VideoList;
