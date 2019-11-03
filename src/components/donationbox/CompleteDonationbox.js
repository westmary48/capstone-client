import React, { useEffect, useState, useRef } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"



const CompleteDonationbox = props => {
    const [paymentTypes, setPaymentTypes] = useState([])
    const [donationbox, setDonationbox] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const payment = useRef()


    const getPaymentTypes = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/paymenttypes?donator=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
                .then(response => response.json())
                .then(setPaymentTypes)
        }
    }

    const getDonationbox = () => {
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/donationboxes?donator_id=${localStorage.getItem("id")}&complete=0`, {
              "method": "GET",
              "headers": {
                  "Authorization": `Token ${localStorage.getItem("capstone_token")}`
              }
          })
          .then(response => response.json())
          .then(setDonationbox)
      }
  }

  const addPaymentType = () => {
    if (isAuthenticated()) {
        fetch(`http://localhost:8000/donationboxes/${donationbox[0].id}`, {
            "method": "PUT",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("capstone_token")}`
            },
            "body": JSON.stringify({
              "payment_type": +payment.current.value
          })
        })
        .then(() => {
          props.getItems()
          props.getCompleteDonationboxes()
        })
        .then(() => {
          props.history.push("/donationboxhistory")
        })
      }
    }


    useEffect(() => {
      getPaymentTypes()
      getDonationbox()
    }, [])


    return (
        <>
            {
              paymentTypes.length > 0 ?
              <>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  addPaymentType()
                }}>
                <h4>Please add a payment type.</h4>
                <select className="paymentTypeSelect" ref={payment}>
                    {
                        paymentTypes.map(paymentType=>
                            <option key={paymentType.id} value={`${paymentType.id}`}>{`${paymentType.merchant_name}: ${paymentType.expiration_date.slice(0,7).split("-").reverse().join("/")}`}</option>
                        )
                    }
                </select>
                <button type="submit">Add Payment Type</button>
                </form>
              </>
              :
              <>
                <Link className="nav-link" to="/payment/create">
                  <h6>Add some Payment Options!</h6>
                </Link>
              </>
            }
        </>
    )
}

export default CompleteDonationbox