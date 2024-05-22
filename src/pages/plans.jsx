import Navbar from '../component/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";
function Plans() {
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
                                <span className='user-list'>Palns & Billings </span>
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
                                <div ><Button className='c-new'>Create New </Button></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className='pt-4 '>
                                    <Card border="primary"  className=' p-3 c-new-right' style={{ width: '25rem' }}>
                                        <Card.Body>
                                                <Card.Title className='card-titel'>Pre Templates
                                                
                                                <Button className='btn-ep' variant="light">Edit Plan</Button>
                                                </Card.Title>
                                                <span className='a-span'>Our Most Popular Plan. No Hidden Charges.</span>
                                            <Card.Text>
                                                <h2>$3.00 USD <span className='a-span'>/per Templates</span></h2>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className='pt-4'>
                                    <Card className='c-new p-3' style={{ width: '25rem' }}>
                                        <Card.Body>
                                                <Card.Title className='card-titel'>Primary Card Title
                                                <Button variant="light" className="btn-ep btn-left" >Edit Plan</Button>
                                                </Card.Title>
                                                <span className='a-span'>Our Most Popular Plan. No Hidden Charges.</span>
                                            <Card.Text>
                                                <h2>$3.00 USD <span className='a-span'>/per Templates</span></h2>                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )



}

export default Plans
