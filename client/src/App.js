import Signup from './scenes/User/Signup'
import Login from './scenes/User/Login';
import AdminLogin from './scenes/Admin/Login';
import AdminPanel from './scenes/Admin/adminPanel';
import UserManage from './scenes/Admin/userManage';
import {Routes,Route} from 'react-router-dom';
import Home from './scenes/User/Home';
import Profile from './scenes/User/Profile';
// import CreatePost from './scenes/User/createPost'


function App() {
  return (
    <div className="">
      <Routes>
      {/* <Route path='/' element={<h1>hhhhhhh</h1>}/> */}
        <Route path='/userLogin' element={<Login/>}/>
        <Route path='/userSignup' element={<Signup/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminPanel' element={<AdminPanel/>}/>
        <Route path='/users' element={<UserManage/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        {/* <Route path='/CreatePost' element = {<CreatePost/>}/> */}

        

      </Routes>

    </div>
  );
}

export default App;
