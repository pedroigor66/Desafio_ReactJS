import React from "react";
import api from './services/api';

import "./styles.css";
import { useState, useEffect } from "react";

const { uuid } = require('uuidv4');

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => { //brings repositories from nodejs API
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() { //adds a new repository title
    const response = await api.post('repositories', {
      title: `Repositorio teste ${Date.now()}`,
      id: uuid()
    });

    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
        <li>
          
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
