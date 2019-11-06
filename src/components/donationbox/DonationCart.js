import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ItemCart from '../cards/ItemCart'
import { CLIENT_RENEG_LIMIT } from "tls"


const DonationboxCart = (props) => {
    const [donationbox, setDonationbox] = useState([])
    const [itemDonationboxes, setItemDonationboxes] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getItemDonationboxes = (data) => {
        console.log(data)
        if (data.length !== 0)
        {
            setDonationbox(data[0])
            fetch(`http://localhost:8000/itemdonationboxes?donationbox_id=${data[0].id}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
            .then(response => response.json())
            .then(setItemDonationboxes)
        }
        else {
            console.log(data)
          setDonationbox(data)
        }
}

    const getDonationboxes = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/donationboxes?donator_id=${localStorage.getItem("id")}&complete=0`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
            .then(response => response.json())
            .then(getItemDonationboxes)
        }
    }

    const deleteDonationbox = () => {
        if(isAuthenticated()){
            fetch(`http://localhost:8000/donationboxes/${donationbox.id}`,{
                "method": "DELETE",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
        }
    }

    const deleteItemDonationbox = (id) => {
        if(isAuthenticated()){
            fetch(`http://localhost:8000/itemdonationboxes/${id}`,{
                "method": "DELETE",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
        }

    }

    const deleteCart = () => {
        deleteDonationbox()
        itemDonationboxes.forEach(itemDonationbox => {
          deleteItemDonationbox(itemDonationbox.id)
        })
        props.history.push("/myItems")
    }

    useEffect(getDonationboxes, [])

    let itemQuantities = {}
    let total = 0


    itemDonationboxes.map(itemDonationbox => {
        if (itemQuantities[itemDonationbox.item.id]) {
          itemQuantities[itemDonationbox.item.id][0]++
        }
        else {
          itemQuantities[itemDonationbox.item.id] = [1, itemDonationbox.id, itemDonationbox.item.name]
        }
    })

    Object.keys(itemQuantities).map(function(key) {
        total += (itemQuantities[key][0] * itemQuantities[key][1])
    })
    return (
        <>
        {itemDonationboxes.length > 0 ?
        <>
          <h2>Items in your Donationbox:</h2>
          <div className="orderBtn-Div">
            <button className="btn btn-info"onClick={() => {
              props.history.push("/cart/addDropoff")
            }}>
            Complete Donationbox
            </button>
            <button className="btn btn-secondary"onClick={deleteCart}
            >
            Delete Donationbox
            </button>
          </div>
        <section className="cartItems">
            {/* ternary statement to load the rest of the code after the page has been mounted */}
            {
                donationbox ?
                Object.keys(itemQuantities).map(function(key) {
                    return (
                        <div key={itemQuantities[key][1]}>
                        <ItemCart key={itemQuantities[key][1]} itemId={key} quantity={itemQuantities[key][0]}/>
                        <button className="btn" onClick={() => {
                            deleteItemDonationbox(itemQuantities[key][1])
                            getDonationboxes()
                            }} >delete</button>
                        </div>
                    )
                })
                : ""
            }
        </section>
        </>
          :
          <>
          <h1 className = "item-title">No items in Donation box!</h1>
          <Link className="link-nav-link" to="/items/new">
            Add Clothing Items
          </Link>
          </>
          }


        </>
    )
}

export default DonationboxCart
