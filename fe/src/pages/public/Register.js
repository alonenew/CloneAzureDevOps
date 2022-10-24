import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/slices/authSlice";
import { Formik } from "formik";
import * as Yup from "yup";

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
                            alert("สมัครสมาชิกไม่สำเร็จ");
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
                        <div className="rounded-xl w-fit h-fit bg-gradient-to-r p-0.5 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] mx-auto ">
                            <form onSubmit={handleSubmit} className={`border bg-white p-5`}>
                                <label htmlFor="email" className="block font-bold" >
                                    อีเมล
                                </label>
                                <input
                                    id="email"
                                    placeholder="อีเมล"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.email && touched.email ? "text-input error" : "text-input"} w-80 h-10 rounded-xl px-3 border border-black`}
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback text-red-600">{errors.email}</div>
                                )}
                                <label htmlFor="password" className="block font-bold mt-5" >
                                    รหัสผ่าน
                                </label>
                                <input
                                    id="password"
                                    placeholder="รหัสผ่าน"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.password && touched.password ? "text-input error" : "text-input"} w-80 h-10 rounded-xl px-3 border border-black`}
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback text-red-600">{errors.password}</div>
                                )}
                                <label htmlFor="firstName" className="block font-bold mt-5" >
                                    ชื่อ
                                </label>
                                <input
                                    id="firstName"
                                    placeholder="ชื่อ"
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.firstName && touched.firstName ? "text-input error" : "text-input"} w-80 h-10 rounded-xl px-3 border border-black`}
                                />
                                {errors.firstName && touched.firstName && (
                                    <div className="input-feedback text-red-600">{errors.firstName}</div>
                                )}
                                <label htmlFor="lastName" className="block font-bold mt-5" >
                                    นามสกุล
                                </label>
                                <input
                                    id="lastName"
                                    placeholder="นามสกุล"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${errors.lastName && touched.lastName ? "text-input error" : "text-input"} w-80 h-10 rounded-xl px-3 border border-black`}
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="input-feedback text-red-600">{errors.lastName}</div>
                                )}
                                <div className="flex mx-auto my-5 justify-between">
                                    <button
                                        className=" bg-blue-300 p-1 rounded-xl w-36 text-black hover:text-white border border-blue-400"
                                        type="button" onClick={handleReset} disabled={!dirty || isSubmitting}>
                                        ล้าง
                                    </button>
                                    <button
                                        className=" bg-blue-300 p-1 rounded-xl w-36 text-black hover:text-white border border-blue-400"
                                        type="submit" disabled={isSubmitting}>
                                        ยืนยัน
                                    </button>
                                </div>
                                <div className="flex h-5 cursor-pointer underline-offset-4 " onClick={() => { navigate("/login") }}>
                                    <img src="https://www.svgrepo.com/show/286678/arrow-back.svg" alt="" />
                                    <span className="px-3 ">เข้าสู่ระบบ</span>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </>
    );
}
