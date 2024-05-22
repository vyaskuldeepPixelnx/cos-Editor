import Nav from 'react-bootstrap/Nav';
import Navbar from '../component/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

function Dashboard() {


    return (
        <>
            <div className=".container-fluid m-0">
                <div className="row m-0 ">
                    <div className="col-md-3 ">
                        <Navbar></Navbar>
                    </div>
                    <div className="col-md-9  bg-light">
                        <div className="row">
                            <div className="col-md-7 p-5">
                                <span className='user-list'>User list</span>
                            </div>
                            <div className="col-md-3 ps-5 pt-5">
                                <InputGroup className="mb-3">
                                    <Button variant="outline-secondary" id="button-addon2">
                                        <FaSearch />
                                    </Button>
                                    <Form.Control
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                </InputGroup></div>
                            <div className="col-md-2 pt-5">
                                <div> <Dropdown>
                                    <Dropdown.Toggle variant="outline" id="dropdown-basic">
                                        Add Section
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Days</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">monthly</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">yearly</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className='p-3'>
                                    <img src="src\assets\1.png" className="img-fluid" />
                                </div>
                                <div className='p-3'>
                                    <img src="src\assets\2.png" className="img-fluid" />
                                </div>
                                <div className='p-3'>
                                    <img src="src\assets\3.png" className="img-fluid" />
                                </div>

                            </div>
                            <div className="col-md-9">
                                <div className='p-'>
                                    <img src="src\assets\Group 21.png" className="img-fluid" />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )



}

export default Dashboard
