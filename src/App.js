import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Request from './components/request';
import Order from './components/order';
import Price from './components/prices';
import Check from './components/check';
import Trash from './components/trash';
import Login from './components/login';
import Nav from "./components/navbarcom";
import CreateLog from './components/createLog';
import ForgotPassword from './components/forgotPassword';
import NewCredential from './components/newCredential';
import PasswordUpdate from './components/passwordUpdate';
import Test from "./components/test";
import CreateUser from './components/CreateUser';
import ItemList from './components/ItemList';
import EditUser from './components/EditUser';
import EditNotCheck from './components/EditNotCheck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nav" element={<Nav/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/createLog" element={<CreateLog/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/newCredential" element={<NewCredential/>} />
        <Route path="/passwordUpdate" element={<PasswordUpdate/>} />
        <Route path="/order/user/create" element={<CreateUser />} />
        <Route path="/itemList" element={<ItemList />} />
        {/* Update the route for editing user */}
        <Route path="/user/:id/edit" element={<EditUser />} />
        <Route path="/check_received/:id/edit" element={<EditNotCheck />} />

        {/* Use dynamic segment :id to capture the user ID */}
        <Route path='/' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/prices" element={<Price />} />
        <Route path="/request" element={<Request />} />
        <Route path="/check" element={<Check />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
