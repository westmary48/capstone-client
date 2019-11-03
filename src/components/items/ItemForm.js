import React, {useRef} from "react"

const ItemForm = props => {

    const name = useRef()
    const size = useRef()
    const description = useRef()
    const quantity = useRef()
    const item_category_value = useRef()



    const addItem = (event) => {
        var format = /[!@#$%^&*()]+/;
        event.preventDefault()

        if ((name.current.value).match(format) || (description.current.value).match(format)) {
            window.alert("Please enter clothing item name/details with no special characters; ie. no '!@#$%^&*()'")
        }
        else if (item_category_value.current.value === "0") {
            window.alert("Please select a Item Category")
        }
        else if(quantity.current.value <  1 || quantity.current.value % 1 !== 0) {
            window.alert("Please enter a valid quantity")
        }
        else {

        fetch('http://localhost:8000/items', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("capstone_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "size": size.current.value,
                "description": description.current.value,
                "quantity": quantity.current.value,
                "created_date": new Date().toISOString().slice(0,10),
                "item_category_id": item_category_value.current.value,
            })
        })
        .then(response => response.json())
        .then(() => {
            console.log("Added")
            props.getItems()
            props.history.push("/")
        })
    }
    }

    return (
        <React.Fragment>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                    ref={name}
                    name="name"
                    autoFocus
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="size">Size: </label>
                    <input
                    ref={size}
                    name="size"
                    autoFocus
                    required
                    type="text"

                    />
                </div>
                <div >
                    <label htmlFor="description">Description:</label>
                    <textarea
                    ref={description}
                    name="description"
                    required>

                    </textarea>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                    ref={quantity}
                    name="quantity"
                    min = "0"
                    required
                    type="number"

                    />
                </div>
                <div>
                    <label htmlFor="item_category">Clothing Category:</label>
                    <select
                    name="item_category"
                    ref={item_category_value}
                    required>
                    <option defaultValue value = "0"> -- select an option -- </option>
                    {
                        props.categories.map(category =>
                            <option  key={category.id} value={category.id}>{category.name}</option>
                        )
                    }
                    </select>

                </div>
                    <button onClick={addItem}
                    >Add Clothing Item</button>
            </form>
        </React.Fragment>
    )
}


export default ItemForm