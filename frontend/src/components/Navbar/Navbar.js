import {Link} from 'react-router-dom';
//import './Navbar.css'

function Navbar ({onLogout}){
    return(
        <nav className='navbar'>
            <h2>Agenda</h2>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/cadastro/produto'>Cadastrar Produto</Link></li>
                <li><Link to='/cadastro/categoria'>Cadastrar Categoria</Link></li>
                <li><Link to='/lista/produtos'>Listar Contatos</Link></li>
                <li><Link to='/lista/categorias'>Listar Categorias</Link></li>
                <button onClick={onLogout}>Sair</button>
            </ul>
        </nav>
    )
}
export default Navbar;