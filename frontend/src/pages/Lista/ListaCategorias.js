import { useState, useEffect } from "react";
import "./ListaCategorias.css"
function ListaCategorias({ categorias, setCategorias }) {
  const [nomeEditando, setNomeEditando] = useState("");
  const [categoriaEditandoId, setCategoriaEditandoId] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4567/categorias/${id}`, {
        method: "DELETE",
      });
      
      if (response.status === 200) {
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
        console.log("Categoria deletada com sucesso");
      } else {
        alert("Categoria não pode ser deletada pois há um produto atribuido a ela.");
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      alert("Erro ao tentar excluir a categoria.");
    }
  };

  const handleEdit = (categoria) => {
    setCategoriaEditandoId(categoria.id);
    setNomeEditando(categoria.nome);
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`http://localhost:4567/categorias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeEditando,
        }),
      });

      const data = await response.json();
      console.log("Categoria atualizada:", data);

      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === id
            ? { ...categoria, nome: nomeEditando }
            : categoria
        )
      );

      setCategoriaEditandoId(null);
      setNomeEditando("");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      alert("Erro ao tentar atualizar a categoria.");
    }
  };

  return (
    <div className="container-Categorias">
      <h2 className="TituloListagem">Lista de Categorias</h2>

      {categorias.length === 0 ? (
        <p className="SemRegistro">Nenhuma categoria cadastrada.</p>
      ) : (
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              {categoriaEditandoId === categoria.id ? (
                <div className="edit-card">
                  <input
                    type="text"
                    value={nomeEditando}
                    onChange={(e) => setNomeEditando(e.target.value)}
                  />
                  <button onClick={() => handleSave(categoria.id)}>
                    Salvar
                  </button>
                  <button onClick={() => setCategoriaEditandoId(null)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div>
                  <p>{categoria.nome}</p>
                  <button onClick={() => handleEdit(categoria)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(categoria.id)}>
                    Deletar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCategorias;
