import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom'


const ItemDetail = props => {
    const [itemDonationBox, setItemDonationBox] = useState([])
    const [itemQuantity, setItemQuantity] = useState(props.item.quantity)
    const { isAuthenticated } = useSimpleAuth()
    const [count_cart, setCount_Cart] = useState(0)
    let dialog = document.querySelector("#dialog--time")
    const [isOpen, setIsOpen] = useState(false)
    const quantity = useRef()

    const toggleDialog = () => {
        setIsOpen(!isOpen)
        if (isOpen) {
            dialog.removeAttribute("open")
            window.removeEventListener("keyup", handler)
        } else {
            dialog.setAttribute("open", true)
        }
    }

    const getItemDonationBoxes = () => {
                fetch(`http://localhost:8000/itemdonationboxes?item_id=${props.item.id}`, {
                    "method": "GET",
                    "headers": {
                        "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                  setItemDonationBox(data)
                  setCount_Cart(data.length)
                })
    }

    const handler = e => {
    if (e.keyCode === 27) {
        if (isOpen) {
            toggleDialog()
        }
        }
}


    useEffect(getItemDonationBoxes, [])


    const addToDonationbox = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/itemdonationboxes`, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                },
                body: JSON.stringify({
                    item: props.item.id,
                    quantity: 1
                })

            })
            .then(response => response.json())
            .then(getItemDonationBoxes)
        }
    }

    const updateItemQuantity = (e) => {
        if (isAuthenticated() && quantity.current.value > 0 && quantity.current.value % 1 === 0) {
            fetch(`http://localhost:8000/items/${props.item.id}`, {
                "method": "PUT",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                },
                "body": JSON.stringify({
                  "quantity": quantity.current.value
            })

        })
        .then(() => {
            setItemQuantity(quantity.current.value)
            dialog.removeAttribute("open")
            props.getItems()
            })



    }
    else {
        e.preventDefault()
        window.alert("Please add a quantity that is greater than 0")
    }
    }
    return (
        <>
            <dialog id="dialog--time" className="dialog--time" onKeyUp={(event) => {handler(event)}}>
                <label htmlFor="starttime">How Many Items Would You Like to Add to the Product Inventory?</label>
                <input  type="text" ref={quantity} name="quantity" autoFocus required />

                <button className="item"
                onClick = {updateItemQuantity}>Update Inventory</button>

            </dialog>
            {
                <section className="product-details">
                    <h3>{props.item.name}</h3>
                    <div className = "col">
                    <div className = "row">
                    <h4><font size="1">Donated By: {props.item.donator.user.first_name} {props.item.donator.user.last_name}</font></h4>
                    </div>
                    </div>
                    <h5>{props.item.size}</h5>
                    <p>{props.item.description}</p>

                    <div id="product-quantity">
                    <h4>Quantity: {itemQuantity}</h4>
                    </div>
                    {
                      isAuthenticated() ?
                      (count_cart < props.item.quantity) && (+props.item.donator.id === +localStorage.getItem("id")) ?
                      <button onClick={() => {
                        if (count_cart < props.item.quantity) {
                          addToDonationbox()
                          setCount_Cart(count_cart+1)
                        }
                      }}>Add To Donation Box</button>
                      : ""
                      :
                      <Link className="nav-link" to="/login">
                      Sign in, to make a donation box!
                      </Link>
                    }
                </section>
            }
        </>
    )
}

export default ItemDetail