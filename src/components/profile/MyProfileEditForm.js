import React, { useRef, useState, useEffect} from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const ProfileEditForm = props => {
  const first_name = useRef()
  const email = useRef()
  const last_name = useRef()
  const phone_number = useRef()
  const address = useRef()
  const { isAuthenticated } = useSimpleAuth()


  useEffect(()=>{
    first_name.current.value = props.history.location.state.user.first_name
    last_name.current.value = props.history.location.state.user.last_name
    email.current.value = props.history.location.state.user.email
    phone_number.current.value = props.history.location.state.phone_number
    address.current.value = props.history.location.state.address
  },[])

  const updateProfile = () => {
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/donators/${props.history.location.state.id}`, {
              "method": "PUT",
              "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("capstone_token")}`
              },
              "body": JSON.stringify({
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "email": email.current.value,
                "phone_number": phone_number.current.value,
                "address": address.current.value
            })
          })
              .then(() => {
                props.history.push("/profile")
              })

      }
  }

  return (
    <>
      <h1>Edit Profile</h1>
      <form className="profileList" onSubmit={(e) => {
        e.preventDefault()
        updateProfile()
      }}>

        <fieldset>
          <label htmlFor="first_name">First Name:</label>
          <input type="text"
          ref={first_name}
          name="first_name"
          required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text"
          ref={last_name}
          name="last_name"
          required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input type="text"
          ref={email}
          name="email"
          required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="phone_number">Phone Number:</label>
          <input type="text"
          ref={phone_number}
          name="phone_number"
          required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="address">Address:</label>
          <input
          type="text"
          ref={address}
          name="address"
          required></input>
        </fieldset>
        <button type="submit">Update Profile</button>
      </form>
    </>
  )
}

export default ProfileEditForm