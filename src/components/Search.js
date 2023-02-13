import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Search({setIsSearch, setFurnitures, furnitures, setIsCancel}) {
    const [userInput, setUserInput] = useState("")
    const navigate = useNavigate()

    function handleClick() {
        setIsSearch(false)
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/products`)
        setIsSearch(false)
        const newArr = furnitures.filter(furniture => {
            if (userInput !== "") {
                return furniture.name.toLowerCase().replace(/\s/g, '').includes(userInput.toLowerCase().replace(/\s/g, ''))
            } else{
                return true
            }
        })
        setFurnitures(newArr)
        setIsCancel(true)
        setUserInput("")
    }

    function handleChange(e) {
        setUserInput(e.target.value)
    }

    return (
        <AnimatePresence>
            <motion.div className="search"
            key="search"
            initial={{  opacity: 0}} 
            animate={{ opacity: 1} }
            exit={{ opacity: 0 }}
            transition={{ duration: .2, ease: "easeOut" }} >
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="TYPE HERE" autocomplete="off" autoFocus onChange={handleChange} value={userInput} id="txt"/>
                    <div className="search-x" onClick={handleClick}><i className='bx bx-x'></i></div>
                </form>
            </motion.div>
        </AnimatePresence>
    )
}

export default Search;