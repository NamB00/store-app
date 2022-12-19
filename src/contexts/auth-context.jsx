import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth, db } from '../firebase-app/firebase-config';

const AuthContext = createContext();

function AuthProvider(props) {
	const [userInfo, setUserInfo] = useState({});
	const [property, setProperty] = useState([]);
	const [purchase, setPurchase] = useState([]);
	const [dataUser, setdataUser] = useState([]);
	const [IdCollection, setIdCollection] = useState('');
	const value = {
		userInfo,
		setUserInfo,
		setProperty,
		setPurchase,
		property,
		purchase,
		dataUser,
		IdCollection,
	};
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUserInfo(user);
		});
		//
		async function getData() {
			let result = [];
			const colRef = collection(db, 'users');
			onSnapshot(colRef, (snapshot) => {
				snapshot.forEach((doc) => {
					result.push({
						id: doc.id,
						...doc.data(),
					});
				});
				result.map((item) => {
					if (!item.email) return;
					if (item.email === userInfo?.email) {
						//state 0
						setdataUser(item);
						//sate 1
						if (!item.product) {
							setProperty([]);
						}
						if (item.product) {
							const propertyValues = Object.values(item.product);
							setProperty(propertyValues);
						}
						// handleControlCart(propertyValues);
						setIdCollection(item.id);
						//sate 2
						if (!item.purchase) {
							setPurchase([]);
						} else {
							const propertyValues2 = Object.values(item?.purchase);

							// setHistories(propertyValues2);
							setPurchase(propertyValues2);
						}
					}
				});
			});
		}
		getData();
	}, [userInfo]);
	return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
	const context = useContext(AuthContext);
	if (typeof context === 'undefined')
		throw new Error('useAuth must be used within AuthProvider');
	return context;
}

export { AuthProvider, useAuth };
