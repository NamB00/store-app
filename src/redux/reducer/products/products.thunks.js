import productsService from '../../api/services/products.service';
import actions from '../../actions/productsAPI/products.action';

export const loadUsersAsync = () => (dispatch) => {
	dispatch(actions.productLoadStart());

	productsService
		.getAllProducts()
		.then((response) => dispatch(actions.productLoadSuccess(response.data)))
		.catch((error) => dispatch(actions.productLoadError(error.message)));
};
