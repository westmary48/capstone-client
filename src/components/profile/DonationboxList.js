import React from "react"
import { Link } from "react-router-dom"



const DonationboxList = props => {
    return (
        <>
            {
                <section className="order-details">
                    <Link className="link-nav-link" to={`/donationboxhistory/${props.donationbox.id}`}>
                        <h3>Donation Box {props.donationbox.id}</h3>
                    </Link>

                </section>
            }
        </>
    )
}

export default DonationboxList