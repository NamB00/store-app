import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/detailpages/Header';
import HomePage from './components/pages/HomePage';
import CartPage from './components/pages/CartPage';
import ProductsPage from './components/pages/ProductsPage';
import SignUpPage from './components/pages/SignUpPage';
import 'react-toastify/dist/ReactToastify.css';
import User from './components/pages/User';
import SignInPage from './components/pages/SignInPage';
import { useAuth } from './contexts/auth-context';
import 'react-loading-skeleton/dist/skeleton.css';
import Review from './components/pages/Review';

function App() {
	const { pathname } = useLocation();
	const { property, purchase } = useAuth();
	return (
		<div>
			{pathname !== '/sign-in' ? <Header state={property} /> : ''}
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
				<Route path='/sign-up' element={<SignUpPage />}></Route>
				<Route path='/reviews' element={<Review />}></Route>
				<Route path='/products/:id' element={<ProductsPage />}></Route>
				<Route path='/carts' element={<CartPage />}></Route>
				<Route path='/users' element={<User />}></Route>
				<Route path='/sign-in' element={<SignInPage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
