import React from 'react';
import './Header.css'
import header_img from "/src/assets/header_img.jpg"
const Header = () => {
  return (
   <div className="header" 
   style={ {background: `url(${header_img})`, backgroundPosition: "center", backgroundSize: "cover", } }
   >
    <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
        Satisfy your cravings with just a few clicks! Our platform connects you to a variety of local eateries, offering everything from hearty favorites to exotic cuisines. Enjoy fast delivery and indulge in a culinary adventure without leaving your home!
        </p>
        <button >View Menu</button>
    </div>
   </div>
  )
}

export default Header