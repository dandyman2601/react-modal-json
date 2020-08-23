import React, { useState } from 'react';
import './App.css';
import { Button, Modal, Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function UserList(props) {
    const { members } = props;
    const [activityPeriod, setActivityPeriod] = useState([]);
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (activity_periods, real_name) => {
        setShow(true);
        setActivityPeriod(activity_periods);
        setName(real_name);
    };
    const [startDate, setStartDate] = useState(new Date());

    const listUsers = members.map(({ real_name, activity_periods }) =>
        <li><Button variant="link" onClick={() => handleShow(activity_periods, real_name)}>{real_name}</Button></li>
    );

    const listStartActivity = activityPeriod.map(({ start_time }) =>
        <tr>{`${start_time}`}</tr>
    );
    const listEndActivity = activityPeriod.map(({ end_time }) =>
        <tr>{`${end_time}`}</tr>
    );

    return (
        <div className="App" class="App-header">
            <h1 class="headerText">Front End : FTL Assignment</h1>
            <h3 class="headerText">By Alvin Ajay</h3>
            <div class="linkUser">
                {listUsers}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Detail: {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                {listStartActivity}
                            </td>
                            <td>
                                {listEndActivity}
                            </td>
                        </tbody>
                    </Table>

                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default UserList;
