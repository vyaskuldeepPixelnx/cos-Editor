import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../assets/login.css'
import Local from "../config/config";
import ReactPaginate from 'react-paginate';
import Navbar from '../component/navbar';


function Category() {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [createData, setCreateData] = useState();
    const [getId, setGetId] = useState();
    const [values, setValues] = useState({
        name: '',
        description: ''
    });

    const handalInput = (e) => {
        const newObj = {
            ...values,
            id: (getId == undefined) ? "" : getId,
            [e.target.name]: e.target.value
        }
        setValues(newObj)
    }


    const getcategory = () => {
        axios.get(`${Local.get_all_category}`,
            {
                headers: {
                    'Authorization': `${Local.Token}`
                }
            }
        ).then(response => {
            setPosts(response.data);
            return
        }).catch(error => {
            console.error(error);
            toast.error(response.data.message)
            return
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("values", values)
        const dataValidate = validation(values)
        if (!dataValidate) {
            try {
                const response = await axios.post(`${Local.get_all_category}`, values,
                    {
                        headers: {
                            "Content-type": 'application/json',
                        }
                    }
                );
                if (response) {
                    toast.success(response.data.message)
                    handleClose();
                    getcategory()
                    toast.success("Category is created successfully .")
                    return response.data
                } else {
                    console.log("response.data.message", response.data.message)
                    toast.error(response)
                    return
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error)
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
        } else {
            toast.error(dataValidate)
        }
    }


    const deleteCategory = (id) => {
        axios.delete(`${Local.get_all_category}` + '/' + `${id}`,
            {
                headers: {
                    // 'Authorization': `${Local.Token}`
                }
            }
        ).then(response => {
            console.log(response)
            getcategory()
            toast.success("category is deleted successfully ")
            return
        }).catch(error => {
            console.error(error);
            toast.error(response.data.message)
            return
        });
    }

    const getByIdCategory = (id) => {
        setGetId(id)
        console.log("Id", id)
        axios.get(`${Local.get_all_category}` + '/' + `${id}`,
            {
                headers: {
                    'Authorization': `${Local.Token}`
                }
            }
        ).then(response => {
            setValues({
                name: response.data.name,
                description: response.data.description,
            })
            toast.success(response.data.message)
            return
        }).catch(error => {
            console.error(error);
            toast.error(response.data.message)
            return
        });
    }

    function validation(data) {
        let error = {}
        if (data.name == "" || data.name == undefined) {
            return error.name = "category name is required."
        }
        return
    }


    const editProduct = (item) => {
        setGetId(item)
        axios.get(`${Local.get_all_category}` + '/' + `${item}`,
            {
                headers: {
                    "Content-type": 'application/json',
                }
            }
        ).then(response => {
            console.log("response", response.data)
            setValues({
                name: response.data.name,

                description: response.data.description,

            });
        }).catch(error => {
            console.error(error);
        });
    }


    const reset = () => {
        setGetId("");
        setValues({
            name: '',
            description: '',
        });
        handleShow(!show)
        setCreateData("create")
        setValues("")
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const dataValidate = validation(values)
        if (!dataValidate) {

            try {
                const response = await axios.put(`${Local.get_all_category}` + "/" + `${getId}`, values,
                    {
                        headers: {
                            "Content-type": 'application/json',
                        }
                    }
                );
                if (response) {
                    getcategory()
                    toast.success("Category is update successfully .")
                    handleClose()
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
        } else {
            toast.error(dataValidate)

        }

    }

    useEffect(() => {
        getcategory();
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
                                <span className='user-list ms-2'>Category list</span>
                            </div>
                            <div className="col-md-3 ps-5 pt-5">
                                <InputGroup className="mb-3">
                                    <Button variant="outline-secondary" id="button-addon2">
                                        <FaSearch />
                                    </Button>
                                    <Form.Control
                                        placeholder="Search Category"
                                        aria-label="Search Category"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup></div>
                            <div className="col-md-2 pt-5">
                                <div> <Button className='c-new' onClick={() => {
                                    reset()

                                }}  >Create Category</Button></div>
                            </div>
                        </div>
                        <div className="pe-5 ps-5 ">
                            <Table >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Category name</th>
                                        <th>Discretions</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts?.map((item, index) => {

                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.description}</td>
                                                        <td> <div className='action-p'>
                                                            <div className='pr-3'>
                                                                <Button className='c-new' onClick={() => {
                                                                    handleShow();
                                                                    editProduct(item.id)

                                                                }} >Update</Button>
                                                            </div>
                                                            <div className='ps-3'>
                                                                <Button onClick={() => { deleteCategory(item.id) }} className='c-new' >delete</Button>
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
                                    <Modal.Title>{createData === "create" ? 'Create' : 'Update'} Category</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form
                                        method='post'
                                        onSubmit={createData === "create" ? handleSubmit : handleUpdate}
                                    >
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Category"
                                                autoFocus
                                                name="name"
                                                // defaultValue={values?.category}
                                                value={values.name}
                                                onChange={handalInput}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Discretions</Form.Label>
                                            <Form.Control
                                                placeholder='Enter description'
                                                type="text"
                                                name="description"
                                                value={values.description}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                                            <Button variant="primary" type='submit' >
                                                {createData === "create" ? 'Create' : 'Update'}
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

export default Category
