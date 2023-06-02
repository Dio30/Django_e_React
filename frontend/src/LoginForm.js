import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Home from './HomePage'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(true);
    }
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
      setUsername('');
      setPassword('');
      setError('');
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/usuarios/register/",
      {
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "/usuarios/login/",
        {
          username: username,
          password: password
        }
      ).then(function(res) {
        localStorage.setItem('token', res.data.token);
        setCurrentUser(true);
      })
    })
    .catch(function(error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ non_field_errors: ["Ocorreu um erro. Tente novamente mais tarde."] });
      }
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/usuarios/login/",
      {
        username: username,
        password: password
      }
    ).then(function(res) {
      localStorage.setItem('token', res.data.token);
      setCurrentUser(true);
    })

     .catch(function(error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError({ non_field_errors: ["Ocorreu um erro. Tente novamente mais tarde."] });
        }
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/usuarios/logout/",
      {withCredentials: true}
    ).then(function(res) {
      localStorage.removeItem('token')
      setCurrentUser(false);
      setUsername('');
      setPassword('');
      setError('');
    });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className='text-center'>
            <br></br>
            <Home/>
          </div>
        </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Django & React</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="m-3">
          <h2 className='text-center'>Registrar</h2>
          <div className='error_messages'>
            <p>
              {Object.entries(error).map(([key, value]) => (
                <b key={key}>{value}</b>
              ))}
            </p>
          </div>
          <Container>
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Novo Usuario</Form.Label>
              <Form.Control type="text" required placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" required placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrar
            </Button>
          </Form>
          </Container>
        </div>        
      ) : (

        <div className="m-3">
          <h2 className='text-center'>Login</h2>
          <div className='error_messages'>
            <p>
              {Object.entries(error).map(([key, value]) => (
                <b key={key}>{value}</b>
              ))}
            </p>
          </div>
          <Container>
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-4">
              <Form.Control type="name" required placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control required type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
          </Container>
        </div>
      )
    }
    </div>
  );
}

export default App;