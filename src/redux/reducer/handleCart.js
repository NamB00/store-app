import { updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase-app/firebase-config';
const initialSate = [];
let IdUser = '';
let EmailUser = '';
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
	if (user) {
		const uid = user.uid;
		IdUser = uid;
		EmailUser = user.email;
	}
});

const handleUploadProduct = async (product, IdCollection) => {
	const colRef = doc(db, 'users', IdCollection);
	await updateDoc(colRef, {
		product: {
			...product,
		},
	});
};

const handleDeleteProduct = async (product, IdCollection) => {
	const colRef = doc(db, 'users', IdCollection);
	await updateDoc(colRef, {
		product,
	});
};

const handleCheckOut = async (IdCollection, histories, data) => {
	const colRef = doc(db, 'users', IdCollection);
	await updateDoc(colRef, {
		purchase: { ...histories },
		address: data,
		product: {},
	});
};
const handleCart = (state = initialSate, action) => {
	// fire base
	const product = action.payload;
	switch (action.type) {
		case 'ADD_ITEM':
			const { property } = action.payload;
			const exist = property.find((x) => x.productId == product.productId);
			// const exist = state.find((x) => x.productId == product.productId);
			if (exist) {
				const { count, IdCollection } = action.payload;
				const abc = property.map((x) =>
					x.productId === product.productId
						? { ...x, qty: x.qty + count, userId: IdUser }
						: x
				);
				handleUploadProduct(abc, IdCollection);
				console.log('run true');
				return abc;
			} else {
				const { count, IdCollection, property } = action.payload;
				delete product.property;
				product.date = new Date().toLocaleString('en-US');
				const abc = [...property, { ...product, qty: count }];
				//fix here
				handleUploadProduct(abc, IdCollection);
				console.log('run false');
				return abc;
			}
		case 'DELI_ITEM':
			const exist1 = state.find((x) => x.productId === product.productId);
			if (exist1?.qty === 1) {
				const { IdCollection } = action.payload;
				const abc = state.filter((x) => x.productId !== exist1.productId);
				handleDeleteProduct(abc, IdCollection);
				return abc;
			} else {
				const { IdCollection } = action.payload;
				const abc = state.map((x) =>
					x.productId === product.productId ? { ...x, qty: x.qty - 1 } : x
				);
				handleDeleteProduct(abc, IdCollection);
				return abc;
			}
		case 'TRASH_ITEM':
			const { IdCollection } = action.payload;
			const exist4 = state.find((x) => x.productId === product.productId);
			if (exist4) {
				const abc = state.filter((x) => x.productId !== exist4.productId);
				handleDeleteProduct(abc, IdCollection);
				return abc;
			}
		case 'CART_CONTROL':
			const abc = action.payload;
			return (state = abc);
		case 'CART_CHECKOUT':
			const def = action.payload;
			if (def) {
				const { data, cart, abc } = def;
				const IdCollection = cart[0]?.IdCollection;
				handleCheckOut(IdCollection, abc, data);
				return cart;
			}
		default:
			return state;
	}
};
export default handleCart;
