import React,{useState} from "react";

function Edit({ initialContent, onCancel, onSave }) {
    const [editedContent, setEditedContent] = useState(initialContent)

    const handleSave = () => {
        onSave(editedContent)
    }
	return (
		<div className="w-full text-sm">
			<input 
                type="text"
                className="outline-none border-b w-3/4 p-2"
                value={editedContent}
                onChange={(e)=>setEditedContent(e.target.value)}
                />
            
            <div className="mt-3 w-3/4 inline-flex justify-end items-center">
            <span className="py-1 px-3 font-normal rounded-lg hover:cursor-pointer"
                onClick={onCancel}
            >
                Cancel
            </span>
            <button className="py-1 px-3 font-normal rounded-lg hover:cursor-pointer"
            onClick={handleSave}>
                Save
            </button>

            </div>
		</div>
	);
}

export default Edit;
