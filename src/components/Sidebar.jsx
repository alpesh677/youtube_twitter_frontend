import React, { Children } from "react";
import {
	History,
	Home,
	LayoutDashboard,
	ListMusic,
	SquareUserRound,
	ThumbsUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogout } from "../store/Slices/authSlice";
import Navbar from "./Header/Navbar";
import NavMargin from "./Header/NavMargin";

function Sidebar({ children }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const username = useSelector((state) => state?.auth?.userData?.username);
	console.log("username : ", username);

	const sideBarItems = [
		{
			icon: <Home size={25} />,
			to: "/home",
			title: "Home",
		},
		{
			icon: <LayoutDashboard size={25} />,
			to: `/channel/${username}`,
			title: "Dashboard",
		},
		{
			icon: <SquareUserRound size={25} />,
			to: "/videos",
			title: "Your Channel",
		},
		{
			icon: <ListMusic size={25} />,
			to: "/playlist",
			title: "Playlist",
		},
		{
			icon: <History size={25} />,
			to: "/history",
			title: "History",
		},
		{
			icon: <ThumbsUp size={25} />,
			to: "/likedVideos",
			title: "Liked Videos",
		},
	];

	const logout = () => {
		dispatch(userLogout());
		navigate("/");
	};

	return (
		<>
			<Navbar />
			<NavMargin/>
			<div className="grid grid-cols-12 gap-2">
				<div className="xl:col-span-1 md:col-span-2 sm:col-span-1 col-span-2 flex flex-col gap-2 p-2">
					{sideBarItems.map((item) => (
						<NavLink
							to={item.to}
							key={item.title}
							// className={({ isActive }) =>
							// 	isActive ? "bg-sky-500" : "bg-slate-300"
							// }
							className={({ isActive }) =>
								`bg-blue-200 rounded-md ${
									isActive ? "bg-blue-700 text-white" : ""
								}`
							}
						>
							<div className="flex sm:items-start flex-col cursor-pointer py-1 px-2 ">
								{item.icon}
								<div className="text-base hidden md:block">
									{item.title}
								</div>
							</div>
						</NavLink>
					))}
				</div>
				<div className="xl:col-span-11 md:col-span-10 sm:col-span-11 col-span-10">{children}</div>
			</div>
		</>
	);
}

export default Sidebar;
// <div className="fixed bg-blue-200 top-0 left-0 w-fit h-screen z-50">
// 	<div className="sm:block hidden">
// 		<div className="text-red lg:w-66 md:w-44 w-16 border border-r border-slate-400 py-2 px-1 flex flex-col">
// 			<div className="flex flex-col gap-2 mt-2">
// 				{sideBarItems.map((item) => (
// 					<NavLink
// 						to={item.to}
// 						key={item.title}
// 						className={({ isActive }) =>
// 							isActive ? "bg-sky-500" : ""
// 						}
// 					>
// 						<div className="flex sm:items-start flex-col cursor-pointer py-1 px-2 border border-slate-600">
// 							{item.icon}
// 							<div className="text-base hidden md:block">
// 								{item.title}
// 							</div>
// 						</div>
// 					</NavLink>
// 				))}
// 			</div>
// 		</div>
// 	</div>
// </div>
