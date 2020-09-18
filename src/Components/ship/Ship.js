import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Ship.css'
import star from '../../images/Icon/star_1_.png'

const ship = (props) => {
    console.log(props.hotel);

    const {name, photo, rating, perNight}= props.hotel;
    return (
        <div >
            <Row>
                <Col md={5} className="hotelImage">
                    <img src={photo}></img>
                </Col>
                <Col md={5}>
                    <h3  className="highlight">{name}</h3>
                    <p className="highlight">4 guest  2 bedroom  2beds  2baths</p>
                    <p className="highlight">Cancellation flexibility available</p>
                    <Row>
                    <Col md={1}>
                        <img id='star' src={star} />
                    </Col>
                    
                    <Col md={1}>
                        <h6  className="highlight">{rating}(20) </h6>  
                    </Col>
                    <Col md={1}></Col>
                    <Col md={1}>
                        <h6 className="highlight"> ${perNight}/night</h6>
                    </Col>
                    </Row>                    
                     
                </Col>
            </Row>
            
        </div>
    );
};

export default ship;