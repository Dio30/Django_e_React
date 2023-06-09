import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const CreateCustomer = () => {
  const [primeiro_nome, setPrimeiroNome] = useState('');
  const [ultimo_nome, setUltimoNome] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
    
  const navigate = useNavigate();
  const handleRedirecionar = () => {
    navigate('/'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      primeiro_nome: primeiro_nome,
      ultimo_nome: ultimo_nome,
    };

    axios.post('http://localhost:8000/customer/customer_new/', newCustomer , {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        alert('Sucesso!!!')
        navigate('/')
      })
      .catch(function(error) {
        console.log(error.response.data)
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError({ non_field_errors: ["Ocorreu um erro. Tente novamente mais tarde."] });
        }
      });
  }
    return (
    <div>
      <h2>Criar novo Customer</h2>
      <div className='error_messages'>
            <b><p>
              {Object.entries(error).map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}
            </p></b>
        </div>
      <form onSubmit={handleSubmit}>
        <label>
          Primeiro Nome:
          <input type="text" value={primeiro_nome} onChange={(e) => setPrimeiroNome(e.target.value)} 
          className='form-control' required/>
        </label>
        <br />
        <br />
        <label>
          Ultimo nome:
          <input type="text" value={ultimo_nome} onChange={(e) => setUltimoNome(e.target.value)} 
          className='form-control' required/>
        </label>
        <br/>
        <br/>
        <button type="submit" className='btn btn-success'>Criar</button>
        <button onClick={handleRedirecionar} className='btn btn-primary m-3'>Voltar</button>
      </form>
    </div>
  )
}

export default CreateCustomer;
