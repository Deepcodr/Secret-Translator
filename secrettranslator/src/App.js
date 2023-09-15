
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Selector from './components/Selector'
import UploadFile from './components/UploadFile';
import NotFound from './components/NotFound';
import Speech from './components/Speech';
// import of preloading

function App() {

  return (
    <div>
         <Router>
           <Routes>
             <Route path='/' exact element={<Home/>} />
             <Route path='/login' exact element={<Login/>} />
             <Route path='/selector' exact element={<Selector />} />
             <Route path='/upload' exact element={<UploadFile/>} />
             <Route path='/speech' exact element={<Speech/>} />
             <Route path='*' exact element={<NotFound/>} />


           </Routes>
         </Router>
   
    </div>
   
  );
}

export default App;
