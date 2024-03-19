import React, { useEffect, useState } from 'react'
import style from "../styles/styles.module.css"
import Background from '../constants/Background'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';


const Register = () => {
    const [name, setName] = useState("");
    const [pid, setPid] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const nav = useNavigate();

    const submitform = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/api/${role}/register`, {
            name: name,
            pid: pid,
            password: pass,
            email: email
        }).then(() => {
            toast.success("Welcome  !", {
                position: "top-center"
            });

            setTimeout(() => {
                nav('/login');
            }, 1000);

        }).catch(() => {
            toast.error("Something Went Wrong  !", {
                position: "top-center"
            });
        })
    }


    return (
        <div>
            <section>
                <Background />

                <motion.div
                    initial={{ height: '0%' }}
                    animate={{ height: 'auto' }}
                    transition={{ duration: .5 }}
                    className={style.signin}>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className={style.content}>

                        <h2>Sign In</h2>

                        <form onSubmit={submitform} className={style.form}>

                            <div className={style.inputBox}>

                                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" required /> <i>Username</i>

                            </div>

                            <div className={style.inputBox}>

                                <input value={pid} onChange={(e) => { setPid(e.target.value) }} type="text" required /> <i>PID</i>

                            </div>

                            <div className={style.inputBox}>

                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" required /> <i>Email</i>

                            </div>

                            <div className={style.inputBox}>

                                <input value={pass} onChange={(e) => { setPass(e.target.value) }} type="password" required /> <i>Password</i>

                            </div>

                            <div className={style.inputBox}>

                                <select onChange={(e) => setRole(e.target.value)}>
                                    <optgroup>
                                        <option value="student">student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="role" selected>Role</option>
                                    </optgroup>
                                </select>

                            </div>


                            <div className={style.links}> <Link to="/"><a>Home</a> </Link><Link to="/login"><a>Login</a> </Link>

                            </div>

                            <div className={style.inputBox}>

                                <input type="submit" value="Register" />

                            </div>

                        </form>

                    </motion.div>

                </motion.div>
                {/* toast */}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"

                />
            </section>
        </div>
    )
}

export default Register
