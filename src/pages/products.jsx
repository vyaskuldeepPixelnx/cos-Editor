import { useEffect, useState } from 'react';
import { InputGroup, Button, Form, Table, Modal } from 'react-bootstrap';
import Local from "../config/config";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../component/navbar';
import { ToastContainer, toast } from "react-toastify";
import apiCall from '../comman/commanApi';

function Products() {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const navigate = useNavigate();
    const [price, setPrice] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [name, setName] = useState();
    const [slug, setSlug] = useState();
    const [getId, setGetId] = useState();
    const [cpage, setCpage] = useState(1);
    const recordperpage = 5;
    const lastIndex = cpage * recordperpage;
    const firstIndex = lastIndex - recordperpage;
    const records = posts.slice(firstIndex, lastIndex)
    const npage = Math.ceil(posts.length / recordperpage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const [categoryPosts, setCategoryPosts] = useState();
    const [description, setDescription] = useState();

    const [values, setValues] = useState({
        name: '',
        photo: '',
        price: '',
        description: '',
        quantity: '',
        category: ''
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
            setCategoryPosts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }



    const getProducts = () => {
        axios.get(`${Local.product_url}`,
            {
                headers: {
                    // 'Authorization': `${Local.Token}`
                }
            }
        ).then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }


    const deleteProduct = (id) => {
        axios.delete(`${Local.product_url}` + '/' + `${id}`,
            {
                headers: {
                    'Authorization': `${Local.Token}`
                }
            }
        ).then(response => {
            console.log(response)
            getProducts()
            toast.success("Product is deleted successfully ")
            return
        }).catch(error => {
            console.error(error);
            toast.error("Samething went worng  ")
            return
        });
    }
    const handleSubmit = async (e) => {
        console.log("values", values)
        e.preventDefault();
        // apiCall({
        //     url: "https://664440516c6a65658709a588.mockapi.io/products",
        //     method: 'POST',
        //     data: values
        // },
        //     (resp, err = null) => {
        //         if (err != null) {

        //             console.log("dfdf",resp);
        //             toast.error(resp)
        //         } else {
        //             toast.success(resp)
        //             getProducts()
        //             handleClose();
        //             console.log("dfdfasd");

        //         }
        //     }
        // )
        const dataValidate = validation(values)
        if (!dataValidate) {

            try {
                const response = await axios.post(`${Local.product_url}`, values,
                    {
                        headers: {
                            "Content-type": 'application/json',
                        }
                    }
                );
                if (response) {
                    getProducts()
                    toast.success("Products is created successfully .")
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

    function validation(data) {
        let error = {}
        if (data.name == "" || data.name == undefined) {
            return error.name = "product name is required."
        } else if (data.category == "" || data.category == undefined) {
            return error.name = "category is required."
        } else if (data.quantity == "" || data.quantity == undefined) {
            return error.quantity = " quantity is required"
        }
        return
    }

    const putSubmitData = async (e) => {
        e.preventDefault()
        const dataValidate = validation(values)
        if (!dataValidate) {

            try {
                const response = await axios.put(`${Local.product_url}` + "/" + `${getId}`, values,
                    {
                        headers: {
                            "Content-type": 'application/json',
                        }
                    }
                );
                if (response) {
                    getProducts()
                    toast.success("Products is updatad successfully .")
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

    const editProduct = (item) => {
        setGetId(item)
        axios.get(`${Local.product_url}` + '/' + `${item}`,
            {
                headers: {
                    "Content-type": 'application/json',
                }
            }
        ).then(response => {
            console.log("response", response.data)
            setValues({
                name: response.data.name,
                photo: response.data.photo,
                price: response.data.price,
                description: response.data.description,
                quantity: response.data.quantity,
                category: response.data.category
            });
            // setPosts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }


    const reset = () => {
        setGetId("");
        setValues({
            name: '',
            photo: '',
            price: '',
            description: '',
            quantity: '',
            category: ''
        });
        handleShow(!show)
    }
    useEffect(() => {
        getcategory();
        getProducts();
    }, [])

    function prePage() {
        if (currentPage !== firstIndex) {

            setCurrentPage(currentPage - 1)
        }
    }
    function nextPage() {
        if (currentPage !== lastIndex) {

            setCurrentPage(currentPage + 1)
        }


    }

    function changeCPage(id) {
        setCurrentPage(id)

    }


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
                                <span className='user-list'> products (30)</span>
                            </div>
                            <div className="col-md-3 ps-5 pt-5">
                                <InputGroup className="mb-3">
                                    <Button variant="outline-secondary" id="button-addon2">
                                        <FaSearch />
                                    </Button>
                                    <Form.Control
                                        placeholder="Search the item here"
                                        // aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup></div>
                            <div className="col-md-2 pt-5">
                                <div ><Button className='c-new' onClick={() => {
                                    reset()
                                }
                                }>Create New </Button></div>
                            </div>
                        </div>
                        <div className="row">
                            <Table >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Photo</th>
                                        <th>Price</th>
                                        <th>description</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
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
                                                        <td>{item?.quantity}</td>
                                                        <td>{item?.price}</td>
                                                        <td>{item?.description}</td>
                                                        <td>{item?.category}</td>
                                                        {/* <td>{categoryPosts.map((i) => { return (i._id == item?.category ? (i.name) : "") })}</td> */}
                                                        <td>{item?.quantity}</td>
                                                        <td> <div className='action-p'>
                                                            <div className='pr-3'>
                                                                <Button className='c-new' onClick={() => { handleShow(), editProduct(item.id) }} >Update</Button>
                                                            </div>
                                                            <div className='ps-3'>
                                                                <Button onClick={() => { deleteProduct(item.id) }} className='c-new' >delete</Button>
                                                            </div>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                                {/* <nav>
                                    <ul>
                                        <li>
                                            <a href="#" onClick={prePage} >prev</a>
                                        </li>
                                        {
                                            posts.map((n,i)=>{
                                               return <li className={`${currentPage===n ? "active":''}`} key={i}>
                                                    <a onClick={changeCPage(n)} href="#">{n}</a>
                                                </li>
                                            })
                                        }
                                        <li>
                                            <a href="#" onClick={nextPage} >next</a>
                                        </li>

                                    </ul>

                                </nav> */}
                                {/* <div className='action-p'>
                                    <div className='pr-3'>
                                        <Button className='c-new' onClick={() => { prevPage }} >pre</Button>
                                    </div>
                                    <p>{page} of {nbpage}</p>
                                    <div className='ps-3'>
                                        <Button onClick={()=>{ getNextPage()}} className='c-new' >next</Button>
                                    </div>
                                </div> */}
                            </Table>
                            <Modal show={show} onHide={() => { handleClose() }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add / Update Products</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form
                                        method='post'
                                        onSubmit={(getId) ? putSubmitData : handleSubmit}
                                    >
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Name"
                                                autoFocus
                                                name="name"
                                                value={values.name}
                                                onChange={handalInput}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>photo</Form.Label>
                                            <Form.Control
                                                placeholder='Enter Slug'
                                                type="file"
                                                name="photo"
                                                value={slug}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                placeholder='Enter Price'
                                                type="text"
                                                name="price"
                                                value={values.price}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Discretions</Form.Label>
                                            <Form.Control
                                                placeholder='Enter Discretions'
                                                type="text"
                                                name="description"
                                                value={values.description}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >

                                            <Form.Label>Category</Form.Label>
                                            <Form.Select onChange={handalInput} name='category' value={values.category} aria-label="select">
                                                <option>Open this select menu</option>
                                                {categoryPosts?.map((i) => { return (<option key={i._id}>{i.name}</option>) })}                                            </Form.Select>
                                            {/* <Form.Control
                                                placeholder='Enter Category'
                                                type="text"
                                                name="category"
                                                value={category}
                                            /> */}
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                placeholder='Enter Quantity'
                                                type="text"
                                                name="quantity"
                                                value={values.quantity}
                                                onChange={handalInput} />
                                        </Form.Group>
                                        <Modal.Footer>
                                            <Button className='c-new' variant="primary" type='submit' >
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

export default Products
