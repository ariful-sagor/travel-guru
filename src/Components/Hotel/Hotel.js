import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Button, Col, Container, Row } from 'react-bootstrap';
import fakeData from '../FakeData/fakeData';
// import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Hotel.css';
import Ship from '../ship/Ship';
import GoogleMap from '../Map/GoogleMap';
const Hotel = () => {
    const places = fakeData;
    const hotel= places[0].hotels;
    return (
        <div>
            <Container>
                <NavBar></NavBar>
                <br />
                <div className="hotels"></div>
                <br />
                <Row>
                    <Col md={7}>
                        {
                            hotel.map(hotel => <Ship hotel={hotel}></Ship>)
                        }
                    </Col>
                    <Col md={4}>
                        <GoogleMap></GoogleMap>
                    </Col>
                    {/* <Col md={1}></Col> */}
                </Row>
            </Container>
        </div>
        
    );
};

export default Hotel;


