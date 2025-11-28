import { useEffect, useState } from "react";
import "./ListaProdutos.css"

function ListaProdutos({ produtos, setProdutos }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState();
  const [novoEstoque, setNovoEstoque] = useState();
  const [editingId, setEditingId] = useState(null);

  const getCategorias = async () => {
    try {
      const response = await fetch("http://localhost:4567/categorias");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("ERRO: Erro na busca de Categorias", error);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const handleCategoria = (event) => {
    const selectedId = event.target.value; // Captura o ID selecionado
    const selectedName = event.target.options[event.target.selectedIndex].text; // Captura o nome da categoria

    // Atualiza o estado com o ID e nome da categoria selecionada
    const selectedCategory = { id: selectedId, nome: selectedName };

    console.log("Categoria Selecionada: ", selectedCategory); // Verifique a estrutura do objeto

    setCategoriaSelecionada(selectedCategory);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4567/produtos/${id}`, {
        method: "DELETE",
      });
      if (response.status !== 404) {
        console.log("Produto removido com sucesso");
        // Atualizar lista de produtos localmente
        setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== id));
      } else {
        console.log("ID do produto inexistente");
      }
    } catch (error) {
      console.error("Erro ao remover o produto", error);
    }
  };

  const handleEdit = (produto) => {
    setEditingId(produto.id);
    setNovoNome(produto.nome);
    setNovoEstoque(produto.estoque);
    setNovoPreco(produto.preco);
    setCategoriaSelecionada(produto.categoria);
  };

  const handleSave = async (id) => {
    try {
      // Atualiza o estado local de produtos
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id === id
            ? { ...produto, nome: novoNome, preco: novoPreco, estoque: novoEstoque, categoria: categoriaSelecionada }
            : produto
        )
      );

      // Envia a atualização para o servidor
      const response = await fetch(`http://localhost:4567/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          nome: novoNome,
          preco: novoPreco,
          estoque: novoEstoque,
          categoria: categoriaSelecionada,
        }),
      });
      const data = await response.json();
      console.log("Produto atualizado:", data);
    } catch (error) {
      console.error("Erro ao atualizar o produto", error);
    }
    setEditingId(null);
  };

  return (
    <div className="container-Produtos">
      <h2 className="TituloListagem">Produtos</h2>
      {produtos.length === 0 ? (
        <p className="SemRegistro">Nenhum Produto Registrado</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              {editingId === produto.id ? (
                <div className="edit-card">
                  <span className="Nome-Produto">Nome:</span>
                  <input type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
                  <br />
                  <span className="Categoria-Produto">Categoria:</span>
                  <select onChange={(e) => handleCategoria(e)} value={categoriaSelecionada.id}>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                  <br />
                  <span className="Preco-Produto">Preço:</span>
                  <input type="number" value={novoPreco} onChange={(e) => setNovoPreco(e.target.value)} />
                  <br />
                  <span className="Estoque-Produto">Estoque:</span>
                  <input type="number" value={novoEstoque} onChange={(e) => setNovoEstoque(e.target.value)} />
                  <br />
                  <button onClick={() => handleSave(produto.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </div>
              ) : (
                <>
                  <p className="Nome-Produto">Nome: {produto.nome}</p>
                  <p className="Categoria-Produto">Categoria: {produto.categoria.nome}</p>
                  <p className="Preco-Produto">Preço: {produto.preco}</p>
                  <p className="Estoque-Produto">Estoque: {produto.estoque}</p>
                  <button onClick={() => handleEdit(produto)}>Editar</button>
                  <button onClick={() => handleDelete(produto.id)}>Deletar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaProdutos;
