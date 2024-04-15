import React, { useEffect } from 'react'
import Input from "./Input"
import Button from './Button'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, userLogin } from "../store/Slices/authSlice.js"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const id = useSelector((state)=>state.auth?.userData?._id) | false;

    useEffect(()=>{
        if(id){
            navigate("/home")
        }
    },[id])

    const submit = async (data) => {
        const isEmail = data.username.includes('@');
        const loginData = isEmail ? { email: data.username, password: data.password } : { username: data.username, password: data.password }

        const response = await dispatch(userLogin(loginData));
        const user = await dispatch(getCurrentUser());
        if (user && response?.payload) {
            navigate("/home")
        }
    }

    if (loading) {
        return (
            <span className='text-lg text-center'>Loading...</span>
        )
    }
    return (
        <div className='w-full h-screen text-black p-2 flex justify-center items-start'>
            <div className='flex max-w-6xl flex-col space-y-2 justify-center items-center border border-red-400 p-3 mt-10'>
                <div className='text-center'>
                    LOGO
                </div>

                <form onSubmit={handleSubmit(submit)} className='space-y-2 p-2'>
                    <Input
                        label="Username/Email : "
                        type="text"
                        placeholder="abc@gmail.com"
                        {...register("username", {
                            required: "username is required"
                        })}
                    />
                    {
                        errors.username && (
                            <span className='text-red-600'>{errors.username.message}</span>
                        )
                    }
                    <Input
                        type="password"
                        label="Password : "
                        {...register("password", {
                            required: "Password is Required"
                        })}
                    />
                    {
                        errors.password && (
                            <span className='text-red-600'>{errors.password.message}</span>
                        )
                    }

                    <Button
                        type='submit'
                        bgColor='bg-green-500'
                        className='w-full sm:py-3 py-2 hover:bg-green-700 text-lg'
                    >
                        Login
                    </Button>
                    <p className='text-sm text-center'>
                        Don&apos;t have Account?
                        <Link to={"/signup"}>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login