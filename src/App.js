import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]); //repos saved in repositories

  useEffect(() => { //brings repositories from nodejs API
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() { //adds a new repository title
    const response = await api.post('repositories', {
      title: `Repositorio teste ${Date.now()}`,
      url: 'https://github.com/pedroigor66/desafio_node',
      techs: ['Node.js', 'ReactJS'] //id?
    });

    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    )) //keeps the repos with diff id compared to the removed one
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
                <li key={repository.id}>
                  {repository.title}
        
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>    
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
