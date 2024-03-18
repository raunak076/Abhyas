import React, { useContext, useRef, useState } from 'react'
import style from "../styles/styles.module.css"
import Background from '../constants/Background'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthProvider'
import useAuth from '../hooks/useAuth'
import { useCookie } from '../cookie/useCookie'

const Login = () => {
  const [name,setName]=useState("");
 const [pass,setPass]=useState("");
 const navigate=useNavigate();
 const {auth,setAuth}=useAuth();
 const { set, get, remove } = useCookie('isLog');
 const { set:setuser, get:getuser } = useCookie('auth');




     const handlelogin=(e)=>{
    
           e.preventDefault();
          
          //  console.log(typeof(name),typeof(pass))
           axios.post('http://localhost:3000/login',{
            name:name,
            pass:pass
           }).then((res)=>{
             var pid=res?.data.pid;
             var role=res?.data.role;
              toast.success("Welcome  !", {
              position: "top-center"
            });
              setAuth({name,pid});
              set(true)
                 setuser({name,role});
              console.log(res,getuser())
              setTimeout(() => {
                if(role==="teacher"){
                  navigate('/teacher');
                }
                else{
                  navigate('/dashboard');
                }
              }, 1000);

           }).catch((error)=>{
            toast.error("Something Went Wrong  !", {
              position: "top-center"
            });
           console.log(error)
           })
     }

  return (
    <div>
      
      <section>
        <Background />

        <motion.div
        initial={{height:'0%'}}
        animate={{height:'auto'}}
        transition={{duration:.5}}
        className={style.signin}>

          <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:2}}
          className={style.content}>

            <h2>Sign In</h2>

            <form onSubmit={handlelogin} className={style.form}>

              <div className={style.inputBox}>

                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" required /> <i>Username</i>

              </div>

              <div className={style.inputBox}>

                <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" required /> <i>Password</i>

              </div>

              <div className={style.links}> <a href="#">Forgot Password</a> <Link to="/"><a>Home</a> </Link> <Link to="/register"><a>Signup</a> </Link>

              </div>

              <div className={style.inputBox}>

                <input type="submit" value="Login" />

              </div>

            </form>

          </motion.div>

        </motion.div>

      </section>
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
    </div>
  )
}

export default Login


