import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


const ItemCart = (props) => {

    const [item, setItem] = useState([])

    const getItem  = () => {
        fetch(`http://localhost:8000/items/${props.itemId}`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                  }
              })
              .then(response => response.json())
              .then(setItem)
    }

    useEffect(getItem, [])
    console.log(item)


    return (
        <>
            <div className={`card product-${item.id}`} style={{width: "18rem"}}>
                <div className="card-body">
                <section className="product">
                    <Link className="nav-link" to={`/items/${item.id}`}>
                        <h5>{item.name}</h5>
                    </Link>
                </section>
              <p className="card-text">Quantity: <b>{props.quantity}</b></p>
              <p className="card-text">Size: <b>{props.size}</b></p>
              <p className="card-text">Description: <b>{props.description}</b></p>
              <p className="card-text">Category: <b>{props.category.name}</b></p>
                </div>
            </div>
        </>
    )
}

export default ItemCart