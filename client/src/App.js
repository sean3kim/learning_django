import Header from './components/Header';
import ListProducts from './components/ListProducts';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import GetAdminAuth from './authentication/GetAdminAuth';
import NoPermissions from './pages/NoPermissions';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Layout from './components/Layout';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './features/user/userThunks';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/Styles';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLoginStatus());
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Layout>
            <Header/>
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/products' element={<ListProducts />} />
              <Route path='/products/new' element={
                <GetAdminAuth redirectTo='/noauth'>
                  <AddProductPage />
                </GetAdminAuth>
              } />
              <Route path='/products/edit/:id' element={<EditProductPage />} />
              <Route path='/products/:id' element={<ProductPage />} />
              <Route path='/users/login' element={<LoginPage />} />
              <Route path='/users/register' element={<RegisterPage />} />
              <Route path='/orders' element={<CartPage />} />
              <Route path='/noauth' element={<NoPermissions />} />
              <Route path='/checkout' element={<CheckoutPage />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
