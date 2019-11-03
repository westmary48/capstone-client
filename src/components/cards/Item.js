import React from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const Item = props => {
  const { isAuthenticated } = useSimpleAuth()


  const deleteItem = () => {
    if(isAuthenticated()){
        fetch(`http://localhost:8000/items/${props.item.id}`,{
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${localStorage.getItem("capstone_token")}`
            }
        })
        .then(props.getMyItems)
    }
  }
    return (
        <>

          <div className={`card product-${props.item.id}`} style={{width: "18rem"}}>
            <div className="card-body">
              <section className="product">
                  <Link className="nav-link" to={`/items/${props.item.id}`}>
                      <h5>{props.item.name}</h5>
                  </Link>
              </section>
              {
                props.showCategory ?
                <>
                <p>Category: <Link className="nav-link" to={`/itemcategories/${props.item.item_category.id}`}>
                      {props.item.item_category.name}
                  </Link></p>
                  </>
                  :
                  ""
              }
              <p className="card-text">Quantity: <b>{props.item.quantity}</b> <font size="1">available</font></p>
              {
                +props.item.donator.id === +localStorage.getItem("id") ?
                <>
                  <button onClick={() => {
                    if (window.confirm(`Are you sure you want to remove ${props.item.name}?`)) {
                      deleteItem()
                    }
                    }}>Delete Item</button>
                </>
                :
                ""
              }
            </div>
          </div>

        </>
    )
}

export default Item
