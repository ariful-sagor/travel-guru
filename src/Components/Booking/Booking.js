import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import fakeData from '../FakeData/fakeData';
import NavBar from '../NavBar/NavBar';
import './Booking.css';

const Booking = () => {
    const { placename } = useParams();
    const booking = fakeData.find(place => place.name === placename);
    const history = useHistory();
    const handleProceed=() =>{
        history.push('/shipment');
    }

    return (
        <section className="booking text-white">
        <NavBar />
            <Container>
                <Row className="align-items-center mt-5">
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <h3 className="placeName text-center text-md-left my-4">{booking.name}</h3>
                        <p className="text-justify">{booking.longDesc}</p>
                    </Col>
                    <Col lg={2} className="d-none d-lg-block"></Col>
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <form className="form-area">
                            <div className="form-group">
                                <label>From</label>
                                <input type="address" className="form-control" required placeholder="Enter Address" />
                            </div>

                            <div className="form-group">
                                <label>To</label>
                                <input type="address" className="form-control" defaultValue={placename} />
                            </div>
                            <div className="form-group row booking-date">
                                <div className="col-6">
                                    <label htmlFor="date-input">From</label>
                                    <input required className="form-control" type="date" id="dateFrom" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="dateTo">To</label>
                                    <input required className="form-control" type="date" id="dateTo" />
                                </div>
                            </div>
                           
                            <button type="submit" className="btn btn-warning btn-block" onClick={handleProceed}>Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Booking;