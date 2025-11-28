import { useEffect, useState } from "react";

import './CadastroProduto.css'
function CadastroProduto({produtos, setProdutos}){
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [produtoNome, setProdutoNome] = useState("");
    const [precoProduto, setPrecoProduto] = useState(0);
    const [estoqueProduto, setEstoqueProduto] = useState(0);

    const getCategorias = async () => {
    try {
      const response = await fetch("http://localhost:4567/categorias");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("ERRO: Erro na busca de Usuarios ", error )
    }
  };

    useEffect(() => {
        getCategorias();
    }, []);

    const handleCategoria = (event) => {
        const selectedId = event.target.value;  // Captura o ID selecionado
        const selectedName = event.target.options[event.target.selectedIndex].text;  // Captura o nome da categoria

        // Atualiza o estado com o ID e nome da categoria selecionada
        const selectedCategory = { id: selectedId, nome: selectedName };

        console.log("Categoria Selecionada: ", selectedCategory);  // Verifique a estrutura do objeto

        setCategoriaSelecionada(selectedCategory);
    };

    const handleSubmit = (e) => {
        console.log("SUBMITADO");
        e.preventDefault();
        const newProduto = {produtoNome, precoProduto, estoqueProduto, categoriaSelecionada};
        setProdutos(newProduto);
        addProduto();
        setProdutoNome("");
        setPrecoProduto(0);
        setEstoqueProduto(0);
        setCategoriaSelecionada("");
    }

    const addProduto = async () => {
        try {
            console.log({
                nome: produtoNome,
                preco: precoProduto,
                estoque: estoqueProduto,
                categoria: categoriaSelecionada, 
            });
            const response = await fetch("http://localhost:4567/produtos",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    "nome" : produtoNome,
                    "preco" : precoProduto,
                    "estoque" : estoqueProduto,
                    "categoria" : categoriaSelecionada
                })
            });
            const data = await response.json();
            console.log("Produto Cadastrado criado!!", data)
            setProdutos(data);
        } catch(error) {
            console.error("Error: ao adicionar", error)
            alert("O produto nao foi cadastrado.")
        }
    }
    return(
        <div className="Cadastro-Produto">
            <h2>Cadastrar Produto</h2>
            <form onSubmit={handleSubmit} className="Forms-Produto">
                <label>Nome do Produto:</label>
                <input type="text" value={produtoNome} required onChange={(e) => setProdutoNome(e.target.value)}/>
                <br/>
                <label>Preço do Produto:</label>
                <input value={precoProduto} required onChange={(e) => setPrecoProduto(e.target.value)}/>
                <br/>
                <label>Estoque:</label>
                <input type="number" value={estoqueProduto} required onChange={(e) => setEstoqueProduto(e.target.value)}/>
                <br/>
                <label>Categoria</label>
                <select required onChange={(e) => handleCategoria(e)}>
                    <option value="">Selecione uma Categoria</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>
                        {cat.nome}
                        </option>
                     ))}
                </select>
                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    )
}
export default CadastroProduto;