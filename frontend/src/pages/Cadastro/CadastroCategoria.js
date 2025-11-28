import { useEffect, useState } from "react";

import "./CadastroCategoria.css"

function CadastroCategoria({ categorias, setCategorias }) {
  const [categoriaNome, setCategoriaNome] = useState(""); // Nome da nova categoria

  const getCategorias = async () => {
    try {
      const response = await fetch("http://localhost:4567/categorias");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoriaNome) {
      alert("Por favor, insira o nome da categoria!");
      return;
    }
    const newCategoria = { nome: categoriaNome };

    try {
      const response = await fetch("http://localhost:4567/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoria),
      });

      const data = await response.json();
      console.log("Categoria criada:", data);
      
      setCategorias((prevCategorias) => [...prevCategorias, data]);

      setCategoriaNome("");
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      alert("Erro ao cadastrar a categoria.");
    }
  };

  return (
    <div className="Cadastro-Categoria">
      <h2>Cadastrar Categoria</h2>
      <form onSubmit={handleSubmit} className="Forms-Categoria">
        <label>Nome da Categoria:</label>
        <input
          type="text"
          value={categoriaNome}
          required
          onChange={(e) => setCategoriaNome(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar Categoria</button>
      </form>
    </div>
  );
}

export default CadastroCategoria;
