import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AllProducts({furnitures, selectedCat, setSelectedCat, setFurnitures, isCancel, setIsCancel}) {

    function handleChange(e) {
        setSelectedCat(e.target.value)
        console.log(e.target.value)
    }

    const filteredFurnitures = furnitures.filter(furniture => {
        return selectedCat === "All" ? furniture : furniture.category.category_name === selectedCat
    })

    const navigate = useNavigate();

    function handleClick() {
        fetch('https://haus-app.onrender.com/furnitures')
        .then(r => r.json())
        .then(data => {
            const strAscending = [...data].sort((a, b) =>
            a.name > b.name ? -1 : 1);
            setFurnitures(strAscending)
            setIsCancel(false)
        })
    }

    return (
        <main className="products container">
        <div className="products-filter container">
            <div className="products-nav">
                <div>
                    <label className="selection" for="categories">CATEGORY: &nbsp; </label>
                    <select name="categories" className="options" onChange={handleChange} value={selectedCat}>
                        <option value="All">All</option>
                        <option value="Chair">Chair</option>
                        <option value="Table">Table</option>
                        <option value="Sofa">Sofa</option>
                    </select>
                </div>
                <div className="selection-title">{selectedCat.toUpperCase()}</div>
            </div>
        </div>

        
            <div className="products-container">

         
         {filteredFurnitures.map(furniture => {
            return (
                <motion.div key={furniture.id} 
                    onClick={() => {navigate(`/products/${furniture.id}`, {state: {furniture}})}} 
                    className="product" 
                    initial={{ y: 5, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition:{duration: 1} 
                    }}>
                <div className="product-img-container">
                    <img src={furniture.image.thumbnail} alt="iamge" />
                </div>

                <div className="designer">
                    {furniture.designer}
                </div>

                <div className="name-price">
                    <span className="product-name">
                        {furniture.name}
                    </span>
                    <span className="product-price">
                        ${furniture.price.toLocaleString()}
                    </span>
                </div>
            </motion.div>
            )
         })}
                    
             
            

            </div>

             {isCancel ? <p className="cancel" onClick={handleClick}>Cancel Search</p> : ""}      
        
        <footer className="footer">
                <p>Ⓒ 2022 HAUS LLC. ALL RIGHTS RESERVED</p>
        </footer>
    </main>
)
}

export default AllProducts;