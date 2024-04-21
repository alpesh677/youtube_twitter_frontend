import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { createAComment } from "../store/Slices/commentSlice";
import { createTweet } from "../store/Slices/tweetSlice";
import { SendHorizontal } from "lucide-react";
import { getVideoComments } from "../store/Slices/commentSlice";

function SendComment({ tweet, comment, videoId }) {
	const { register, setValue, handleSubmit } = useForm();
	const dispatch = useDispatch();

	const sendContent = (data) => {
		if (data) {
			if (tweet) {
				dispatch(createTweet(data));
			} else if (comment) {
				dispatch(createAComment({ content: data.content, videoId }));
			}
			setValue("content", "");
		}
	};

	useEffect(()=>{
		dispatch(getVideoComments)
	},[dispatch])
	return (
		<>
			<form
				onSubmit={handleSubmit(sendContent)}
				className="sm:p-5 p-3 sm:max-w-4xl w-full relative"
			>
				<textarea
					className="w-full outline-none bg-[#0b0b1d] text-white rounded-xl p-4"
					rows="3"
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
		</>
	);
}

export default SendComment;
