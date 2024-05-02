import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { createAComment } from "../store/Slices/commentSlice";
import { createTweet } from "../store/Slices/tweetSlice";
import { SendHorizontal } from "lucide-react";
import { getVideoComments } from "../store/Slices/commentSlice";
import { cleanUpComments } from "../store/Slices/commentSlice";

function SendComment({ tweet, comment, videoId }) {
	const { register, setValue, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const avatar = useSelector((state) => state?.auth?.userData?.avatar);
	const [counter, setCounter] = useState(true);

	const sendContent = (data) => {
		try {
			if (data) {
				if (tweet) {
					dispatch(createTweet(data));
				} else if (comment) {
					dispatch(
						createAComment({ content: data.content, videoId }),
					);
				}
				setValue("content", "");
			}
		} catch (error) {
		} finally {
			setCounter(!counter);
		}
	};

	// useEffect(() => {
	// 	dispatch(
	// 		getVideoComments({
	// 			videoId,
	// 		}),
	// 	);
	// 	return () => dispatch(cleanUpComments());
	// }, [dispatch,counter]);

	useEffect(() => {
		if (videoId) {
			dispatch(
				getVideoComments({
					videoId,
					page: 1,
					limit: 10,
				}),
			);
		}
		return () => dispatch(cleanUpComments());
	}, [counter, dispatch]);

	return (
		<>
			<div className="flex flex-row ">
				<img
					src={avatar}
					alt="avatar"
					className="w-12 h-12 rounded-full my-0"
				/>
				<form
					onSubmit={handleSubmit(sendContent)}
					className="sm:p-5 p-3 sm:max-w-4xl w-full relative"
				>
					<textarea
						className="w-full h-16 focus:h-32 outline-none border-b-2 rounded-xl p-4 transition duration-700 ease-in-out"
						placeholder={`${
							comment ? "Add a Comment" : "Write a tweet"
						}`}
						{...register("content", { required: true })}
					/>
					<button
						type="submit"
						className="px-2 py-2  hover:scale-110 transition-all ease-in absolute bottom-14"
					>
						<SendHorizontal color="blue" size={32} />
					</button>
				</form>
			</div>
		</>
	);
}

export default SendComment;
