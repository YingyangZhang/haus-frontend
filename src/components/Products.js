import React from "react";
import AllProducts from "./AllProducts";

function Products({furnitures, selectedCat, setSelectedCat, setFurnitures, isCancel, setIsCancel}) {

    return (
        <>
            <AllProducts furnitures={furnitures} selectedCat={selectedCat} setSelectedCat={setSelectedCat} setFurnitures={setFurnitures} isCancel={isCancel} setIsCancel={setIsCancel}/>
        </>
    )
}

export default Products;