// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LoginPage from './LoginForm';


function App() {
    axios.defaults.headers.common['Authorization'] = null;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;