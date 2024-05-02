import React, { useEffect } from "react";
import ChannelHeader from "../components/ChannelHeader";
import ChannelNavbar from "../components/ChannelNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,useParams } from "react-router-dom";
import { userChannelProfile } from "../store/Slices/userSlice";

function Dashboard() {
	const dispatch = useDispatch();
	const username = useParams();
	const channel = useSelector((state) => state?.user?.userData);
    const username1 = username.username;
    
	useEffect(() => {
		dispatch(userChannelProfile(username1));
	}, [dispatch, username1]);

	return (
		<>
			{channel && (
				<ChannelHeader
					username={username.username}
					avatar={channel?.avatar}
					coverImage={channel?.coverImage}
					subscribedCount={channel?.subscribersCount}
					fullName={channel?.fullName}
					isSubscribed={channel?.isSubscribed}
					channelId={channel?._id}
				/>
			)}
			<ChannelNavbar username={username} />
			
		</>
	);
}

export default Dashboard;
