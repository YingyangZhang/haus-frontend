import React, { useState } from "react";
import all from "../images/all.png";
import table from "../images/table.png";
import chair from "../images/chair.png"
import sofa from "../images/sofa.png";
import { motion, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home({setSelectedCat, selectedCat, furnitures}) {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(randomNumber(0, 2))

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    const images = [
        {url: "https://leibal.wpenginepowered.com/wp-content/uploads/2020/12/leibal_odd-table_lucas-faber_00005.jpg"},
        {url: "https://leibal.wpenginepowered.com/wp-content/uploads/2021/04/leibal_shade-michelangelo_toshiki-omatsu_00007.jpg"},
        {url: "https://leibal.wpenginepowered.com/wp-content/uploads/2021/12/leibal_roll-top-sofa_sedilia_5.jpg"}
    ]

    function goToPrev() {
        const isFirstSlice = currentIndex === 0;
        const newIndex = isFirstSlice ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    function goToNext() {
        const isLastSlice = currentIndex === images.length - 1;
        const newIndex = isLastSlice ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    function handleClick(value) {
        setSelectedCat(value)
        navigate(`/products`)
    }
    console.log(selectedCat)

    function handleImage(url){
        const furniture = furnitures.find(furniture => {
            return Object.values(furniture.image).includes(url)
        })
        console.log(furniture)
        navigate(`/products/${furniture.id}`, {state: {furniture}})
    }

    return (
        <main>
            <div className="main-container">
                <div className="main-copies">
                    <motion.div className="copies-title" initial={{ y: 15, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                        BUILT FOR JOY AND LIVING.
                    </motion.div>
                    <motion.p initial={{ y: 15, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >What makes home feel welcoming, luxurious and - most of all - livable, is so<br></br>
                        deelply personal to each of us. Our brand has collected works of some of the <br></br>
                        most creative designers around the world. This season's collection invites you<br></br>
                        to explore how material, shape and scale redefine home through your own<br></br>
                        design vision - creating interiors that inspire you every day.
                    </motion.p>
                </div>
                <div>
                    <div className="img-container">
                        <motion.div className="images" initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration: 1.1}}} viewport={{ once: true }} >
                            <img src={`${images[currentIndex].url}`} onClick={() => handleImage(images[currentIndex].url)} alt="image" className="main-img"/>
                        </motion.div>
                        <span className="prev-btn" onClick={goToPrev}><i className='bx bx-left-arrow-alt' ></i></span>
                        <span className="next-btn" onClick={goToNext}><i className='bx bx-right-arrow-alt' ></i></span>
                    </div>
                </div>
                <motion.div className="main-season" initial={{ y: 15, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                    FALL COLLECTION
                </motion.div>
            </div>

            <div className="category-container container" >
                <motion.div className="category" onClick={() => handleClick("Table")} initial={{ y: 25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                    <p>TABLE</p>
                    <div className="category-img-container">
                        <img src={table} alt="image" />
                    </div>
                </motion.div>
                <motion.div className="category" onClick={() => handleClick("Chair")} initial={{ y: 25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                    <p>CHAIR</p>
                    <div className="category-img-container">
                        <img src={chair} alt="image" />
                    </div>
                </motion.div>
                <motion.div className="category" onClick={() => handleClick("Sofa")} initial={{ y: 25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                    <p>SOFA</p>
                    <div className="category-img-container">
                        <img src={sofa} alt="image" />
                    </div>
                </motion.div>
                <motion.div className="category-all" initial={{ y: 25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                    <div className="category-all-container">
                        <img src={all} alt="image" />
                    </div>
                </motion.div>
                <motion.div className="more" onClick={() => handleClick("All")}  initial={{ y: 25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1.1} }} viewport={{ once: true }} >
                    <div>
                        <p>SHOP ALL</p>
                    </div>
                </motion.div>
            </div>

            <footer className="footer">
                <p>Ⓒ 2022 HAUS LLC. ALL RIGHTS RESERVED</p>
            </footer>
        </main>
    )
}

export default Home;