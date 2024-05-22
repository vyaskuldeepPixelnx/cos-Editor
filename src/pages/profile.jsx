import Nav from 'react-bootstrap/Nav';
import Navbar from '../component/navbar';


function Profile() {


    return (
        <>
            <div className=".container-fluid m-0">
                <div className="row m-0 ">
                    <div className="col-md-2 ">
                        {/* <div className=''>
                            <img src="src\assets\Logo.png" className="p-5 img-fluid" />
                        </div> */}
                        <Navbar></Navbar>
                        <div className="">
                            {/* <Nav defaultActiveKey="/dashboard" className="flex-column">
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\table-columns-solid.svg' /> Dashboard</Nav.Link>
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\bag-shopping-solid.svg' /> Plans</Nav.Link>
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\newspaper-regular.svg' /> Templates</Nav.Link>
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\users-solid.svg' /> User's List</Nav.Link>
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\gear-solid.svg' /> Settings</Nav.Link>
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\user-regular.svg' /> Profile</Nav.Link>
                                <Nav.Link ><img className='svg_img mr-3' src='src\assets\file-video-regular.svg' /> Tutorials</Nav.Link>
                            </Nav> */}
                        </div>
                        {/* <div className="user_profile  row">
                            <div className="col-md-2"><img className='p-1 pt-3 ' src='src\assets\user-regular.svg' /></div>
                            <div className="col-md-10  ">
                                <div className='bg-light pr-2'>
                                    <span>Darrell Steward</span>
                                    <span>debra.holt@example.com</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-md-10 bg-light">
                        <div className="row">
                            <div className="col-md-7"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-8"></div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )



}

export default Profile
