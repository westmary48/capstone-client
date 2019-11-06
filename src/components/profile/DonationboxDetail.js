import React, { useEffect, useState } from "react";
import Doc from "../DocService";
import PdfContainer from "../pdf/PdfContainer";
import ContactForm from "../ContactUs";

const DonationBoxDetail = props => {
  const [itemDonationBoxes, setItemDonationBoxes] = useState([]);

  const getItemDonation = () => {
    fetch(
      `http://localhost:8000/itemdonationboxes?donationbox_id=${props.donationbox.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("capstone_token")}`
        }
      }
    )
      .then(response => response.json())
      .then(setItemDonationBoxes);
  };

  useEffect(getItemDonation, []);

  const createPdf = html => Doc.createPdf(html);

  let itemQuantities = {};

  itemDonationBoxes.map(itemDonationBox => {
    if (itemQuantities[itemDonationBox.item.id]) {
      itemQuantities[itemDonationBox.item.id][0]++;
    } else {
      itemQuantities[itemDonationBox.item.id] = [
        1,
        itemDonationBox.item.name,
        itemDonationBox.id
      ];
    }
  });

  return (
    <>
      {
        <section className="donationbox-details">
          <PdfContainer createPdf={createPdf}>
            <h4 className="title">Donation Box</h4>
            <div id="item-details">
              {Object.keys(itemQuantities).map(function(key) {
                return (
                  <div key={itemQuantities[key][1]}>
                    <ul>
                      <li className="donationbox-list">
                        {" "}
                        {itemQuantities[key][1]} ({itemQuantities[key][0]})
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </PdfContainer>
          <ContactForm></ContactForm>
        </section>
      }
    </>
  );
};

export default DonationBoxDetail;
