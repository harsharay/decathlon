import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import "./MyAccount.css"

const MyAccount = (props) => {

    const [currentUserOrders, setCurrentUserOrders] = useState([])

    useEffect(() => {
        let orders = props.userOrders[props.username]
        setCurrentUserOrders(orders)
    },[props.userOrders])

    return (
        <div>
            {props.username ? <div className="myAccount-content">
                <p>{props.username}, your orders</p>
                <div className="myAccount-orders-group">
                    {currentUserOrders && currentUserOrders.map((order, index) => {
                        return (
                            <div key={index} className="myAccount-order">
                                <p>Order Number: {index+1}</p>
                                <p>Items: {order.items}</p>
                                {order.allItems.map((item, secondIndex) => {
                                    return (
                                        <div key={secondIndex} className="product-names">
                                            <p>({item.name} X {item.count})</p>
                                        </div>
                                    )
                                })}
                                <p>Quantity: {order.quantity}</p>
                                <p>Price: {order.totalPrice} /-</p>
                                
                            </div>
                        )
                    })}
                </div>
            </div>
            :
            <p className="loginMessage">Please <Link to="/login">Login</Link></p>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.loginDetails,
        userOrders : state.userOrders
    }
}

export default connect(mapStateToProps, null)(MyAccount)