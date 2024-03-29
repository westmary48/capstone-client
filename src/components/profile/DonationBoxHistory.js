import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import DonationBoxList from "./DonationboxList";
import { Link } from "react-router-dom";

const DonationBoxHistory = props => {
  return (
    <>
      <h1 className="item-title">Your Completed Donation Boxes</h1>
      {props.completeDonationboxes.map(donationbox => {
        return (
          <DonationBoxList
            key={donationbox.id}
            {...props}
            donationbox={donationbox}
          />
        );
      })}
    </>
  );
};

export default DonationBoxHistory;
