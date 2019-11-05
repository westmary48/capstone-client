import React, { useEffect, useState } from "react"
import Doc from '../DocService';
import PdfContainer from '../pdf/PdfContainer';



const DonationBoxDetail = props => {
    const [itemDonationBoxes, setItemDonationBoxes] = useState([])


    const getItemDonationBoxes = () => {
        console.log(props.donationbox.id)
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

    const createPdf = (html) => Doc.createPdf(html);

    let itemQuantities = {}
    let total = 0


    itemDonationBoxes.map(itemDonationBox => {

        if (itemQuantities[itemDonationBox.item.id]) {
            // itemQuantities[itemDonationBox.item.id][0]++
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
                <section className="donationbox-details">
                     <PdfContainer createPdf={createPdf}>
                    {/* <h3>Donation Box {props.donationbox.id}</h3> */}
                    {/* <h4>Items:</h4> */}
                    <div id="item-details">
                    {
                        Object.keys(itemQuantities).map(function(key) {
                            return (
                            // <div key={itemQuantities[key][2]}>

                                <p className="donationbox-list"> {itemQuantities[key][0]} {itemQuantities[key][1]} </p>
                    //  </div>
                    )
                        })
                    }
                    </div>

                    </PdfContainer>
                </section>
            }
        </>
    )
}

export default DonationBoxDetail