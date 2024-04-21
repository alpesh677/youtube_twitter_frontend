import React from "react";
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

function Sidebar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const username = useSelector((state) => state?.auth?.userData?.username);

	const sideBarItems = [
		{
			icon: <Home size={25} />,
			to: "/home",
			title: "Home",
		},
		{
			icon: <LayoutDashboard size={25} />,
			to: "/dashboard",
			title: "Dashboard",
		},
		{
			icon: <SquareUserRound size={25} />,
			to: "/channel",
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
			<div className="fixed top-15 left-0 sm:w-64 w-full h-screen z-50">
				<div className="sm:block hidden">
					<div className="text-red lg:w-66 md:w-44 w-16 border border-r border-slate-400 py-2 px-1 flex flex-col">
						<div className="flex flex-col gap-2 mt-2">
							{sideBarItems.map((item) => (
								<NavLink
									to={item.to}
									key={item.title}
									className={({ isActive }) =>
										isActive ? "bg-sky-500" : ""
									}
								>
									<div className="flex sm:items-start flex-col cursor-pointer py-1 px-2 border border-slate-600">
										{item.icon}
										<div className="text-base hidden md:block">
											{item.title}
										</div>
									</div>
								</NavLink>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
