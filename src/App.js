import logo from './logo.svg';
import './App.css';
import DataComponent from './DataComponent';
import OrderDetails from './OrderDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddOrder from './AddOrder';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<DataComponent />} />
          <Route path="OrderDetails/:id" element={<OrderDetails />} />
          <Route path="DataComponent" element={<DataComponent />}></Route>
          <Route path="AddOrder" element={<AddOrder />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
