import { Button, Card, CardContent, Grid, Paper, TextField } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import Input from './Input';
import { useRef, useState, useEffect } from 'react';


const LoginForm = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const aa = (event) => {
        console.log(event.target.value);
    }

    const onSubmitForm = (event) => {
        console.log(emailRef.current.value, "   ", passwordRef.current.value);
        event.preventDefault();
    }

    return (
        <Grid container>
            <Grid item sm={2}></Grid>
            <Grid container item sm={8} justifyContent='center' alignItems='center' style={{ minHeight: '80vh' }}>
                <Grid>
                    <Paper elevation={24} sx={{
                        p: 3,
                        borderRadius: 2,
                        boxSizing: "border-box"
                    }} >
                        <form onSubmit={onSubmitForm}>
                            <Input
                                type='email'
                                label='Email'
                                inputRef={emailRef}
                            />
                            <Input
                                type='password'
                                label='Password'
                                inputRef={passwordRef}
                            />
                            <LoadingButton type='submit' loading={false} variant="outlined" sx={{ marginTop: 2, px: 6, py: 1 }}>
                                Login
                            </LoadingButton>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item sm={2}></Grid>
        </Grid>
    )
}


export default LoginForm;