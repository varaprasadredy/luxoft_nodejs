import React, { useState } from 'react';
import { Button, Typography, TextField, FormControl, CircularProgress, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom'
import "./login.css"
import fetchTimeout from '../../fetch-timeout'

const Login = () => {
    const [values, setValues] = useState({
        userName: '',
        password: '',
        showPassword: false,
    });

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null);
    const history = useHistory();

    const handleChange = (prop) => (event) => {
        setError(null)
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginAction = () => {
        const validation = isValid()
        if (!validation.isValid) { return setError(validation.message) }
        // history.push({pathname:'/userDetails',
        //     state: {name: "ashok", email:"asasas@as.com"}
        // });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: values.userName, password: values.password })
        };
        setLoading(true)
        fetch("http://localhost:3012/api/user/login", requestOptions)
            .then((res) => {
                if (res.ok) return res.json();
                return res.json().then(res => { throw new Error(res.message) })
            })
            .then(
                (result) => {
                    console.log(result)
                    setLoading(false)
                    if (result.constructor == Object) {
                        history.push({
                            pathname: '/profile',
                            state: result
                        });
                    } else if (result.constructor == Array){
                        history.push({
                            pathname: '/userDetails',
                            state: result
                        });
                    }
                    else{
                        setError(result && result.message)
                    }
                },
                (error) => {
                    setLoading(false)
                    setError(error && error.message)
                }
            )
    };

    function isValid() {
        if (values.userName.length === 0) return { isValid: false, message: "Please enter a user name" }
        else if (values.password.length === 0) return { isValid: false, message: "Please enter a password" }
        return { isValid: true, message: '' }
    }

    return (
        <div className="container">
            <Typography className="logo-text" variant="h4">User Login</Typography>
            <TextField className="text-field" label="User name" variant="outlined" onChange={handleChange('userName')} />
            <FormControl className="text-field" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            {error && <label className="error">{error}</label>}
            <div>
                {loading && <CircularProgress size={24} style={{ marginRight: '5px', verticalAlign: "middle" }} />}
                {!loading && <Button className="login" variant="contained" color="primary" onClick={loginAction}>Login</Button>}
            </div>
        </div>
    );
}

export default Login;