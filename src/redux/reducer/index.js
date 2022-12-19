import { combineReducers } from 'redux';
import handleCart from './handleCart';
import productsReducer from './products/products.reducerAPI';

const rootReducer = () =>
	combineReducers({
		handleCart: handleCart,
		products: productsReducer,
	});

export default rootReducer;
