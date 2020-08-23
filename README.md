# React Modal with Data fetched from API
# View the [demo](https://alvin-react-app.herokuapp.com/)
## Introduction
This React app demonstrates a user interface that allows a user to view a list of hardcoded users from a mock API server. On clicking on any user, a modal should open which displays
all the time ranges during which they were active on that day, with an option to view all the periods of activity for different days using a calendar.

## Click [here](#running-this-on-your-machine) to see skip directly to running this on your machine

## Prerequisites
In order to run this project node.js and npm both need to have been installed.

## Built With
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)

## Steps:
Create a directory first, `cd` into and initialize with npm:
```cli
npm init -y
```
Install the express package:

``` cli
npm add express
```
Create a file named *index.js* and enter the following code, this will serve as a most basic express app.
```javascript
const express = require('express');
const path = require('path');
const list = require('./Test JSON.json')
const app = express();
const cors = require('cors');

app.use(cors());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    res.json(list);
    console.log('Sent list of items');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
```
We call express() in order to create our express application, denoted by the object app. We then create a method to handle a GET request for */api/getList* that will send a json response with a list of items. We will call this from our React app later.

Add a script in *package.json* so that the app is started once placed on the appropriate server. I normally launch my example projects on Heroku.

```json
{
	"name": "ftl-assignment",
	"version": "0.1.0",
	"private": true,
	"dependencies": {
		"@testing-library/jest-dom": "^4.2.4",
		"@testing-library/react": "^9.5.0",
		"@testing-library/user-event": "^7.2.1",
		"axios": "^0.20.0",
		"bootstrap": "^4.5.2",
		"cors": "^2.8.5",
		"express": "^4.17.1",
		"react": "^16.13.1",
		"react-bootstrap": "^1.3.0",
		"react-datepicker": "^3.1.3",
		"react-dom": "^16.13.1",
		"react-scripts": "3.4.3"
	},
	"scripts": {
		"start": "node index.js",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject",
		"heroku-postbuild": "npm install --only=dev && npm install && npm run build"
	},
	"proxy": "http://localhost:5000",
	"eslintConfig": {
		"extends": "react-app"
	},
	"browserslist": {
		"production": [ ">0.2%", "not dead", "not op_mini all" ],
		"development": [ "last 1 chrome version", "last 1 firefox version", "last 1 safari version" ]
	}
}
```
In the *package.json*, change the proxy *http://localhost:5000* to your server url after you are done testing locally
```json
 "proxy": "your-server-url-here"
```
We also use a *heroku-postbuild* command in our *package.json*
```json
 "heroku-postbuild": "npm install --only=dev && npm install && npm run build"
```
Heroku will now enter the client directory and create the production build of the React app for us.<br>

**Run npm start and go to http://localhost:5000/api/getList to check our JSON file being read in the express "index.js"**

## Create React App

If you do not already have Create-React-App installed run the following line of code to install it globally:
```cli
npm install -g create-react-app
```
After installtion, run this in your project folder:
```cli
create-react-app
```
The basic React app is now be visible at http://localhost:3000/ after running npm start from within the client folder.

This is where our previous proxy command comes in for the *package.json* for our React app to proxy API requests to the Express app we have created above, we will need to make a change to */package.json*. This is done by adding the line "proxy": "http://localhost:5000"

## Calling our Express App

We will use [Axios](https://www.npmjs.com/package/axios) npm package to help make requests.

In *src/App.js*, paste the following:

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './UserList.js';
import axios from 'axios';

function App() {

  useEffect(() => {
    axios.get("http://localhost:5000/api/getList").then(({ data }) => {
      console.log(data);
      if (data.ok)
        setMembers(data.members);
    })
  }, [])

  const [members, setMembers] = useState([])

  return (
    <UserList members={members} />
  );
}

export default App;
```
Make another file called *UserList.js*, this will be our component from where we will be using our Modal and export it to *App.js* and paste this in:

```javascript
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
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{activityPeriod.map(({ start_time }) => <p>{` ${start_time} `}</p>)}</td>
                                <td>{activityPeriod.map(({ end_time }) => <p>{` ${end_time} `}</p>)}</td>
                            </tr>
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
```

We grab the [Modals](https://react-bootstrap.github.io/components/modal/) from React Bootstrap and put our data in tables. And then later export everything.
I also added the [React DatePicker](https://www.npmjs.com/package/react-datepicker) in the modal.

## To do in future:
- parse Date from String in JSON properly and feed into calendar to set date and view activities.

## Running this on your machine
1. Clone this repo
2. Run 'npm install' to install dependencies.
3. Run npm start from ftl-assignment to start the Express app
4. Run npm run build from another terminal to start the React app
5. Visit http://localhost:5000/ to check out the app or http://localhost:5000/api/getList to view the JSON object.




