import React from "react"
import { Link } from "react-router-dom"



const DonationboxList = props => {
    return (
        <>
            {
                <section className="order-details">
                    <Link className="nav-link" to={`/donationboxhistory/${props.donationbox.id}`}>
                        <h3>Order {props.donationbox.id}</h3>
                    </Link>

                </section>
            }
        </>
    )
}

export default DonationboxList