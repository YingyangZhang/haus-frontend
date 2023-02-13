import React from "react";
import { useState } from "react";
import Signup from "./Signup";

export default function Login({setCurrentUser, setIsLogin}) {
    const [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    });
    const [isSignup, setIsSignup] = useState(false);
    const [errors, setErrors] = useState(null);

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setLoginInput({
            ...loginInput,
            [name]: value,
        })
    }

    function handleSignUP() {
        setIsSignup(true)
    }

    function handleLogin(e) {
        e.preventDefault();

        fetch('https://haus-app.onrender.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: loginInput,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    localStorage.setItem("jwt", data.jwt);
                    setCurrentUser(data.user);
                    setIsLogin(false);
                })
            } else {
                r.json().then((errors) => {
                    setErrors(errors.message)
                })
            }
        })
    }

    return (
        <>
        {isSignup ? 
        <Signup setIsSignup={setIsSignup} setCurrentUser={setCurrentUser} setIsLogin={setIsLogin}/>
        :
        <div className="login">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>LOGIN</h1>
                <div className="user-input">
                    <p>Username</p>
                    <input type='text' placeholder="Enter User Name" name='username' onChange={handleInput} />
                </div>
                <div className="user-input">
                    <p>Password</p>
                    <input type='password' placeholder="Enter Password" name='password' onChange={handleInput} />
                </div>
                <div className="errors-container">
                    {errors ? 
                        <p className="errors">* {errors}</p>
                    :
                    null
                    }
                </div>
                <div className="buttons-container">
                    <button className="login-btn" type="submit">
                        SIGN IN
                    </button>
                    <div className="signup-link">
                        <p onClick={handleSignUP}>SIGN UP</p>
                    </div>
                </div>
            </form>
            <i className='bx bx-x' onClick={() => setIsLogin(false)}></i> 
        </div>
        }
        </>
    )
}