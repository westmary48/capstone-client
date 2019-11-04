import React, { useEffect, useState, useRef } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"



const CompleteDonationbox = props => {
    const [dropoffTypes, setDropoffTypes] = useState([])
    const [donationbox, setDonationbox] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const dropoff = useRef()


    const getDropoffDates = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/dropoffs?donator=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
                .then(response => response.json())
                .then(setDropoffTypes)
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

  const addDropoffType = () => {
    if (isAuthenticated()) {
        fetch(`http://localhost:8000/donationboxes/${donationbox[0].id}`, {
            "method": "PUT",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("capstone_token")}`
            },
            "body": JSON.stringify({
              "dropoff": +dropoff.current.value
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
      getDropoffDates()
      getDonationbox()
    }, [])


    return (
        <>
            {
              dropoffTypes.length > 0 ?
              <>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  addDropoffType()
                }}>
                <h4>Please add a Drop Off Date.</h4>
                <select className="paymentTypeSelect" ref={dropoff}>
                    {
                        dropoffTypes.map(dropoffType=>
                            <option key={dropoffType.id} value={`${dropoffType.id}`}>{`${dropoffType.dropoff_date.slice(0,7).split("-").reverse().join("/")}`}</option>
                        )
                    }
                </select>
                <button type="submit">Add Dropoff Date</button>
                </form>
              </>
              :
              <>
                <Link className="nav-link" to="/dropoff/create">
                  <h6>Add some Dropoff Options!</h6>
                </Link>
              </>
            }
        </>
    )
}

export default CompleteDonationbox