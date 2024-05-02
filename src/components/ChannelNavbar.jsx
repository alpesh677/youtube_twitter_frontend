import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ChannelVideos from "../pages/ChannelVideos";
import { motion } from "framer-motion";
import Tweets from "../pages/Tweets";

const menubar = [
	{
		index: 1,
		value: "videos",
	},
	{
		index: 2,
		value: "playlist",
	},
	{
		index: 3,
		value: "tweet",
	},
	{
		index: 4,
		value: "about",
	},
];

function ChannelNavbar({ username }) {
	const username1 = username.username;
	const [selectedItem, setSelectedItem] = useState("videos");
	return (
		<>
			<section className="flex w-full justify-evenly items-center border-b-2 border-slate-500 text-sm sm:text-base p-2 sm:pt-4 pt-2">
				{menubar.map((item) => (
					<motion.button
						// to={`/channel/${username1}/videos`}
						onClick={() => {
							setSelectedItem(item.value);
						}}
						key={item.index}
						className={`p-2 px-4 h-fit w-full rounded-lg relative ${
							selectedItem === item.value
								? "bg-sky-900 text-sky-100 "
								: "bg-transparent hover:bg-slate-200 transition duration-700 ease-in-out"
						}`}
					>
						<p className="capitalize">{item.value}</p>
						{selectedItem === item.value && (
							<motion.div
								className="absolute top-0 left-0 bg-sky-900 rounded-lg w-full h-full -z-10"
								transition={{
									type: "spring",
									duration: 0.5,
								}}
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
							/>
						)}
					</motion.button>
				))}
			</section>
			{selectedItem === "videos" && <ChannelVideos />}
			{selectedItem === "tweet" && <Tweets />}
		</>
	);
}

export default ChannelNavbar;
