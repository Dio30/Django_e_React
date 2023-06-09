// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './LoginForm';
import CreateCustomer from './create_customer';


function App() {
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/create_customer" element={<CreateCustomer/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;