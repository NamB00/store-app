import actionTypes from '../../actions/productsAPI/productsTypesAPI';

const initialStates = {
	isLoading: false,
	products: null,
	errorMessage: null,
};

const productsReducer = (state = initialStates, { type, payload }) => {
	switch (type) {
		case actionTypes.PRODUCT_LOAD_START:
			return {
				...state,
				isLoading: true,
				products: null,
				errorMessage: null,
			};
		case actionTypes.PRODUCT_LOAD_SUCCESS:
			return {
				...state,
				isLoading: false,
				products: payload,
			};
		case actionTypes.PRODUCT_LOAD_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessage: payload,
			};
		default:
			return state;
	}
};

export default productsReducer;
