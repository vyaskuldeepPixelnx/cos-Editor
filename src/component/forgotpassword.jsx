import { useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../assets/login.css'

function ForgotPassword() {
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState();
    const [values, setValues] = useState({
        email: '',
        newPassword: ''
    });

    const handalInput = (e) => {
        const newObj = { ...values, [e.target.name]: e.target.value }
        setValues(newObj)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("values", values)
        try {
            const response = await axios.post('http://192.168.29.141:1000/auth/reset-password', values,
                {
                    headers: {
                        "Content-type": 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE0Y2NmZWM1NDg5YTk3NzU5ZTI2MzkiLCJpYXQiOjE3MTI4OTgxNDcsImV4cCI6MTcxMzA3MDk0N30.dwky2aYpQI_3amwEzN0vot8sTM4gv4vdEjJ5tOe1_gs'
                    }
                }
            );
            if (response.data.success == true) {
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate("/login");
                }, 3000); 
                    return response.data
            }else{
                console.log("response.data.message",response.data.message)
                toast.error(response.data.message)
            }
        } catch (error) {
            if (error.response) {
                // console.log('Server responded with status code:', error.response.status);
                // console.log('Response data:', error.response.data.message);
                toast.error(error.response.data.message)
                return
            } else if (error.request) {
                console.log('No response received from server:', error.request);
                toast.error(error.request)
                return
            } else {
                console.log('Error setting up the request:', error.message);
                toast.error(error.message)
                return
            }
        }
    };

    // const  = async (passworddata) => {
    //         try {
    //             const response = await axios.post('http://192.168.29.141:1000/auth/register', passworddata,
    //                 {
    //                     headers: {
    //                         "Content-type": 'application/json',
    //                         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE0Y2NmZWM1NDg5YTk3NzU5ZTI2MzkiLCJpYXQiOjE3MTI4MzcxOTYsImV4cCI6MTcxMzAwOTk5Nn0.dnC_WQaH4eNTi1eJ7NZCss85nFctWgBTAjkFjQ8iVpM'
    //                     }
    //                 }
    //             );
    //         } catch (e) {

    //             return thunkApi.rejectWithValue(e.response.data)
    //         }
    //     }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(resetPassword(values)).then((res) => {
    //         console.log("res 1", res)
    //         if (res.payload !== undefined) {
    //             if (res.payload.success == true) {
    //                 setEmail("");
    //                 setPassword("");
    //                 toast.success(res.payload.message)
    //                 setTimeout(() => {
    //                     navigate("/login");
    //                 }, 3000)
    //             } else {
    //                 toast.error(res.payload.message)
    //             }
    //         } else {
    //             if (res.error === "Request failed with status code 401") {
    //                 toast.error(res.payload.message)
    //             } else {
    //                 toast.error(res.payload.message)
    //             }
    //         }
    //     });
    // };


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
                                    Forgot Password
                                </h1>
                                <p className='px_para px_para_forgot_content pb-2'>No Worries, We’ll Send You Reset Instructions.</p>
                                <Form className='px_form'
                                    method='post' onSubmit={handleSubmit}>
                                    <Row className="mb-3">

                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                // required
                                                type='email'
                                                name="email"
                                                value={email}
                                                onChange={handalInput}
                                                placeholder="Enter email Address"
                                            />
                                            {/* {errors.email && <div className="text-danger">{errors.email}</div> } */}
                                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                            <Form.Label>New password</Form.Label>
                                            <Form.Control
                                                // required
                                                type='text'
                                                name="newPassword"
                                                value={newPassword}
                                                onChange={handalInput}
                                                placeholder="Enter New password"
                                            />
                                            {/* {errors.email && <div className="text-danger">{errors.email}</div> } */}
                                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                        </Form.Group>

                                    </Row>
                                    <Button className='btn-px ' type="submit">RESET PASSWORD</Button>
                                </Form>
                                <div className='pt-5 back_to_login'><img className='svg_img mr-3' src='src\assets\arrow-left-solid.svg'></img>
                                    <a className='back_to' type='link' href='/login' > Back To Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
    /* Rectangle 2 */



}

export default ForgotPassword
