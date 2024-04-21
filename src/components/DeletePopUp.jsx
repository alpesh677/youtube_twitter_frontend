import React from "react";

function DeletePopUp({ onCancel, OnDelete, comment, tweet, video }) {
	return (
		<>
			<div className="fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-65 z-50 ">
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className=" bg-[#263850] text-white text-center sm:p-5 p-3 border-slate-600 flex-wrap gap-2 rounded-xl">
						<div className="flex flex-col flex-wrap items-start">
							<h1 className="text-bold text-xl mb-1 flex">
								Delete {" "}
								{`${comment ? "Comment" : ""}
                                    ${tweet ? "Tweet" : ""}
                                    ${video ? "Video" : ""}
                                    `}{" "}
								
							</h1>
							<p className="text-sm text-start font-semibold w-60">
								<span>
									Delete your{" "}
									{`${comment ? "Comment" : ""}
                                        ${tweet ? "Tweet" : ""}
                                        ${video ? "Video" : ""}`}{"permanently?"}
								</span>
								
							</p>
						</div>
						<div className="font-normal mt-2 flex gap-2 justify-end">
							<button
								onClick={onCancel}
								className="bg-transparent text-blue-400 py-1 px-3 rounded-lg sm:text-lg font-semibold text-sm hover:bg-sky-200 hover:text-blue-700 cursor-pointer"
							>
								Cancel
							</button>
							<button
								onClick={OnDelete}
								className="text-blue-400 py-1 px-3 rounded-lg sm:text-lg text-sm font-semibold cursor-pointer hover:bg-red-600 hover:text-white"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DeletePopUp;
