import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAComment, editAComment } from "../store/Slices/commentSlice";
import { timeCreated } from "../helpers/time";
import DeletePopUp from "./DeletePopUp";
import Edit from "./Edit";
import Like from "./Like";
import { EllipsisVertical, Trash2, Pencil } from "lucide-react";
import { getVideoComments } from "../store/Slices/commentSlice";

function CommentList({
	avatar,
	username,
	createdAt,
	content,
	commentId,
	isLiked,
	likesCount,
	videoId,
}) {
	const [isEditing, setIsEditing] = useState({
		editing: false,
		editedContent: content,
		isOpen: false,
		delete: false,
	});

	const avatar2 = useSelector((state) => state?.auth?.userData?.avatar.url);
	const authUsername = useSelector(
		(state) => state?.auth?.userData?.username,
	);
	const dispatch = useDispatch();

	const handleEditComment = (editedContent) => {
		console.log("edited content :", editedContent);
		dispatch(editAComment({ commentId, content: editedContent }));
		setIsEditing((prev) => ({
			...prev,
			editing: false,
			editedContent,
			isOpen: false,
			delete: false,
		}));
	};

	const handleDeleteComment = () => {
		dispatch(deleteAComment(commentId));
		// dispatch(getVideoComments({videoId}));

		setIsEditing((prev) => ({
			...prev,
			delete: true,
		}));
	};

	return (
		<>
			<div className="w-full text-black flex justify-start items-center sm:gap-5 gap-3 p-3 sm:p-3 hover:bg-slate-200 rounded-3xl transition duration-500 ease-in-out">
				<div className="w-12">
					<img
						src={avatar2 || avatar}
						alt="profile picture"
						className="w-10 h-10 object-cover rounded-full"
					/>
				</div>
				<div className="w-full flex flex-col gap-1 relative">
					<div className="flex items-center gap-2">
						<h2 className="text-lg font-bold">{username}</h2>
						<span className="text-xs text-slate-400">
							{timeCreated(createdAt)}
						</span>
					</div>

					{authUsername === username && (
						<div className="absolute right-0">
							<div className="relative">
								<EllipsisVertical
									className="text-black cursor-pointer"
									onClick={() =>
										setIsEditing((prev) => ({
											...prev,
											isOpen: !prev.isOpen,
										}))
									}
								/>

								{isEditing.isOpen && (
									<div className="border text-lg bg-[#263850] text-white border-gray-200 absolute text-center w-30 right-4 rounded-xl">
										<ul>
											<li
												className="hover:opacity-70 px-5 cursor-pointer border-b border-gray-200 flex"
												onClick={() => {
													setIsEditing((prev) => ({
														...prev,
														editing: !prev.editing,
														isOpen: false,
													}));
												}}
											>
												<Pencil
													size={28}
													color="white"
													className="p-1"
												/>
												Edit
											</li>
											<li
												className="px-5 hover:opacity-50 cursor-pointer flex"
												onClick={() =>
													setIsEditing((prev) => ({
														...prev,
														delete: true,
														isOpen: false,
													}))
												}
											>
												<Trash2
													size={28}
													color="white"
													className="p-1"
												/>
												Delete
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
					)}

					{isEditing.delete && (
						<DeletePopUp
							onCancel={() =>
								setIsEditing((prev) => ({
									...prev,
									delete: false,
									isOpen: false,
								}))
							}
							OnDelete={handleDeleteComment}
							comment={true}
						/>
					)}
					{isEditing.editing ? (
						<Edit
							initialContent={isEditing.editedContent}
							onCancel={() =>
								setIsEditing((prev) => ({
									...prev,
									editing: true,
									isOpen: false,
								}))
							}
							onSave={handleEditComment}
						/>
					) : (
						isEditing.editedContent
					)}
					{
						<Like
							isLiked={isLiked}
							likeCount={likesCount}
							commentId={commentId}
							size={17}
						/>
					}
				</div>
			</div>
		</>
	);
}

export default CommentList;
