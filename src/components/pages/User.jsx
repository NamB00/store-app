import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { auth, db } from '../../firebase-app/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { cartControl } from '../../redux/actions';

const User = () => {
	const [icludes, setIcludes] = useState(false);
	const navigate = useNavigate();
	const { userInfo, setProperty, dataUser, purchase, setPurchase } = useAuth();
	const [data, setData] = useState([]);

	const dispatch = useDispatch();
	const handleControlCart = (cart) => {
		dispatch(cartControl(cart));
	};
	useEffect(() => {
		if (userInfo && Object.keys(userInfo).length > 0) {
			setIcludes(true);
		} else {
			setIcludes(false);
		}
		if (purchase) {
			setData(purchase);
		}
	}, [userInfo, purchase]);
	const handleSignOut = () => {
		// signOut(auth);
		// handleControlCart([]);
		// setProperty([]);
		// setPurchase([]);
		// navigate('/products/1');
		Swal.fire({
			title: 'Are you sure?',
			text: 'Sign Out',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Yes',
		}).then(async (result) => {
			if (result.isConfirmed) {
				signOut(auth);
				handleControlCart([]);
				setProperty([]);
				setPurchase([]);
				navigate('/');
			}
		});
	};
	const handleSignUp = () => {
		handleControlCart([]);
		setProperty([]);
		setPurchase([]);
		console.log('ok');
	};
	return (
		<div className='container h-auto mx-auto overflow-hidden bg-transparent rounded-lg xl:px-48'>
			{icludes ? (
				<>
					<div className='grid h-full gap-4 pt-5 xs:grid-cols-12 auto-rows-min'>
						<div className='w-full p-5 bg-white rounded-lg shadow-lg'>
							<div className='flex'>
								<div className='lg:col-span-4'>
									<img
										src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
										alt=''
										className='rounded-full w-28 h-28'
									/>
								</div>
								<div className='pl-10 lg:col-span-8'>
									<h2>
										<span className='font-medium'>Name:</span>{' '}
										{userInfo.displayName}
									</h2>
									<h2>
										<span className='font-medium'>Email:</span> {userInfo.email}
									</h2>
									<h2>
										<span className='font-medium'>Address:</span>{' '}
										{dataUser?.address ? dataUser.address.address : 'none'}
									</h2>
									<h2>
										<span className='font-medium'>City:</span>{' '}
										{dataUser?.address ? dataUser.address.city : 'none'}
									</h2>
									<h2>
										<span className='font-medium'>Country:</span>{' '}
										{dataUser?.address ? dataUser.address.country : 'none'}
									</h2>
									<h2>
										<span className='font-medium'>Creation time: </span>
										{userInfo.metadata.creationTime}
									</h2>
									<button
										type='button'
										onClick={handleSignOut}
										className='flex items-center justify-center w-24 p-1 mx-auto mt-5 font-medium text-white bg-red-400 rounded-lg'
									>
										Sign Out
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='grid h-full gap-4 pt-5 mb-5 xs:grid-cols-12 auto-rows-min'>
						<div className='w-full p-5 bg-white rounded-lg shadow-lg'>
							<div className='flex'>
								<div className='lg:col-span-4'>
									<h2>
										<span className='font-medium'>Purchase history:</span>
									</h2>
								</div>
							</div>
						</div>
						{data &&
							data.length > 0 &&
							data.reverse().map((items, index) => (
								<div
									key={index}
									className='w-full p-4 bg-white rounded-lg shadow-lg'
								>
									<div className='mb-3'>
										Date:{' '}
										{dataUser?.purchase
											? dataUser.purchase[index][0]?.date
											: ''}
									</div>
									{items.map((item, index) => (
										<div key={index} className='flex mb-2 text-sm font-normal'>
											<img
												src={item.imageUrl}
												alt=''
												className='w-10 mr-2 rounded-md'
											/>
											<h4 className='mr-2'>{item.productName}</h4>
											<h4 className='mr-2'>${item.price}</h4>
											<h4>({item.qty})</h4>
										</div>
									))}
								</div>
							))}
					</div>
				</>
			) : (
				<div className='grid h-full gap-4 pt-5 auto-rows-min'>
					<div className='flex items-center justify-center w-full p-5 text-center bg-white rounded-lg shadow-lg'>
						<h1 className='font-medium'>PLEASE LOGIN TO YOUR ACCOUNT</h1>
					</div>
					<div className='flex items-center justify-center w-full p-5 mx-auto text-center bg-white rounded-lg shadow-lg'>
						<Link
							to='/sign-up'
							className='mx-auto bg-red-400 text-white font-medium w-[170px] p-3 rounded-lg'
							onClick={handleSignUp}
						>
							Create Account
						</Link>
						<Link
							to='/sign-in'
							className='mx-auto bg-[#0ab9dd] text-white w-[170px] font-medium p-3 rounded-lg'
						>
							Login
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
