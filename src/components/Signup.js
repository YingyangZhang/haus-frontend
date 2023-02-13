import React from "react";
import { useState } from "react";

export default function Signup({setIsSignup, setCurrentUser, setIsLogin}) {
    const [signupInput, setSignupInput] = useState({
        username: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
        email: ""
    });
    const [errors, setErrors] = useState(null)

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setSignupInput({
            ...signupInput,
            [name]: value,
        })
    }

    function handleSignup(e) {
        e.preventDefault();
        
        fetch('https://haus-app.onrender.com/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: signupInput,
            })
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    localStorage.setItem("jwt", data.jwt);
                    setCurrentUser(data.user);
                    setIsLogin(false);
                })
            } else {
                r.json().then((errors) => {
                    console.log(errors);
                    setErrors(errors.errors)
                })
            }
        })
    }

    return(
        <div className="login">
            <form className="login-form" onSubmit={handleSignup}>
                <h1>SIGN UP</h1>    
                <div className="sign-up">
                    <div className="signup-container">      
                        <div className="user-input">
                            <p>Username</p>
                            <input type='text' placeholder="Enter Username" name='username' onChange={handleInput} />
                        </div>
                        <div className="user-input">
                            <p>Password</p>
                            <input type='password' placeholder="Enter Password" name='password' onChange={handleInput} />
                        </div>
                        <div className="user-input">
                            <p>Password Confirmation</p>
                            <input type='password' placeholder="Enter Password Confirmation" name='password_confirmation' onChange={handleInput} />
                        </div>
                    </div>

                    <div className="signup-container">
                        <div className="user-input">
                            <p>First Name</p>
                            <input type='text' placeholder="Enter First Name" name='first_name' onChange={handleInput} />
                        </div>
                        <div className="user-input">
                            <p>Last Name</p>
                            <input type='text' placeholder="Enter Last Name" name='last_name' onChange={handleInput} />
                        </div>
                        <div className="user-input">
                            <p>Email</p>
                            <input type='text' placeholder="Enter Email" name='email' onChange={handleInput} />
                        </div>
                    </div>
                </div>

                <div className="errors-container">
                    {errors ? 
                        (errors.map(error => {
                            return <p className="errors">* {error}</p>
                        }))
                    :
                    null
                    }
                </div>

                <div className="buttons-container">
                    <button className="login-btn" type="submit">
                        SIGN UP
                    </button>
                    <div className="signup-link">
                        <p onClick={() => setIsSignup(false)}>Go Back</p>
                    </div>
                </div>
            </form>
            <i className='bx bx-x' onClick={() => setIsLogin(false)}></i> 
        </div>
    )
}