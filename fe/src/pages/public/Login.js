import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginAsync } from "../../store/slices/authSlice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import { Box, Button, Typography, Input, Stack, TextField, InputLabel, FormControl } from "@mui/material";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    dispatch(loginAsync(values))
                        .unwrap()
                        .then((e) => {
                            let decoded = (jwt_decode(e.token));
                            localStorage.setItem("token", e.token);
                            localStorage.setItem("id", decoded.sub);
                            dispatch(login(e))
                            navigate("/")
                        })
                        .catch((e) => {
                            console.log(e);
                            alert("เข้าสู่ระบบไม่สำเร็จ");
                        });
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            .email().required("Required"),
                        password: Yup.string()
                            .required("Required")
                    })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;
                    return (
                        <Box className="rounded-xl w-fit h-fit bg-gradient-to-r p-0.5 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] mx-auto">
                            <Form className={`bg-white p-8`}>
                                <InputLabel htmlFor="email">
                                    อีเมล
                                </InputLabel>
                                <Input
                                    id="email"
                                    placeholder="อีเมล"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.email && touched.email ? "text-input error" : "text-input"} w-80`}
                                />
                                {errors.email && touched.email && (
                                    <Box className="input-feedback text-red-600">{errors.email}</Box>
                                )}
                                <InputLabel htmlFor="password" className="mt-5">
                                    รหัสผ่าน
                                </InputLabel>
                                <Input
                                    variant="filled"
                                    id="password"
                                    placeholder="รหัสผ่าน"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.password && touched.password ? "text-input error" : "text-input"} w-80`}
                                />
                                {errors.password && touched.password && (
                                    <Box className="input-feedback text-red-600">{errors.password}</Box>
                                )}
                                <Stack spacing={2} direction="row" my={2}>
                                    <Button variant="contained" color="error" fullWidth
                                        onClick={handleReset} disabled={!dirty || isSubmitting}>
                                        Clear
                                    </Button>
                                    <Button variant="contained" color="success" fullWidth disabled={isSubmitting}
                                        className="ml-3" onClick={handleSubmit}> 
                                        Login
                                    </Button>
                                </Stack>
                                <Box className="flex h-5 cursor-pointer underline justify-end mt-5" onClick={() => { navigate("/register") }}>
                                    <Typography variant="body2" px={1} >Register</Typography>
                                    <img src="https://www.svgrepo.com/show/286495/arrow.svg" alt="" />
                                </Box>
                            </Form>
                        </Box>
                    );
                }}
            </Formik>
        </>
    );
}
