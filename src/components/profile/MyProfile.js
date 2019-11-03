import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link } from "react-router-dom";


const Profile = props => {
  const [donator, setDonator] = useState({user:{}});
  const { isAuthenticated } = useSimpleAuth();

  const getDonators = () => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/donators`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("capstone_token")}`
        }
      })
        .then(response => response.json())
        .then(donators => {
          const donator = donators.find(donator => {
            return donator.id === parseInt(localStorage.getItem("id"))
          });
          console.log(donator.id)
          setDonator(donator);
        });
    }
  };

  useEffect(() => {
    getDonators()

  }, []);


  return (
      <>
        <main className="explorer">
          <div>
            <ul>
              <p>
                <b>First Name:</b> {donator.user.first_name}
              </p>
              <p>
                <b>Last Name:</b> {donator.user.last_name}
              </p>
              <p>
                <b>Email:</b> {donator.user.email}
              </p>
              <p>
                <b>Phone Number:</b> {donator.phone_number}
              </p>
              <p>
                <b>Address:</b> {donator.address}
              </p>
            </ul>
            <Link className="nav-link" to = {{
                pathname: "/profile/update",
                state: donator
            }} >
              <h6>Edit Profile</h6>
            </Link>
            {/* <Link className="nav-link" to={`/payment/options`}>
              <h4>Payment Options</h4>
            </Link> */}
            <Link className="nav-link" to={`/payment/create`}>
              <h4>Add New Payment Type</h4>
            </Link>

            <Link className="nav-link" to={`/donationboxhistory`}>
              <h4>View Donation History</h4>
            </Link>

          </div>
        </main>
      </>
  )
}

export default withRouter(Profile);
