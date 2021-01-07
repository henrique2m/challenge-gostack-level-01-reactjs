import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function handleRepositories() {
      try {
        const response = await api.get("repositories");
        setRepositories(response.data);
      } catch (error) {
        console.log("Não foi possível obter seus repositórios.");
      }
    }

    handleRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        title: `BugDev - ${Date.now()} `,
        url: "https://github.com/henrique/BugDev",
        techs: ["ReactJS", "Styled-Components"],
      });

      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.log(
        "Não foi possível adicionar um novo repositório, tente novamente."
      );
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const removeItemRepository = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(removeItemRepository);
    } catch (error) {
      console.log("Não foi possível remover o repositório, tente novamente.");
    }
  }

  return (
    <div>
      {repositories.length === 0 && (
        <span>Você ainda não possui repositórios.</span>
      )}
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
