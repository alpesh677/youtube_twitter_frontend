import React, { useState,useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogout } from "../../store/Slices/authSlice";
import Button from "../Button";
import { Menu, X, LogOut } from "lucide-react";

function Navbar() {
	const [isMenuOpen, setisMenuOpen] = useState(false);
	const authStatus = useSelector((state) => state.auth.status);
	const username = useSelector((state) => state.auth?.userData?.username);
	const profilePicture = useSelector((state) => state.auth?.userData?.avatar);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleMenu = () => {
		setisMenuOpen(!isMenuOpen);
	};

	

	const menuItems = [
		{
			title: "Liked Videos",
			url: "/liked video",
		},
		{
			title: "My videos",
			url: `channel/${username}`,
		},
	];

	const logout = async () => {
		await dispatch(userLogout());
		navigate("/homepage");
	};
	return (
		<>
			<nav className="sm:w-full flex justify-between items-center py-2 sm:py-6 gap-2 sm:gap-2 sticky top-0 z-50 border border-red-400">
				<div className="flex items-center justify-center gap-2 cursor-pointer">
					LOGO
				</div>
				<div className="w-full sm:w-1/3 hidden sm:block">
					<SearchBar />
				</div>
				{authStatus ? (
					<div className="rounded gap-1">
						<img
							src={profilePicture}
							alt="profileImage"
							className="w-12 h-12 rounded-full object-cover"
						/>
					</div>
				) : (
					<div> </div>
					// <div className="sm:block hidden">
					// 	<Link to={"login"}>
					// 		<Button bgColor="bg-blue-500 text-white p-2 sm:px-4 sm:py-2">
					// 			Login
					// 		</Button>
					// 	</Link>
					// 	<Link to={"signup"}>
					// 		<Button bgColor="bg-blue-500 text-white p-2 sm:px-4 sm:py-2">
					// 			signup
					// 		</Button>
					// 	</Link>
					// </div>
				)}

				<div className="sm:hidden block">
					<div className="text-white ">
						<Menu size={24} color="black" onClick={toggleMenu} />
					</div>
				</div>
				{isMenuOpen && (
					<div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
						<div className="divide-y-2 divide-gray-50 rounded-lg bg-black text-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="px-5 pb-6 pt-5">
								<div className="flex items-center justify-between">
									<div className="inline-flex items-center space-x-2">
										LOGO
										<span className="font-bold">
											LOGO TEXT
										</span>
									</div>
									<div className="-mr-2">
										<button
											type="button"
											onClick={toggleMenu}
											className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
										>
											<span className="sr-only">
												Close menu
											</span>
											<X
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>
								</div>
								<div className="mt-6">
									<nav className="grid gap-y-4">
										{menuItems.map((item) => (
											<NavLink
												to={item.url}
												key={item.title}
												onClick={toggleMenu}
												className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold "
											>
												<span className="ml-3 text-base font-medium text-white">
													{item.title}
												</span>
											</NavLink>
										))}
									</nav>
								</div>
							</div>
						</div>
					</div>
				)}

				{!authStatus ? (
					<div className="space-x-2">
						<Link to={"login"}>
							<Button bgColor="bg-blue-500 text-white p-2 sm:px-4 sm:py-2">
								Login
							</Button>
						</Link>
						<Link to={"signup"}>
							<Button bgColor="bg-blue-500 text-white p-2 sm:px-4 sm:py-2">
								signup
							</Button>
						</Link>
					</div>
				) : (
					<Button
						bgColor="bg-blue-600"
						className="flex py-1 px-2 m-2 rounded-lg bg-blue-600 text-white cursor-pointer"
						onClick={() => logout()}
					>
						<LogOut size={24} color="white" />
						<span className="text-base tracking-normal">
							Logout
						</span>
					</Button>
				)}
			</nav>
		</>
	);
}

export default Navbar;
