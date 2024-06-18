import Signup from './scenes/User/Signup'
import Login from './scenes/User/Login';
import AdminLogin from './scenes/Admin/Login';
import AdminPanel from './scenes/Admin/adminPanel';
import UserManage from './scenes/Admin/userManage';
import {Routes,Route} from 'react-router-dom';
import Home from './scenes/User/Home';
import Profile from './scenes/User/Profile';
import SearchProfile from './components/Users/SearchProfile';
// import CreatePost from './scenes/User/createPost'
import Messages from './components/Users/Messages';
import Settings from './components/Users/Settings';

function App() {
  return (
    <div className="">
      <Routes>
      {/* <Route path='/' element={<h1>hhhhhhh</h1>}/> */}
        <Route path='/' element={<Login/>}/>
        <Route path='/userSignup' element={<Signup/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminPanel' element={<AdminPanel/>}/>
        <Route path='/users' element={<UserManage/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Messages' element={<Messages/>}/>
        <Route path="/SearchProfile/:userId" element={<SearchProfile />} />
        <Route path='/Settings' element={<Settings />} />
      {/* <Route path='/Search' element = {<Search/>}/> */}

        

      </Routes>

    </div>
  );
}

export default App;
