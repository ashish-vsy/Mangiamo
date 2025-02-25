import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import test_logo from "/src/assets/test_logo.png"
import { FaShoppingBasket, FaSearch } from "react-icons/fa";


const Navbar = ({setShowLogin}) => {
 
  const [menu, setMenu] = useState("menu")

  const {getTotalAmount, token, setToken} = useContext(StoreContext)

  const navigate = useNavigate();
   
  // logout function and navigate to "home page" using navigate function
  const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
  }

  return (
    <div className='navbar'>
        <Link to='/'><img src={test_logo} alt="" className='logo' style={{width: "50px" }} /></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact-Us</a>
        </ul>
        <div className="navbar-right">
         
                {/* <FaSearch size={24} className='navbar-menu' /> */}
            <div className="navbar-search-icon">
                <Link to = '/cart'><FaShoppingBasket size={24} className='navbar-menu' /></Link>
                <div className={getTotalAmount()===0?"":"dot"}></div>
            </div>
            {/* Showing profile if user is logged in  */}


            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
              : <div className='navbar-profile'>
                  <img src={assets.profile_icon} alt="" />
                  <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                  </ul>
              </div>}

        </div>
    </div>
  )
}

export default Navbar