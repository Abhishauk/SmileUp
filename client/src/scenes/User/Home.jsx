import React from 'react';
import Header from '../../components/Users/Header';
import Navbar from '../../components/Users/navbar';
import Posts from '../../components/Users/Posts';
const Home = () => {
  return (
    <div className='bg-white'>
        <Header/>
        <Navbar /> 
        <Posts />   
    </div>
  )
}

export default Home
