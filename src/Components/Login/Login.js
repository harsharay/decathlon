import { Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { loginData } from "../../LoginDetails"

import "./Login.css"

const Login = (props) => {

    const [inputData, setInputData] = useState({
        username: "",
        password: ""
    })

    useEffect(() => console.log(15, props.match.path),[])

    const handleInputChange = e => {
        let name = e.target.name
        let value = e.target.value

        setInputData(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleVerifyLogin = () => {
        let { username, password } = inputData

        if(username.length >0 && password.length >0){
            if(loginData[username]){
                if(loginData[username] === password) {
                    alert("login successful")
                    props.handleLogin(username)
                    props.history.push("/")
                } else {
                    alert("Wrong password")
                }
            } else {
                alert("Username not found")
            }
        }
    }

    return (
        <div className="login-root">
            <div className="login-content">
                <div className="input-block">
                    <p>Username</p>
                    <input type="text" name="username" value={inputData.username} onChange={handleInputChange}/>
                </div>

                <div className="input-block">
                    <p>Password</p>
                    <input type="password" name="password"  value={inputData.password} onChange={handleInputChange}/>
                </div>

                <Button variant="contained" color="primary" onClick={handleVerifyLogin}>Login</Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        login: state.loginDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: username => dispatch({ type: "LOGIN_USER", payload: username })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);