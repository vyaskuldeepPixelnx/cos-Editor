import { useState } from 'react';
import {Button,Col,Form,Row} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupUser } from "../store/slices/userSlices";
import '../assets/login.css'

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    countryCode: "+91",
    phone: "741258963",
    address: "gopal nagar",
    role: "admin"
  });
  // const isLoading = useSelector((state) => state.user.loading);
  // const error = useSelector((state) => state.user.error);

  const handalInput = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value }
    setValues(newObj)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors(validated(values));
    dispatch(signupUser(values)).then((res) => {
      if (res.payload !== undefined) {
        if (res.payload.success == true) {
          setEmail("");
          setPassword("");
          toast.success(res.payload.message)
          setTimeout(() => {
            navigate("/login");
          }, 3000)
        } else {
          toast.error(res.payload.message)
        }
      } else {
        if (res.error === "Request failed with status code 401") {
          toast.error(res.payload.message)
        } else {
          toast.error(res.payload.message)
        }
      }
    });
  };


  return (
    <>
      <ToastContainer />
      <div className='benger_px'>
        <div className="container-fluid container_px text-center m-6 ">
          <div className="row text-center ">
            <div className="col-md-7 col_px_left ">
              <div className=" p-5">
                <h1 className='pb-5  createAccount_px' >Awesome Page Builder<br />
                  Creating Stunning Website</h1>

                <div className=''>
                  <img src="src\assets\Elements4x 2.png" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-md-5 col_px_right">
              <div className=" content-col-right p-5">
                <img src="src\assets\Logo.png" className="pb-4 img-fluid" />
                <h1 className='createAccount_px'>
                  Let’s Create Account
                </h1>
                <p className='px_para pb-2'>Are You Ready To Take The Next Step Towards a
                  Successful Future?</p>
                {/* {error && <div>Error: {error}</div>} */}
                <Form className='px_form'
                  method='post' onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={handalInput}
                        placeholder="Enter Name"
                        value={name}
                        name="name"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        name="email"
                        onChange={handalInput}
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type='password'
                        name="password"
                        value={password}
                        onChange={handalInput}
                        placeholder="Enter password"
                      />
                    </Form.Group>
                  </Row>
                  <Button className='btn-px ' type="submit">Signup</Button>
                  {/* <Button className='btn-px ' type="submit">{isLoading ? "Please Wait..." : "Signup"}</Button> */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
