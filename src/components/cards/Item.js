import React from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Item = props => {
  const { isAuthenticated } = useSimpleAuth();

  const deleteItem = (e) => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/items/${props.item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("capstone_token")}`
        }
      }).then(props.getMyItems);
    }
  };
  return (
    <>
      <div
        className={`card border-success bg-light mb-3-${props.item.id}`}
        style={{ width: "18rem" }}
      >
        <div className="meh">
          <section className="product">
            <Link
              className="link-nav-link center"
              to={`/items/${props.item.id}`}
            >
              <h5>{props.item.name}</h5>
            </Link>
          </section>
          {props.showCategory ? (
            <>
            <div className="card-body">
              <p className="p-2">
                <b>Description:{"   "}</b>
                {props.item.description}
              </p>
              <p className="p-2">
                <b>Size:{"   "}</b>
                {props.item.size}
              </p>
              <p className="p-2">
                <b>Category:{"   "}</b>
                {props.item.item_category.name}
              </p>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="card-body">
          <p className="p-2">
            <b>Quantity:{"   "}</b> <b>{props.item.quantity}</b>{" "}
          </p>
          </div>
          {+props.item.donator.id === +localStorage.getItem("id") ? (
            <>
              <button
                className="btn"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to remove ${props.item.name}?`
                    )
                  ) {
                    deleteItem();
                  }
                }}
              >
                Delete Item
              </button>
            </>
          ) : (
            ""
          )}
          {+props.item.donator.id === +localStorage.getItem("id") ? (
            <>
              <button
                className="buttons"
                onClick={() => {
                }}
              >
                <a href={`/edititem/${props.item.id}`}>Edit Item</a>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Item;
