import productsTypesAPI from './productsTypesAPI';

const productLoadStart = () => ({
	type: productsTypesAPI.PRODUCT_LOAD_START,
});

const productLoadSuccess = (products) => ({
	type: productsTypesAPI.PRODUCT_LOAD_SUCCESS,
	payload: products,
});

const productLoadError = (errorMessage) => ({
	type: productsTypesAPI.PRODUCT_LOAD_ERROR,
	payload: errorMessage,
});

export default {
	productLoadStart,
	productLoadSuccess,
	productLoadError,
};
