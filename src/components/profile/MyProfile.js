import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link } from "react-router-dom";

const Profile = props => {
  const [donator, setDonator] = useState({ user: {} });
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
            return donator.id === parseInt(localStorage.getItem("id"));
          });
          setDonator(donator);
        });
    }
  };

  useEffect(() => {
    getDonators();
  }, []);

  return (
    <>
      <main className="explorer">
        <div>
          <div className="info">
            <p className="p">
              <b>First Name:</b> {donator.user.first_name}
            </p>
            <p className="p">
              <b>Last Name:</b> {donator.user.last_name}
            </p>
            <p className="p">
              <b>Email:</b> {donator.user.email}
            </p>
            <p className="p">
              <b>Phone Number:</b> {donator.phone_number}
            </p>
            <p className="p">
              <b>Address:</b> {donator.address}
            </p>
          </div>
          <Link
            className="link-nav-link-li"
            to={{
              pathname: "/profile/update",
              state: donator
            }}
          >
            <h4 className="link-nav-link-nav">Edit Profile</h4>
          </Link>
          <Link className="link-nav-link-li" to={`/dropoff/create`}>
            <h4 className="link-nav-link-nav">Add Dropoff Date</h4>
          </Link>

          <Link className="link-nav-link-li" to={`/donationboxhistory`}>
            <h4 className="link-nav-link-nav">View Donation History</h4>
          </Link>
        </div>
      </main>
    </>
  );
};

export default withRouter(Profile);
