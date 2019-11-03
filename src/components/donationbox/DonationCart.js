// import React, { useEffect, useState } from "react"
// import { Link } from 'react-router-dom'
// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import ProductCart from "../cards/productCart"
// import { CLIENT_RENEG_LIMIT } from "tls"


// const DonationboxCart = (props) => {
//     const [donationbox, setDonationbox] = useState([])
//     const [itemDonationboxes, setItemDonationboxes] = useState([])
//     const { isAuthenticated } = useSimpleAuth()

//     const getOrderProducts = (data) => {
//         if (data.length !== 0)
//         {
//             setDonationbox(data[0])
//             fetch(`http://localhost:8000/itemdonationboxes?donationbox_id=${data[0].id}`, {
//                 "method": "GET",
//                 "headers": {
//                     "Authorization": `Token ${localStorage.getItem("capstone_token")}`
//                 }
//             })
//             .then(response => response.json())
//             .then(setItemDonationboxes)
//         }
//         else {
//           setDonationbox(data)
//         }
// }

//     const getDonationboxes = () => {
//         if (isAuthenticated()) {
//             fetch(`http://localhost:8000/donationboxes?donator_id=${localStorage.getItem("id")}&complete=0`, {
//                 "method": "GET",
//                 "headers": {
//                     "Authorization": `Token ${localStorage.getItem("capstone_token")}`
//                 }
//             })
//             .then(response => response.json())
//             .then(getOrderProducts)
//         }
//     }

//     //method to delete order
//     const deleteOrder = () => {
//         if(isAuthenticated()){
//             fetch(`http://localhost:8000/donationboxes/${donationbox.id}`,{
//                 "method": "DELETE",
//                 "headers": {
//                     "Authorization": `Token ${localStorage.getItem("capstone_token")}`
//                 }
//             })
//         }
//     }

//     //method to delete OrderProduct
//     const deleteOrderProduct = (id) => {
//         if(isAuthenticated()){
//             fetch(`http://localhost:8000/orderproducts/${id}`,{
//                 "method": "DELETE",
//                 "headers": {
//                     "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
//                 }
//             })
//         }

//     }

//     //this method will delete order and loop through every orderProduct and delete them
//     const deleteCart = () => {
//         deleteOrder()
//         orderProducts.forEach(orderProduct => {
//             deleteOrderProduct(orderProduct.id)
//         })
//         props.history.push("/")
//     }

//     useEffect(getDonationboxes, [])

//     let productQuantities = {}
//     let total = 0


//     orderProducts.map(orderProduct => {
//         if (productQuantities[orderProduct.product.id]) {
//             productQuantities[orderProduct.product.id][0]++
//         }
//         else {
//             productQuantities[orderProduct.product.id] = [1, orderProduct.product.price, orderProduct.id, orderProduct.product.name]
//         }
//     })

//     Object.keys(productQuantities).map(function(key) {
//         total += (productQuantities[key][0] * productQuantities[key][1])
//     })
//     return (
//         <>
//         {orderProducts.length > 0 ?
//         <>
//           <h2>Items in your cart:</h2>
//           <div className="orderBtn-Div">
//             <button onClick={() => {
//               props.history.push("/cart/addPayment")
//             }}>
//             Complete Order
//             </button>
//             <button onClick={deleteCart}
//             >
//             Delete Order
//             </button>
//           </div>
//         <section className="cartProducts">
//             {/* ternary statement to load the rest of the code after the page has been mounted */}
//             {
//                 order ?
//                 Object.keys(productQuantities).map(function(key) {
//                     return (
//                         <div key={productQuantities[key][2]}>
//                         <ProductCart key={productQuantities[key][2]} productId={key} quantity={productQuantities[key][0]}/>
//                         <button onClick={() => {
//                             deleteOrderProduct(productQuantities[key][2])
//                             getOrders()
//                             }} >delete</button>
//                         </div>
//                     )
//                 })
//                 : ""
//             }
//         </section>
//         </>
//           :
//           <>
//           <h1>No items in cart!</h1>
//           <Link className="nav-link" to="/myproducts">
//             Add Products
//           </Link>
//           </>
//           }


//         </>
//     )
// }

// export default DonationboxCart
