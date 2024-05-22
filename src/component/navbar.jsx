import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import '../assets/nevbar.css'

import { SidebarData } from './sidebarData';
import { Button } from 'react-bootstrap';

function Navbar() {
    return (
        <>
            <div className='navbar'>
                <div className='' >
                    <img src="src\assets\Logo.png" className="p-3" />
                <div className='profile-bot'>
                    {SidebarData.map((item, index) => {
                        return (
                            <Nav key={index} className={item.cName}  >
                                <Link className='' to={item.path}> {item.icon}
                                    <span className=' p-2' >{item.title}</span></Link>
                            </Nav>
                        )
                    })}
                </div>
                <div className="user_profile  row">
                    <div className="col-md-2"><img className='p-1 pt-3 ' src='src\assets\user-regular.svg' /></div>
                    <div className="col-md-10  ">
                        <div className='bg-light pr-2'>
                            <span>Darrell Steward</span>
                            <span>debra.holt@example.com</span>
                        </div>
                    </div>
                </div>
                <div className='logout-btn'><Button variant="danger" className='ps-5 pe-5 bg-' >logout</Button></div>
                </div>

            </div>
        </>
    )
}
export default Navbar
