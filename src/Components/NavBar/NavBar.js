import React,{useState, useEffect} from "react"
import {Button} from "@material-ui/core"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

import "./NavBar.css"

const NavBar = (props) => {

    const history = useHistory()
    const [items, setItems] = useState([])
    const [itemsCount, setItemsCount] = useState(10)

    useEffect(() => {
        console.log(14,props)
    },[])

    const handleCartClick = () => {
        history.push("/cart")
    }

    return (
        <div className="nav">
            <div className="nav-items-root">
                <div className="nav-items-content">
                    <p onClick={handleCartClick}><ShoppingCartIcon />({props.itemsCount})</p>
                    <Button variant="contained">Login</Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        itemsCount : state.items.length
    }
    
}

export default connect(mapStateToProps, null)(NavBar);