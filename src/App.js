import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './UserList.js';
import axios from 'axios';

function App() {

  useEffect(() => {
    axios.get("https://alvin-react-app.herokuapp.com/api/getList").then(({ data }) => {
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
