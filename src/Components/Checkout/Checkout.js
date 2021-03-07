import { Button } from "@material-ui/core";
import React,{ useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import "./Checkout.css"

const Checkout = (props) => {

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [itemNames, setItemNames] = useState([])

    useEffect(() => {
        let finalPrice = 0
        let finalQuantity = 0

        props.allItems.forEach(item => {
            finalPrice += item.price * item.count
            finalQuantity += item.count
        })

        let tempAllItems = []

        props.allItems.map(item => {
            let { title,count } = item
            return (
                tempAllItems.push({
                    name: title,
                    count
                })
            )
        })
        setItemNames(tempAllItems)
        setTotalPrice(finalPrice)
        setTotalQuantity(finalQuantity)
        
    },[props.allItems])

    const handleConfirmOrder = () => {
        console.log(26,props.allOrders)
        let {username} = props

        let localCopyOfAllOrders = {...props.allOrders}

        if(localCopyOfAllOrders[username]) {
            localCopyOfAllOrders[username].push({
                items: props.allItems.length,
                quantity: totalQuantity,
                totalPrice,
                allItems: itemNames
            })
        } else {
            localCopyOfAllOrders[username] = [
                {
                    items: props.allItems.length,
                    quantity: totalQuantity,
                    totalPrice,
                    allItems: itemNames
                }
            ]
        }

        props.addingUserOrder(localCopyOfAllOrders)
        props.clearingOutItems()
        alert("Successfully placed the order")
        props.history.push("/myAccount")
    }


    return (
        <div className="checkout-root">
            {props.username ? 
                <>
                    <div>
                        {props.allItems.length > 0 &&
                            <div className="checkout-content">
                                <p>Items: {props.allItems.length}</p>
                                {itemNames && itemNames.map((singleItem, index) => {
                                    return (
                                        <div key={index} className="product-names">
                                            <p>({singleItem.name} X {singleItem.count})</p>
                                        </div>
                                    )
                                })}
                                <p>Quantity: {totalQuantity}</p>
                                <p>Total Price: {totalPrice} /-</p>
                            </div>
                        }
                    </div>
                    <Button variant="contained" color="primary" onClick={handleConfirmOrder}>Confirm order</Button>
                </>
                :
                <p className="loginMessage">Please <Link to="/login">Login</Link></p>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.loginDetails,
        allItems : state.items,
        allOrders : state.userOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addingUserOrder: data => dispatch({ type: "ADDING_USER_ORDER", payload: data }),
        clearingOutItems: () => dispatch({ type: "REPLACE_ALL_ITEM_IN_STORE", payload: [] })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);