import { useFormik } from "formik";

function Register() {
  function handleSubmit(values) {
    console.log(values)
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },

    onSubmit: handleSubmit

  })

  return <div className="w-75 mx-auto pt-5">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-4">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="form-control" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" className="form-control" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="teemailxt" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>

      <div>
        <label htmlFor="rePassword">RePassword</label>
        <input type="password" id="rePassword" className="form-control" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <button className="btn bg-main w-15 m-auto text-white" type="submit">Submit</button>
    </form>
  </div>;
}

export default Register;
