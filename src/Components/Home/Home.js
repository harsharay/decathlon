import React,{ useState, useEffect } from "react";
import { shoesData, cricketData } from "../../DummyData";
import Categories from "../Categories/Categories";

import "./Home.css"

const Home = () => {

    const [itemClicked, setItemClicked] = useState(false)

    const handleReduceOpacity = () => {
        setItemClicked(true)
    }

    return (
        <div>
            <div>
                
                <div className={itemClicked ? "reduceOpacity" : ""}>
                    <Categories name="Shoes" products={shoesData.products} handleReduceOpacity={handleReduceOpacity} itemClicked={itemClicked}/>
                    
                    <Categories name="Cricket" products={cricketData.products} handleReduceOpacity={handleReduceOpacity} itemClicked={itemClicked}/>
                </div>
            </div>
        </div>
    )
}

export default Home;