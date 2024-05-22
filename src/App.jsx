import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login';
import SignUp from './component/signUp';
import ForgotPassword from './component/forgotpassword';
import Dashboard from './pages/dashboard';
import Plans from './pages/plans';
import Products from './pages/products';
import Users from './pages/users';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Tutorials from './pages/tutorials';
import Category from './pages/category';
import textEditor from './pages/textEditor';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'  Component={SignUp}> </Route>
          <Route path='/Login' Component={Login }> </Route>
          <Route path='/forgotpassword' Component={ForgotPassword }> </Route>
          <Route path='/dashboard'  Component={Dashboard}> </Route>
          <Route path='/Plans' Component={Plans}> </Route>
          <Route path='/category' Component={Category}> </Route>
          <Route path='/products' Component={Products}> </Route>
          <Route path='/users' Component={Users}> </Route>
          <Route path='/settings' Component={Settings}> </Route>
          <Route path='/profile' Component={Profile}> </Route>
          <Route path='/tutorials' Component={Tutorials}> </Route>
          <Route path='/textEditor' Component={textEditor}> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
