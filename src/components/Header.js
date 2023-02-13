import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import search from "../images/search-icon.png";
import { useNavigate } from "react-router-dom";

function Header({setIsBag, setIsSearch, currentUser, setCurrentUser, setIsLogin, cartItems}) {

    const navigate = useNavigate()

    function handleBag() {
        setIsBag(true)
    }

    function handleLogin() {
        setIsLogin(true)
    }

    function handleSearch() {
        setIsSearch(true);
    }

    function handleHome() {
        navigate(`/`)
    }

    function handleLogout(e) {
        e.stopPropagation();
        localStorage.removeItem('jwt');
        setCurrentUser(null);
        navigate('/');
    }

    return (
        <header className="header">
            <nav className="header-nav">
                <motion.a href="#" className="nav-logo" onClick={handleHome} initial={{ y: 10, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }}>
                    HAUS
                </motion.a>                
                <ul>
                    <li><NavLink to="/" exact="true" style={{color: "#000"}}>HOME</NavLink></li>
                    <li><NavLink to="/products" exact="true" style={{color: "#000"}}>PRODUCTS</NavLink></li>
                    {currentUser ? <li onClick={handleBag}>BAG ({cartItems.length})</li> : <li onClick={handleLogin}>LOGIN</li>}
                    {currentUser ? <li><NavLink to="/profile" exact="true" style={{color: "#000"}}>{currentUser.username.toUpperCase()}</NavLink></li> : null}
                    {currentUser ? <i className='bx bx-log-out' onClick={handleLogout}></i> : null}
                </ul>                
            </nav>
            <img src={search} alt='search-icon' className="search-icon" onClick={handleSearch}/> 
            <p className="year">2022</p> 
        </header>
    )
}

export default Header;