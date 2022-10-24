import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginAsync } from "../../store/slices/authSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
            <Formik
                initialValues={{ email: "", password: ""}}
                onSubmit={ async values => {
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
                        <div className="rounded-xl w-fit h-fit bg-gradient-to-r p-0.5 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] mx-auto">
                            <form onSubmit={handleSubmit} className={`bg-white p-8`}>
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
                                className={`${errors.email && touched.email ? "text-input error": "text-input"} w-80 h-10 rounded-xl px-3 border border-black`}
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
                                className={`${errors.password && touched.password ? "text-input error": "text-input"} w-80 h-10 rounded-xl px-3 border border-black`}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback text-red-600">{errors.password}</div>
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
                            <div className="flex h-5 cursor-pointer underline-offset-4 justify-end" onClick={() => { navigate("/register") }}>
                               <span className="px-3">สมัครสมาชิก</span>  
                               <img  src="https://www.svgrepo.com/show/286495/arrow.svg" alt="" />
                            </div>
                        </form>
                        </div>
                    );
                }}
            </Formik>
        </>
  );
}
