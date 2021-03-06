import React from "react"
import { connect } from "react-redux";
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import "./Cart.css"

const Cart = (props) => {
    return (
        <div>
            <div>
                <p>Cart page</p>
                { props.allItems.length>0 ? 
                    <div className="cart-content">
                        {props.allItems.map((item, index) => {
                            return (
                                <div className="cart-singleItem" key={index} >
                                    <img src={item.img} alt={item.title}/>
                                    <div>
                                        <p className="pTitle">{item.title}</p>
                                        <p className="pPrice"><span className="pPrice-span">Rs. {item.price}</span></p>
                                        <p className="cart-item-count"><AddBoxIcon className="plusIcon"/><span>{item.count}</span><RemoveCircleIcon className="plusIcon"/></p>
                                    </div>
                            </div>
                            )
                        })}
                    </div>
                    :
                    <p>No items in cart</p>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(18,state)
    return {
        allItems : state.items
    }
}

export default connect(mapStateToProps, null)(Cart);