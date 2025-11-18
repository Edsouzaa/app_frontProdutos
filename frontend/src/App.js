import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
//import './App.css';

import Navbar from "./components/Navbar/Navbar";

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import CadastroCategoria from './pages/Cadastro/CadastroCategoria';
import CadastroProduto from './pages/Cadastro/CadastroProduto';
import ListaCategorias from './pages/Lista/ListaCategorias';
import ListaProdutos from './pages/Lista/ListaProdutos';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === "123") {
      setIsAuthenticated(true);
    } else {
      alert("Usuario ou Senha incorretos.");
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout}/>}
      <Routes>
        <Route path='/login' element={isAuthenticated ? (<Navigate to="/"/>) : (<Login onLogin={handleLogin}/>)}/>
        <Route path = "/" element = {isAuthenticated ? (<Home/>) : (<Navigate to="/login"/>)} />
        <Route path = "/cadastro/categoria" element = {isAuthenticated ? (<CadastroCategoria categorias={categorias} setCategorias={setCategorias}/>) : (<Navigate to="/login"/>)}/>
        <Route path = "/cadastro/produto" element = {isAuthenticated ? (<CadastroProduto produtos={produtos} setProdutos={setProdutos}/>) : (<Navigate to="/login"/>)}/>
        <Route path = "/lista/produtos" element = {isAuthenticated ? (<ListaProdutos produtos={produtos} setProdutos={setProdutos} />) : (<Navigate to="/login"/>)}/>
        <Route path = "/lista/categorias" element = {isAuthenticated ? (<ListaCategorias categorias={categorias} setCategorias={setCategorias} />) : (<Navigate to="/login"/>)}/>
      </Routes>
    </Router>
  );
}

export default App;
