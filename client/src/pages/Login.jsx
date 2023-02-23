import { useState, useEffect } from "react";  
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/Loader";

import { reset, login } from "../features/auth/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {  email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        if(isSuccess || user){
            navigate("/");
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])


    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData));
    }

    if(isLoading){
        return <Loader />
    }

    return <>
        
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Sign In an account</p>
        </section>
        
        <section className="form">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block"
                    >Login</button>
                </div>
            </form>
        </section>
    </>
}

export default Login;