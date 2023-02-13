import React, { useEffect, useState } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Search from "./Search";
import Bag from "./Bag";
import Products from "./Products";
import Checkout from "./Checkout";
import ScrollRestoration from "./ScrollRestoration";
import SingleProduct from "./SingleProduct";
import ThankYou from "./ThankYou";
import Login from "./Login";
import Profile from "./Profile";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isLogin, setIsLogin] = useState(null);
    const [furnitures, setFurnitures] = useState([])
    const [isSearch, setIsSearch] = useState(false);
    const [isBag, setIsBag] = useState(false);
    const [selectedCat, setSelectedCat] = useState("All")
    const [isCancel, setIsCancel] = useState(false)
    const token = localStorage.getItem("jwt")

    useEffect(() => {
        if (token !== null) {
        fetch("https://haus-app.onrender.com/me", {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then(r => r.json())
        .then(data => {
            setCurrentUser(data.user)
            setCartItems(data.user.cart_items)
            console.log(data.user)
        })
        }
    },[])

    useEffect(() => {
        fetch('https://haus-app.onrender.com/furnitures')
        .then(r => r.json())
        .then(data => {
            console.log(data);
            const strAscending = [...data].sort((a, b) =>
            a.name > b.name ? -1 : 1);
            setFurnitures(strAscending)
        })

    },[])

    return(
        <>
            <ScrollRestoration />
            {isLogin ? <Login setCurrentUser={setCurrentUser} setIsLogin={setIsLogin}/> : null}
            {isSearch ? <Search isSearch={isSearch} setIsCancel={setIsCancel} setIsSearch={setIsSearch} furnitures={furnitures} setFurnitures={setFurnitures} /> : null}
            {currentUser ? <Bag isBag={isBag} setIsBag={setIsBag} cartItems={cartItems} setCartItems={setCartItems}/> : null}
            <Header currentUser={currentUser} setIsLogin={setIsLogin} setIsSearch={setIsSearch} setIsBag={setIsBag} cartItems={cartItems} setCurrentUser={setCurrentUser}/>
            <Routes>
                <Route exact path="/thank-you" element={<ThankYou />}></Route>

                <Route exact path="/" element={<Home furnitures={furnitures} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />} />
                
                <Route exact path="/products" element={<Products furnitures={furnitures} setFurnitures={setFurnitures} selectedCat={selectedCat} setSelectedCat={setSelectedCat} isCancel={isCancel} setIsCancel={setIsCancel} />} />

                <Route exact path="/products/:id" element={<SingleProduct currentUser={currentUser} setCurrentUser={setCurrentUser} cartItems={cartItems} setCartItems={setCartItems} setIsLogin={setIsLogin}/>} />
                
                {currentUser ? <Route exact path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} /> : null}

                {currentUser ? <Route exact path="/profile" element={<Profile currentUser={currentUser}/>} /> : null}
            </Routes>
        </>
    )
}

export default App;