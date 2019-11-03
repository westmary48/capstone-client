import React, { useEffect, useState } from "react"



const DonationBoxDetail = props => {
    const [itemDonationBoxes, setItemDonationBoxes] = useState([])



    const getItemDonationBoxes = () => {
            fetch(`http://localhost:8000/itemdonationboxes?donationbox_id=${props.donationbox.id}`, {
                "method": "GET",
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
                .then(response => response.json())
                .then(setItemDonationBoxes)
    }

    useEffect(getItemDonationBoxes, [])

    let itemQuantities = {}
    let total = 0


    itemDonationBoxes.map(itemDonationBox => {

        if (itemQuantities[itemDonationBox.item.id]) {
            itemQuantities[itemDonationBox.item.id][0]++
        }
        else {
            itemQuantities[itemDonationBox.item.id] = [1, itemDonationBox.item.size, itemDonationBox.id, itemDonationBox.item.name]
        }
    })

    Object.keys(itemQuantities).map(function(key) {
        total += (itemQuantities[key][0] * itemQuantities[key][1])
    })

    return (
        <>
            {
                <section className="order-details">
                    <h3>Donation Box {props.donationbox.id}</h3>
                    <h4>Items:</h4>
                    <div id="parent">
                    {
                        Object.keys(itemQuantities).map(function(key) {
                            return (
                            <div key={itemQuantities[key][2]} id="productRating">

                                <p>{itemQuantities[key][3]} (Quantity: {itemQuantities[key][0]})</p>
                            </div>
                    )
                        })
                    }
                    </div>
                </section>
            }
        </>
    )
}

export default DonationBoxDetail