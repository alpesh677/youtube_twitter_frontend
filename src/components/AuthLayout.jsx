import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true}) {
	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
        if(!authentication && authStatus !== authentication){
            return
        }
    }, [authentication,authStatus,navigate]);

    if(authentication && authStatus !== authentication){
        navigate("login") //or login and signin both
    }
	return children
}

export default AuthLayout;
