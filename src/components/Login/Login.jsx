import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Audio, BallTriangle, ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../../Context/UserContext";

function Login() {
  let [error, setError] = useState(null)
  let [loader, setLoader] = useState(false)
  let navigate = useNavigate()
  let { setUserToken, setUserData } = useContext(UserContext);



  async function loginSubmit(values) {
    setLoader(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message)
        setLoader(false)
      })
    console.log(data.token);

    if (data.message === 'success') {
      setLoader(false)
      navigate('/')
      setUserToken(data.token)
      setUserData(data)
      localStorage.setItem('userToken', data.token);
    }
  }
  let passwordRegex = /^[A-Za-z0-9]{6,}$/;
  let validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().matches(passwordRegex).required()
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: loginSubmit
  })

  return <div className="my-5 w-75 mx-auto">
    <h2>Login Now</h2>
    <form onSubmit={formik.handleSubmit} >
      {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : ''}
      <div className="mt-3">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
        {formik.touched.email && formik.errors.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}
      </div>

      <div className="mt-3">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
        {formik.touched.password && formik.errors.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}
      </div>

      <div className="mt-3 d-flex justify-content-between gap-2">
        {loader ? (
          <BallTriangle
            height="45"
            width="50"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{ backgroundColor: '#0aad0a', width: "fit-content", borderRadius: '5px' }}
            wrapperClass="wrapper-class"
            visible={true} className='spinner'
          />)
          :
          (<input type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn bg-main me-auto d-inline-block text-white" />)
        }

        <Link to='/register'>Have an account?</Link>
        <Link to='/forgetPassword'>Forget Password?</Link>
      </div>
    </form>
  </div>
}

export default Login;
