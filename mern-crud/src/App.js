import logo from './logo.svg';
import './App.css';
import CreateUser from './CreateUser.js';
import ShowUser from './ShowUser.js';
import EditUser from './EditUser.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
	<BrowserRouter>	
		<Routes>
			<Route path = '/' element = {<CreateUser/>}/>	
			<Route path = '/show' element = {<ShowUser/>}/>
			<Route path = '/update/:id' element = {<EditUser/>}/>
		</Routes>
	</BrowserRouter>
  );
}

export default App;
