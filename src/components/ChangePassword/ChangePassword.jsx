import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

function ChangePassword() {
  let [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  async function handleChangeSubmit(values) {
    setLoader(true)
    let data = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
    console.log(data);

    setLoader(false);

    if (data.statusText === 'OK') {
      navigate('/login');
      toast.success('Password Changed Successfully :)');
    }


    return data;
  }


  let passwordRegex = /^[A-Za-z0-9]{6,}$/;
  let validationSchema = Yup.object({
    email: Yup.string().email().required(),
    newPassword: Yup.string().required().matches(passwordRegex)
  })

  let formik = useFormik({
    initialValues: {
      newPassword: ''
    },

    validationSchema,
    onSubmit: handleChangeSubmit
  })

  return <div>
    <Toaster />
    <form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
      <div className="w-100">
        <label htmlFor="email">Email</label>
        <input placeholder="Enter your email" type="email" name="email" id="email" className="form-control"
          onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
        {formik.touched.email && formik.errors.email ? <div className="alert alert-danger p-1 mt-1">{formik.errors.email}</div> : ''}
      </div>

      <div className="mt-3">
        <label htmlFor="newPassword">New Password</label>
        <input placeholder="Enter New Password" type="text" name="newPassword" id="newPassword" className="form-control w-100"
          value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        {formik.touched.newPassword && formik.errors.newPassword ? <div className="alert alert-danger p-1 mt-1">{formik.errors.newPassword}</div> : ''}
      </div>


      <button type="submit" disabled={formik.dirty ? false : true} className="btn bg-main mt-2 text-white">{loader ?
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
        'Update'

      }</button>
    </form>
  </div>
}

export default ChangePassword;
