import React,{useState ,useEffect} from 'react'
import logo from './netflixLogo.png'
import avatar from './netflixAvatar.png'
import './navbar.css'
function Navbar() {

    const [show ,handleShow]=useState(false)

    useEffect(() => {
        
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else{
                handleShow(false);
            }
        });
        return()=>{
            window.removeEventListener("scroll");
        };   
    }, []);


    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo" src={logo} alt="netflix_logo"/>            
            <img className="nav_avatar" src={avatar} alt="loginAvatar"/>    
        </div>
    )
}

export default Navbar
