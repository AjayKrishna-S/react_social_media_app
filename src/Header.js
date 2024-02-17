import React from 'react'
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";

function Header({title, width}) {
  return (
    <div className='Header'>
        <h1>{title}</h1>
        {width < 765 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </div>
  )
}

export default Header