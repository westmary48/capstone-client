import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import PaymentType from "../cards/PaymentType"

const ProductCategories = props => {
    const [paymentTypes, setPaymentTypes] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getPaymentTypes = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/paymenttypes?donator=${localStorage.getItem("id")}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("capstone_token")}`
                }
            })
                .then(response => response.json())
                .then(setPaymentTypes)
        }
    }

    useEffect(getPaymentTypes, [])


    return (
        <>
            {
              paymentTypes.length > 0 ?
              <>
                <h1>Payment Options</h1>
                <article className="paymentTypeList">
                    {
                        paymentTypes.map(paymentType=>
                            <PaymentType key={paymentType.id} paymentType={paymentType} getPaymentTypes={getPaymentTypes} />
                        )
                    }
                </article>
              </>
              :
              <>
                <Link className="nav-link" to="/payment/create">
                  <h6>Add some Payment Options!</h6>
                </Link>
              </>
            }
        </>
    )
}

export default ProductCategories