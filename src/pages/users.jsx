import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { InputGroup, Button, Modal, Table, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import '../assets/login.css'
import Navbar from '../component/navbar';
import Local from "../config/config";


function Users() {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone:'',
        address:'',
        role:''
    });

    console.log("item", posts)
    const handalInput = (e) => {
        const newObj = { ...values, [e.target.name]: e.target.value }
        setValues(newObj)
    }

    const getUsers = () => {
        axios.get(`${Local.get_all_users}`,
            {
                headers: {
                    'Authorization': `${Local.Token}`
                }
            }
        ).then(response => {
            setPosts(response.data.data);
        }).catch(error => {
            console.error(error);
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("values", values)
        try {
            const response = await axios.post(`${Local.create_users}`, values,
                {
                    headers: {
                        "Content-type": 'application/json',
                        'Authorization': `${Local.Token}`
                    }
                }
            );
            if (response.data.success == true) {
                toast.success(response.data.message)
                getUsers()
                handleClose();
                return response.data
            } else {
                console.log("response.data.message", response.data.message)
                toast.error(response.data.message)
            }
        } catch (error) {
            if (error.response) {
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
    }


    
const deleteUser = (id) => {
    axios.delete(`${Local.delete_user}`+`${id}`,
        {
            headers: {
                'Authorization': `${Local.Token}`
            }
        }
    ).then(response => {
        getUsers()
        toast.success(response.data.message)
        return
    }).catch(error => {
        console.error(error);
        toast.error(response.data.message)
        return
    });
}
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <ToastContainer />
            <div className=".container-fluid m-0">
                <div className="row m-0 ">
                    <div className="col-md-3 ">
                        <Navbar></Navbar>
                    </div>
                    <div className="col-md-9  bg-light">
                        <div className="row">
                            <div className="col-md-7 p-5">
                                <span className='user-list ms-2'>User's list</span>
                            </div>
                            <div className="col-md-3 ps-5 pt-5">
                                <InputGroup className="mb-3">
                                    <Button variant="outline-secondary" id="button-addon2">
                                        <FaSearch />
                                    </Button>
                                    <Form.Control
                                        placeholder="Search user"
                                        aria-label="Search user"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup></div>
                            {/* <div className="col-md-2 pt-5">
                                <div> <Button className='c-new' onClick={handleShow} >Create user</Button></div>
                            </div> */}
                        </div>
                        <div className="pe-5 ps-5 ">
                            <Table >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts?.map((item, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phone}</td>
                                                        <td>{item?.address}</td>
                                                        <td>{item?.role}</td>
                                                        <td> <div className='action-p'>
                                                            <div className='pr-3'>
                                                                <Button className='c-new' onClick={handleShow} >Update</Button>
                                                            </div>
                                                            <div className='ps-3'>
                                                                <Button onClick={()=>{deleteUser(item._id)}} className='c-new' >delete</Button>
                                                            </div>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form
                                        method='post'
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                autoFocus
                                                name="name"
                                                value={email}
                                                onChange={handalInput}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={email}
                                                onChange={handalInput}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>phone</Form.Label>
                                            <Form.Control
                                                placeholder='Enter phone'
                                                type="text"
                                                name="slug"
                                                value={phone}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                placeholder='Enter Address'
                                                type="text"
                                                name="address"
                                                value={address}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type='submit' >
                                                Save
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )



}

export default Users
