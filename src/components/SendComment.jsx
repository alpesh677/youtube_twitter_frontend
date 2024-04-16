import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { createAComment } from "../store/Slices/commentSlice";
import { createTweet } from "../store/Slices/tweetSlice";
import { SendHorizontal } from 'lucide-react';

function SendComment({ tweet, comment, videoId }) {
	const { register, setValue, handleSubmit } = useForm();
	const dispatch = useDispatch();

	const sendContent = (data) => {
		if (data) {
			if (tweet) {
				dispatch(createTweet(data));
			} else if (comment) {
				dispatch(createAComment({content:data.content,videoId}));
			}
			setValue("content", "");
		}
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(sendContent)}
				className="sm:p-5 p-3 sm:max-w-4xl w-full relative"
			>
            <textarea 
                placeholder={`${comment ? "Write a tweet" : "Add a Comment"}`}
                className="p-2 text-base focus:border-blue text-black  outline-black/15 rounded-lg w-full"
                {...register("content",{required : true})}
                rows={2}
            />

            <button
                type="submit"
                className="px-2 py-2  hover:scale-110 transition-all ease-in absolute bottom-7"
            >
                <SendHorizontal
                    color="blue"
                    size={32}
                />
            </button>
            </form>
		</>
	);
}

export default SendComment;
