import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const submit = (data) => {
		const query = data?.query;
		navigate(`/search/${query}`);
	};

	return (
		<>
			<form onSubmit={handleSubmit(submit)} className="flex">
				<Input
					placeholder="search"
					{...register("query", { required: true })}
				></Input>
			</form>
		</>
	);
}

export default SearchBar;
