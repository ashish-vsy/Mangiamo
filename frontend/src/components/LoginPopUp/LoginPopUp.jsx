import React, {  useContext, useState } from 'react';
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from 'sonner';
const LoginPopUp = ({setShowLogin}) => {


    const {url, setToken} = useContext(StoreContext)

    const[currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event)=>{
            const name =  event.target.name;
            const value = event.target.value;
            setData(data=>({...data,[name]:value}))
    }
    const onLogin = async(event) =>{
            event.preventDefault();  
            let newUrl = url;
            let successMessage = "";
            if(currState=== "Login"){
                newUrl += "/api/user/login"
                successMessage = "Login successful! Welcome back 🎉";
            } 
            else{
                newUrl += "/api/user/register"
                successMessage = "Registration successful";
            }  
            
            const response = await axios.post(newUrl,data);

            if (response.data.success) {
                toast.success(successMessage);
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token);
                setShowLogin(false)
            }
            else{
                toast.error(response.data.message)
            }

    }


        //checking data in console

    // useEffect(()=>{
    //     console.log(data);
    // },[data])

  return (
 <div className="login-popup">
    <form onSubmit={onLogin}  className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            {/* <input type="text" placeholder='Your name' required /> */}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type = 'submit'>{currState==="sign up"?"create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span  onClick={()=>setCurrState("sign up")}>click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        
        }
    </form>
 </div>
)
}

export default LoginPopUp