import { useContext } from 'react';
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa';
import DataContext from './context/DataContext';

function Header({title}) {
  const {width} = useContext(DataContext)
  return (
    <div className='Header'>
        <h1>{title}</h1>
        {width < 765 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </div>
  )
}

export default Header