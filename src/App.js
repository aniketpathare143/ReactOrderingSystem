import logo from './logo.svg';
import './App.css';
import DataComponent from './Components/DataComponent';
import OrderDetails from './Components/OrderDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddOrder from './Components/AddOrder';
import LoginComponent from './Components/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<DataComponent />} /> */}

          <Route exact path="/" element={<LoginComponent />} />
          <Route path="/LoginComponent" element={<LoginComponent />}></Route>

          <Route path="OrderDetails/:id" element={<OrderDetails />} />
          <Route path="/DataComponent" element={<DataComponent />}></Route>
          <Route path="/AddOrder" element={<AddOrder />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
