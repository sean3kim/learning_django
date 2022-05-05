import Header from './components/Header';
import ListProducts from './components/ListProducts';
import AddApparelPage from './pages/AddApparelPage';
import EditApparelPage from './pages/EditApparelPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import TestOrderPage from './pages/TestOrderPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './features/user/userThunks';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [])

  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/products/apparel' element={<ListProducts />} />
          <Route path='/products/apparel/new' element={<AddApparelPage />} />
          <Route path='/products/apparel/edit/:id' element={<EditApparelPage />} />
          <Route path='/products/apparel/:id' element={<ProductPage />} />
          <Route path='/users/login' element={<LoginPage />} />
          <Route path='/users/register' element={<RegisterPage />} />
          <Route path='/orders' element={<TestOrderPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
