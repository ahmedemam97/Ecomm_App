import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Audio, BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

function ForgetPassword() {
  let [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().email().required()
  })

  async function sendCode(values) {
    setLoader(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
    console.log(data);
    setLoader(false);
    if (data.statusMsg === 'success')
      navigate('/resetCode');

    return data;
  }

  let formik = useFormik({
    initialValues: {
      email: ''
    },

    validationSchema,
    onSubmit: sendCode
  })


  return <div>
    <h2>ForgetPassword</h2>
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column mx-auto w-50">
      <div className="w-100">
        <label htmlFor="email">Email</label>
        <input placeholder="Enter your email" type="email" name="email" id="email" className="form-control"
          onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
        {formik.touched.email && formik.errors.email ? <div className="alert alert-danger p-1 mt-1">{formik.errors.email}</div> : ''}
      </div>

      <button disabled={formik.dirty ? false : true} type="text" className="btn bg-main text-white w-25 mx-auto mt-3 d-flex justify-content-center" >
        {loader ?
          <BallTriangle
            height={24}
            width={24}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{ padding: '0' }}
            wrapperClass=""
            visible={true}
          />
          :
          'Submit'

        }
      </button>
    </form>
  </div>
}

export default ForgetPassword;
