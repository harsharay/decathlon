import React,{ useState, useEffect } from "react"
import { connect } from "react-redux";
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import "./Cart.css"
import { Button } from "@material-ui/core";

const Cart = (props) => {

    const [allItemsFromStore, setAllItemsFromStore] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(0)

    useEffect(() => {
        setAllItemsFromStore(props.allItems)
    },[props.allItems])

    useEffect(() => {
        let finalPrice = 0
        let finalCount = 0

        allItemsFromStore.forEach(item => {
            finalPrice += (item.count * item.price)
            finalCount += item.count
        })

        setTotalPrice(finalPrice)
        setTotalItemsCount(finalCount)
    },[allItemsFromStore])

    const increaseCount = index => {
        let copyOfItems = [...allItemsFromStore]

        for(let i=0;i<copyOfItems.length;i++){
            if(copyOfItems[i].uniqueId === allItemsFromStore[index].uniqueId) {
                copyOfItems[i].count += 1
            }
        }

        props.replacingAllItemsInStore(copyOfItems)
    }

    const decreaseCount = index => {
        let copyOfItems = [...allItemsFromStore]

        for(let i=0;i<copyOfItems.length;i++){
            if(copyOfItems[i].uniqueId === allItemsFromStore[index].uniqueId) {
                copyOfItems[i].count -= 1
                if(copyOfItems[i].count === 0) {
                    copyOfItems.splice(index, 1)
                }
            }
        }

        props.replacingAllItemsInStore(copyOfItems)
    }

    const handleRemoveItem = index => {
        let copyOfItems = [...allItemsFromStore]
        copyOfItems.splice(index, 1)
        props.replacingAllItemsInStore(copyOfItems)
    }

    return (
        <div className="cart-root">
            <div className="cart-block">
                <p>All Items</p>
                { props.allItems.length>0 ? 
                    <div className="cart-content">
                        {props.allItems.map((item, topIndex) => {
                            return (
                                <div className="cart-singleItem-group" key={topIndex}>
                                    <div className="cart-singleItem">
                                        <img src={item.img} alt={item.title}/>
                                        <div>
                                            <p className="pTitle">{item.title}</p>
                                            <p className="pPrice"><span className="pPrice-span">Rs. {item.price}</span></p>
                                            <p className="cart-item-count">
                                                <RemoveCircleIcon className="plusIcon" onClick={() => decreaseCount(topIndex)}/>
                                                <span>{item.count}</span>
                                                <AddBoxIcon className="plusIcon" onClick={() => increaseCount(topIndex)}/>
                                            </p>
                                            <p className="delete-icon-p"><DeleteForeverIcon className="delete-icon" onClick={() => handleRemoveItem(topIndex)}/></p>
                                        </div>
                                    </div>
                                    <div className="totalPrice">
                                        <p>Total: Rs.<span>{item.count * item.price}</span></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <p>No items in cart</p>
                }
                {props.allItems.length>0 && <div className="checkout-block">
                    <p>Total price: {totalPrice}</p>
                    <p className="cBlock-quantity">Quantity: {totalItemsCount}</p>
                    <Button variant="contained" color="primary">Checkout</Button>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allItems : state.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        replacingAllItemsInStore : allItems => dispatch({ type: "REPLACE_ALL_ITEM_IN_STORE", payload: allItems })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);