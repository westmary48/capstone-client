import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import DropoffDate from "../cards/DropoffDate";

const Dropoffs = props => {
  const [dropoffTypes, setDropoffTypes] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getDropoffDates = () => {
    if (isAuthenticated()) {
      fetch(
        `http://localhost:8000/dropoffs?donator=${localStorage.getItem("id")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("capstone_token")}`
          }
        }
      )
        .then(response => response.json())
        .then(setDropoffTypes);
    }
  };

  useEffect(getDropoffDates, []);

  return (
    <>
      {dropoffTypes.length > 0 ? (
        <>
          <h1>Dropoff Date Options</h1>
          <article className="paymentTypeList">
            {dropoffTypes.map(dropoffType => (
              <DropoffDate
                key={dropoffType.id}
                dropoffType={dropoffType}
                getDropoffDates={getDropoffDates}
              />
            ))}
          </article>
        </>
      ) : (
        <>
          <Link className="nav-link" to="/dropoff/create">
            <h6>Add some Dropoff Options!</h6>
          </Link>
        </>
      )}
    </>
  );
};

export default Dropoffs;
