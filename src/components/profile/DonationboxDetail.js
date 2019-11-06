import React, { useEffect, useState } from "react"
import Doc from '../DocService';
import PdfContainer from '../pdf/PdfContainer';
import ContactForm from '../ContactUs';



const DonationBoxDetail = props => {
    const [itemDonationBoxes, setItemDonationBoxes] = useState([])


    const getItemDonation = () => {
        console.log("use effect?", props.donationbox.id)
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

    useEffect(getItemDonation, [])

    const createPdf = (html) => Doc.createPdf(html);


    let itemQuantities = {}


    itemDonationBoxes.map(itemDonationBox => {
        console.log(itemQuantities)
        if (itemQuantities[itemDonationBox.item.id]) {
            itemQuantities[itemDonationBox.item.id][0]++
        }
        else {
            console.log(itemQuantities)
            itemQuantities[itemDonationBox.item.id] = [1, itemDonationBox.item.name, itemDonationBox.id ]
        }
    })


    return (
        <>

        {
        <section className="donationbox-details">
        <PdfContainer createPdf={createPdf}>
            <h3>Donation Box {props.donationbox.id}</h3>
            <h4>Items:</h4>
            <div id="item-details">
            {
                Object.keys(itemQuantities).map(function(key) {
                    return (
                    <div key={itemQuantities[key][1]}>

                     <p className="donationbox-list"> {itemQuantities[key][0]} {itemQuantities[key][1]} </p>
              </div>
            )
                })
            }
            </div>

            </PdfContainer>
            <ContactForm></ContactForm>
        </section>

    }
        </>
    )
}

export default DonationBoxDetail


