import {useEffect, useState} from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function Home() {
  const [customers, setcustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:8000/customer/customer_list/?page=${currentPage}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log(response.data.results);
          setcustomers(response.data.results);
          setHasNextPage(response.data.next !== null);
        })
  }

  fetchData();
  },[currentPage]);
  
  return (
    <div className="App">
      <header className="App-header">
        {customers.map(customers => (
          <b key={customers.id}>
            {customers.primeiro_nome} {customers.ultimo_nome}
          </b>
        ))}
        <br></br>
        <br></br>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Página anterior
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)}
      disabled={!hasNextPage}>
        Próxima página
        </button>
      </header>
    
    </div>
  
  );
}

export default Home;