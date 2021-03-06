import React,{ useEffect } from "react"

import "./ItemDetailsPopup.css"

const ItemDetailsPopup = (props) => {

    useEffect(() => console.log("props", props),[])

    return (
        <div className="popup-root">
            <div>
                <img src={props.currentItem.img} alt={props.currentItem.title} />
                <p>{props.currentItem.title}</p>
                <p>{props.currentItem.price}</p>
            </div>
        </div>
    )
}

export default ItemDetailsPopup;