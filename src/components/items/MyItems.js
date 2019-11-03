import React, { useEffect, useState } from "react"
import Item from "../cards/Item"
import "./MyItems.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const MyItems = props => {
    const [myItems, setMyItems] = useState([])
    const {isAuthenticated} = useSimpleAuth()


    const getMyItems = () => {
              fetch(`http://localhost:8000/items?donator=true`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                  }
              })
              .then(response => response.json())
              .then(setMyItems)
      }
    useEffect(getMyItems, [])

    return(
        <>
          <h1>My Items{myItems ? `(${myItems.length})` : ""}</h1>

          {isAuthenticated() ?

          <a href='/items/new'>
              <h4>Add Clothing Item</h4>
              </a> : ""}
          <div className="myProducts-Div">
          {myItems.length > 0 ?
          myItems.map(item =>{
              return( <Item key={item.id} item={item} showCategory={true}  getMyItems={getMyItems} /> )
          })

          : <p>You have no items. Create a item<a href='/items/new'> here</a>.</p>}
          </div>
        </>
    )
}

export default MyItems