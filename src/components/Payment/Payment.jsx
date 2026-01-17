import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from 'yup'
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";

function Payment() {
  let [paymentLoader, setPaymentLoader] = useState(false)
  let { payment, cartData } = useContext(CartContext)
  let url = 'http://localhost:3000';

  async function handlePaymentSubmit(values) {
    setPaymentLoader(true)
    let { data } = await payment(cartData.cartId, url, values);
    setPaymentLoader(false)
    console.log(cartData);
    window.location.href = data.session.url;
  }

  let validationSchema = Yup.object({
    details: Yup.string().required(),
    phone: Yup.string().required(),
    city: Yup.string().required()
  })

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: handlePaymentSubmit
  })

  useEffect(() => {
    console.log(cartData);
  }, [])

  return <div className="mt-5">
    <h3 className="text-center">Payment</h3>
    <form className="w-50 mx-auto" onSubmit={formik.handleSubmit}>
      <div >
        <label htmlFor="details">Details</label>
        <input className="form-control" type="text" name="details" id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />
        {formik.errors.details && formik.touched.details ? <div className="alert alert-danger p-1 mt-1">{formik.errors.details}</div> : ''}
      </div>
      <div className="my-3" >
        <label htmlFor="phone">Phone</label>
        <input className="form-control" type="text" name="phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-1 mt-1">{formik.errors.phone}</div> : ''}
      </div>
      <div className="">
        <label htmlFor="city">City</label>
        <input className="form-control" type="text" name="city" id="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
        {formik.errors.city && formik.touched.city ? <div className="alert alert-danger p-1 mt-1">{formik.errors.city}</div> : ''}
      </div>

      <button className="btn bg-main text-white mt-3">
        {paymentLoader ?
          <BallTriangle
            height={24}
            width={24}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{ padding: '0' }}
            wrapperClass=""
            visible={true}
          /> :
          "Pay Now"

        }

      </button>
    </form>


  </div>;
}

export default Payment;
