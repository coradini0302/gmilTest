import './App.css';
import Home from './Components/Home';
import Clientes from './Components/Clientes';
import Sobre from './Components/Sobre';
import {BrowserRouter, Link , Route, Routes} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Nav variant='tabs'>
        <Nav.Link as={Link} to='/'>Página Inicial</Nav.Link>
        <Nav.Link as={Link} to='/clientes'>Clientes</Nav.Link>
        <Nav.Link as={Link} to='/sobre'>Sobre</Nav.Link>

      </Nav>
      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/clientes' element={<Clientes/>}></Route>
        <Route path='/sobre' element={<Sobre/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
