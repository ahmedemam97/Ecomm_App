import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

function Register() {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false)

  let navigate = useNavigate();
  async function handleSubmit(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.message)
        setError(err.response.data.errors.msg)
        setLoading(false)
      })

    if (data.message === 'success') {
      setLoading(false)
      navigate('/login')
    }

    setLoading(false)

    console.log(data)
  }

  let passwordRegex = /^[A-Za-z0-9]{6,}$/;
  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min length 3 charachters').max(20, 'Max lenght 20 charachters').required(),
    phone: Yup.string().matches().required(),
    email: Yup.string().email().required(),
    password: Yup.string().matches(passwordRegex).required(),
    rePassword: Yup.string().oneOf([Yup.ref('password',)], 'password and rePassword is not match!').required()
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  return <>

    <div className="py-5">
      <h2 className="w-100 text-center">Register Now</h2>


      <form onSubmit={formik.handleSubmit} className="d-flex flex-column w-75 mx-auto gap-4">
        {!error ? '' : <div className="alert alert-danger py-2 w-100 mt-3">{error}</div>}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-1 mt-2">{formik.errors.name}</div> : ''}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input type="tel" className="form-control" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-1 mt-2">{formik.errors.phone}</div> : ''}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-1 mt-2">{formik.errors.email}</div> : ''}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-1 mt-2">{formik.errors.password}</div> : ''}
        </div>

        <div>
          <label htmlFor="rePassword">rePassword</label>
          <input type="password" className="form-control" id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-1 mt-2">{formik.errors.rePassword}</div> : ''}
        </div>



        <div className="buttons ">
          {loading ? (
            <Audio
              height="25"
              width="30"
              color="white"
              ariaLabel="audio-loading"
              wrapperStyle={{ backgroundColor: '#0aad0a', width: "fit-content", borderRadius: '5px' }}
              wrapperClass="wrapper-class"
              visible={true}
            />
          )
            :
            (<input type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn bg-main me-auto d-inline-block" />
            )}

        </div>
      </form>
    </div>
  </>
}

export default Register;
