import React from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const DropoffTime = props => {


    const oldDate = props.dropoffTypes.dropoff_date.slice(0,7)
    const { isAuthenticated } = useSimpleAuth()


    const deleteDropoff = () => {
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/dropoffs/${props.dropoffTypes.id}`, {
              "method": "DELETE",
              "headers": {
                  "Authorization": `Token ${localStorage.getItem("capstone_token")}`
              }
          })
              .then(props.getDropoffTypes)
              console.log(props.dropoffTypes)

      }
  }
    return (
        <>

          <div className={`card paymentType-${props.dropoffTypes.id}`} style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{props.dropoffTypes.name}</h5>
              <p className="card-text">Dropoff Date: {oldDate}</p>
              <button onClick={deleteDropoff} className={`btn btn-primary${props.dropoffTypes.id}`}>Delete</button>
            </div>
          </div>

        </>
    )
}

export default DropoffTime