import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

function ResetCode() {
  let [loader, setLoader] = useState(false);

  let navigate = useNavigate();
  async function handleResetSubmit(values) {
    setLoader(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
    console.log(data);

    if (data.status !== 'Success')
      toast.error('Reset code is invalid or has expired')
    else {
      setLoader(false)
      navigate('/changePassword')
    }
    return data;
  }

  let validationSchema = Yup.object({
    resetCode: Yup.string().required()
  })

  let formik = useFormik({
    initialValues: {
      resetCode: ''
    },

    validationSchema,
    onSubmit: handleResetSubmit
  })

  return <div>
    <Toaster />
    <form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
      <div>
        <label htmlFor="resetCode">Reset Code</label>
        <input placeholder="Enter Reset Code" type="text" name="resetCode" id="resetCode" className="form-control w-100"
          value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        {formik.touched.resetCode && formik.errors.resetCode ? <div className="alert alert-danger p-1 mt-1">{formik.errors.resetCode}</div> : ''}
      </div>

      <button type="submit" disabled={formik.dirty ? false : true} className="btn bg-main mt-2 text-white d-flex justify-content-center">
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
          'Send Code'

        }
      </button>
    </form>
  </div>
}

export default ResetCode;
