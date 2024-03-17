import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastErr = () => {
    const notify = () => {

        toast.error("Something Went Wrong  !", {
            position: "top-center"
          });
    
    }
  return (
    <div>
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

export default ToastErr
