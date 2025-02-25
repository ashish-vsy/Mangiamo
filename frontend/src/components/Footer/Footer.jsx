import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import test_logo from "/src/assets/test_logo.png"

const Footer = () => {
  return (
    <div className='footer' id = "footer">
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={test_logo} alt="" style={{width: "50px", borderRadius: "100%"}} />
<p>From our kitchen to your table, we pride ourselves on quality and convenience. Enjoy a diverse range of dishes and let us take care of your hunger!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home </li>
                    <li>About us </li>
                    <li>Delivery </li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                       <li>+91 123 123 4567</li>
                       <li>cantact@ashish.com</li> 
                    </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 © mangiamo.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer