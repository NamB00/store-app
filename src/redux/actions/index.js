export const addCart = (product) => {
	return {
		type: 'ADD_ITEM',
		payload: product,
	};
};

export const delCart = (product) => {
	return {
		type: 'DELI_ITEM',
		payload: product,
	};
};

export const trashCart = (product) => {
	return {
		type: 'TRASH_ITEM',
		payload: product,
	};
};

export const cartControl = (product) => {
	return {
		type: 'CART_CONTROL',
		payload: product,
	};
};

export const cartCheckOut = (product) => {
	return {
		type: 'CART_CHECKOUT',
		payload: product,
	};
};

export const cartHistories = (product) => {
	return {
		type: 'CART_HISTORIES',
		payload: product,
	};
};
