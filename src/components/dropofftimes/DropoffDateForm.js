import React, { useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const DropoffDateForm = props => {
  const name = useRef();
  const organization = useRef();
  const dropoffDate = useRef();
  const createDate = useRef();
  const { isAuthenticated } = useSimpleAuth();

  const createDropoffDate = () => {
    const date = `${dropoffDate.current.value}-01`;
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/dropoffs`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("capstone_token")}`
        },
        body: JSON.stringify({
          name: name.current.value,
          organization: organization.current.value,
          dropoff_date: date,
          create_date: createDate.current.value
        })
      })
        .then(response => response.json())
        .then(() => {
          props.history.push("/profile");
        });
    }
  };

  return (
    <>
      <h1 className="item-title">Drop Off Information</h1>
      <form
        className="categoryList"
        onSubmit={e => {
          e.preventDefault();
          createDropoffDate();
        }}
      >
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" ref={name} name="name" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            ref={organization}
            name="organization"
            required
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="dropoff-date">Dropoff Date</label>
          <input
            type="month"
            ref={dropoffDate}
            name="dropoff-date"
            min={new Date().toISOString().slice(0, 7)}
            required
          ></input>
        </fieldset>
        <input
          type="date"
          ref={createDate}
          name="expire-date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          hidden
        ></input>
        <button className="btn" type="submit">
          Add Dropoff
        </button>
      </form>
    </>
  );
};

export default DropoffDateForm;
