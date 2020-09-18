import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Header from '../Header/Header';
import Hotel from '../Hotel/Hotel';

const Home = () => {
    return (
        <div className="home-style">
            <NavBar />
            <Header />
        </div>
    );
};

export default Home;