import React, { useState, useEffect } from "react"
import { Button } from "@material-ui/core"


import "./Categories.css"
import ItemDetailsPopup from "../ItemDetailsPopup/ItemDetailsPopup"
import { connect } from "react-redux"

const Categories = (props) => {

    // const [itemClicked, setItemClicked] = useState(false)
    const [currentItem, setCurrentItem] = useState({})
    const [allItemsFromStore, setAllItemsFromStore] = useState([])

    useEffect(() => {
        setAllItemsFromStore(props.allItems)
        console.log(props.allItems)
    },[props.allItems])

    const handleItemClick = index => {
        // setItemClicked(true)
        setCurrentItem(props.products[index])
        props.handleReduceOpacity(true)
    }

    const handleAddingItemToBasket = index => {
        // console.log(props.products[index])

        // let localCount;

        let localCopyOfItems = [...allItemsFromStore]
        
        let existingItem = "";
        
        for(let i=0;i<allItemsFromStore.length;i++) {
            if(allItemsFromStore[i].uniqueId === props.products[index].uniqueId) {
                existingItem = allItemsFromStore[i].uniqueId
            }
        }

        if(existingItem.length > 0) {
            let currentItem = {}
            for(let i=0;i<localCopyOfItems.length;i++){
                if(localCopyOfItems[i].uniqueId === existingItem) {
                    currentItem = {...localCopyOfItems[i]}
                    currentItem.count +=1 
                    localCopyOfItems.splice(i,1, currentItem)
                }
            }
            props.replaceAllitemsFromStore([...localCopyOfItems])
        } else {
            let finalProduct = props.products[index]
            finalProduct["count"] = 1
            props.addItemToStore(finalProduct)
        }
    }

    return (
        <div>
            <div className="category-root">
                <p>{props.name}</p>
                <div className="products-group">
                    { props.products.map((product, index) => {
                        return (
                            <div className={"single-product "} key={index} onClick={() => handleItemClick(index)}>
                                <img src={product.img} alt={product.title}/>
                                <p className="pTitle">{product.title}</p>
                                <p className="pPrice"><span className="pPrice-span">Rs. {product.price}</span></p>
                                <Button variant="contained" color="primary" onClick={() => handleAddingItemToBasket(index)}>Add to basket</Button>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <hr />
            {/* { props.itemClicked && <ItemDetailsPopup currentItem={currentItem}/> } */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allItems: state.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItemToStore: newItem => dispatch({ type: "ADD_ITEM_TO_STORE", payload: newItem }),
        replaceAllitemsFromStore: allItems => dispatch({ type: "REPLACE_ALL_ITEM_IN_STORE" , payload: allItems })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);