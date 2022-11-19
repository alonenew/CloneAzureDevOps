import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/slices/authSlice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Input, InputLabel, Stack, Typography } from "@mui/material";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <Formik
                initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    dispatch(registerAsync(values))
                        .unwrap()
                        .then(() => {
                            navigate("/login")
                        })
                        .catch(() => {
                            alert("Register failed");
                        });
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            .email().required("Required"),
                        password: Yup.string()
                            .required("Required"),
                        firstName: Yup.string()
                            .required("Required"),
                        lastName: Yup.string()
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
                        <Box className="rounded-xl w-fit h-fit bg-gradient-to-r p-0.5 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] mx-auto ">
                            <Form className={`border bg-white p-5`}>
                                <InputLabel htmlFor="email"  >
                                    Email
                                </InputLabel>
                                <Input
                                    id="email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.email && touched.email ? "text-input error" : "text-input"} w-80 `}
                                />
                                {errors.email && touched.email && (
                                    <Box className="input-feedback text-red-600">{errors.email}</Box>
                                )}
                                <InputLabel htmlFor="password" className="mt-5" >
                                    Password
                                </InputLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.password && touched.password ? "text-input error" : "text-input"} w-80 `}
                                />
                                {errors.password && touched.password && (
                                    <Box className="input-feedback text-red-600">{errors.password}</Box>
                                )}
                                <InputLabel htmlFor="firstName" className="mt-5" >
                                    Firstname
                                </InputLabel>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.firstName && touched.firstName ? "text-input error" : "text-input"} w-80 `}
                                />
                                {errors.firstName && touched.firstName && (
                                    <Box className="input-feedback text-red-600">{errors.firstName}</Box>
                                )}
                                <InputLabel htmlFor="lastName" className="mt-5" >
                                    Lastname
                                </InputLabel>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.lastName && touched.lastName ? "text-input error" : "text-input"} w-80 `}
                                />
                                {errors.lastName && touched.lastName && (
                                    <Box className="input-feedback text-red-600">{errors.lastName}</Box>
                                )}

                                <Stack spacing={2} direction="row" my={2}>
                                    <Button variant='contained' color="error" fullWidth
                                        type="button" onClick={handleReset} disabled={!dirty || isSubmitting}>
                                        Clear
                                    </Button>
                                    <Button variant='contained' color="success" fullWidth
                                        type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                                        Register
                                    </Button>
                                </Stack>
                                <Box className="flex h-5 cursor-pointer underline" onClick={() => { navigate("/login") }}>
                                    <img src="https://www.svgrepo.com/show/286678/arrow-back.svg" alt="" />
                                    <Typography variant="body2" px={1}>Login</Typography>
                                </Box>
                            </Form>
                        </Box>
                    );
                }}
            </Formik>
        </>
    );
}
