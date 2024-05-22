import { useState } from 'react';
import {Button,Col,Form,Row} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../store/slices/userSlices";
import '../assets/login.css'

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const isLoading = useSelector((state) => state.user.loading);
    // const error = useSelector((state) => state.user.error);

    const handalInput = (e) => {
        const newObj = { ...values, [e.target.name]: e.target.value }
        setValues(newObj)
    }

    const handleSubmit = (e) => {
        setIsLoading(true)
        e.preventDefault();
        // setErrors(validate(values));
        dispatch(loginUser(values)).then((res) => {
            console.log("res 1", res)
            if (res.payload !== undefined) {
                if (res.payload.success == true) {
                    setIsLoading(false)
                    
                    setEmail("");
                    setPassword("");
                    toast.success(res.payload.message)
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 3000)
                } else {
                    setIsLoading(false)

                    toast.error(res.payload.message)
                }
            } else {
                if (res.error === "Request failed with status code 401") {
                    setIsLoading(false)
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
                                    <img src="src\assets\Elements4x 2.png" class="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col_px_right">
                            <div className=" content-col-right p-5">
                                <img src="src\assets\Logo.png" class="pb-4 img-fluid" />
                                <h1 className='createAccount_px'>
                                    Welcome back :)
                                </h1>
                                <p className='px_para pb-2'>To Keep Connected with us please login with your
                                    personal Information by email and  password</p>
                                {/* {error && <div>Error: {error}</div>} */}
                                <Form className='px_form'
                                    method='post' onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name="email"
                                                onChange={handalInput}
                                                type="email"
                                                value={email}
                                                placeholder="Enter Email"
                                            />
                                            {/* {errors.email && <div className='text-danger'>{errors.email}</div>} */}
                                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                        </Form.Group>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type='password'
                                                name="password"
                                                value={password}
                                                onChange={handalInput}
                                                placeholder="Enter Password"
                                            />
                                            {/* {errors.password && <div className='text-danger'>{errors.password}</div>} */}
                                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                        </Form.Group>
                                        <Row>
                                            <div className="col-md-6 ms-3 mt-3  form-check form-switch form-check" >
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheck" checked />
                                                <label class="form-check-label" for="flexSwitchCheck">Remember me</label>
                                            </div>
                                            <div className='col-md-6 for-pass'>
                                                <div className="back_to_login">
                                                    <a className=' px_forgotlink' href="/forgotPassword " type='link'>Forgot Password?</a>
                                                </div>
                                            </div>
                                        </Row>
                                    </Row>
                                    {/* <Button className='btn-px ' type="submit">LOGIN NOW</Button> */}
                                    <Button className='btn-px ' type="submit">{isLoading ? "Please Wait..." : "LOGIN NOW"}</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
    /* Rectangle 2 */



}

export default Login
