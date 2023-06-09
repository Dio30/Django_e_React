import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function Home() {
  const [customers, setcustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const navigate = useNavigate();

  const handleRedirecionar = () => {
    navigate('/create_customer'); 
  };

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:8000/customer/customer_list/?page=${currentPage}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log(response.data.results[0].usuario)
          setcustomers(response.data.results);
          setHasNextPage(response.data.next !== null);
        })
  }

  fetchData();
  },[currentPage]);
  
  return (
    <div className='container'>
      <header>
        {customers.map(customers => (
          <b key={customers.id}>
            {customers.primeiro_nome} {customers.ultimo_nome}
            <button className='btn btn-warning m-1'>Editar</button>
            <button className='btn btn-danger m-1'>Deletar</button>
          </b>
        ))}
        <br></br>
        <br></br>
      <button onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Página anterior
      </button>

      <button onClick={() => setCurrentPage(currentPage + 1)}
      disabled={!hasNextPage}>
        Próxima página
        </button>
        <br></br><br></br>
        <button onClick= {handleRedirecionar} className='btn btn-primary'>Novo</button>
      </header>
    </div>
  );
}

export default Home;