import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createAccount, userLogin } from "../store/Slices/authSlice.js"
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import Input from "./Input.jsx"
import Button from "./Button.jsx"

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const loading = useSelector((state) => state.auth?.loading);
  const id = useSelector((state)=>state.auth?.userData?._id);

    useEffect(()=>{
        if(id){
            navigate("/home")
        }
    },[id])

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const loginResult = await dispatch(
        userLogin({ username, password })
      );

      if (loginResult?.type === "login/fulfilled") {
        navigate("/home"); //TODO: redirect to home page
      } else {
        navigate("/login");
      }
    }
  }


  if (loading) {
    return (
      <span className='text-lg text-center'>Loading...</span>
    )
  }


  return (
    <div className='w-full h-screen flex items-center justify-center text-black p-4'>
      <div className='flex flex-col justify-center items-center p-2 border border-red-400'>
        <div>
          TODO: LOGO
        </div>
        <form onSubmit={handleSubmit(submit)} className='space-y-4 text-sm p-2 sm:w-96 w-full'>
          <Input
            label="Select the Avatar"
            type="file"
            {...register("avatar")}
          />
          <Input
            label="Select the Cover Image"
            type="file"
            {...register("coverImage")}
          />
          <Input
            label="Username : "
            type="text"
            {...register("username", {
              required: "username is required"
            })}
            className="h-8"
          />
          {
            errors.message && (
              <span className='text-red-600'> {errors.username.message}</span>
            )
          }
          <Input
            label="FullName : "
            type="text"
            {...register("fullName", {
              required: "fullName is required"
            })}
            className="h-8"
          />
          {
            errors.message && (
              <span className='text-red-600'> {errors.fullName.message}</span>
            )
          }
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "email is required"
            })}
          />
          {
            errors.message && (
              <span className='text-red-600'>{errors.email.message}</span>
            )
          }
          <Input
            label="Password : "
            type="password"
            {...register("password", {
              required: "password is required"
            })}
          />
          {
            errors.message && (
              <span className='text-red-600'>{errors.email.message}</span>
            )
          }
          <Button
            type='submit'
            bgColor="bg-blue-500"
            className='w-full sm:py-3 py-2 text-lg hover:bg-blue-300'
          >
            Sign up
          </Button>
          <p className='text-center text-sm'>
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className='text-purple-600 cursor-pointer hover:opacity-70'
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup