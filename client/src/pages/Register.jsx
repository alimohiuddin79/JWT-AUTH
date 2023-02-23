import { useState, useEffect } from "react";
// useSelector is used for calling states and useDispatch is used for calling reducers function
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";
import Loader from "../components/Loader";

import { reset, register } from "../features/auth/authSlice";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { name, email, password, confirmPassword } = formData;

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

        if(password !== confirmPassword){
            toast.error("Password do not match");
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData));
        }
    }

    if(isLoading){
        return <Loader />
    }

    return <>
        
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>
        
        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id="confirm-password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block"
                    >Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Register;