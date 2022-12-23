import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../contexts/auth-context';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
	addCart,
	cartCheckOut,
	cartControl,
	delCart,
	trashCart,
} from '../../redux/actions';

const CartPage = () => {
	document.title = 'Cart Page';
	const [checkout, setCheckout] = useState(false);
	const [cart, setCart] = useState([]);
	const [histories, setHistories] = useState([]);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { userInfo, property, purchase } = useAuth();

	const state = useSelector((state) => {
		return state.handleCart;
	});

	let count = 0;
	if (state) {
		state.map((item) => {
			count += item.price * item.qty;
			// fix dua cart vao redux
		});
	}
	let shipping = 0;
	if (count > 0) {
		shipping = 5;
	}

	useEffect(() => {
		if (!property) return;
		else {
			handleControlCart(property);
			setHistories(purchase);
		}
	}, [purchase]);

	const addProduct = (product) => {
		dispatch(addCart(product));
	};
	const deleProduct = (product) => {
		dispatch(delCart(product));
	};
	const trashProduct = (product) => {
		dispatch(trashCart(product));
	};
	const handleControlCart = (cart) => {
		dispatch(cartControl(cart));
		setCart(cart);
	};
	const handleCheckOut = () => {
		if (count <= 0) return;
		setCheckout(true);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const date = new Date().toLocaleString('en-US');
		const data = Object.fromEntries(new FormData(e.target).entries());
		let abc = histories;
		abc.push(state);
		dispatch(cartCheckOut({ data, cart, abc }));
		setCheckout(false);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'order successfully!!',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<div className='container grid h-auto grid-cols-12 gap-4 mx-auto overflow-hidden bg-transparent rounded-lg xl:px-48'>
			<div className='col-span-12 mt-4'>
				<div className='w-full p-3 bg-white rounded-lg shadow-lg'>
					<div className='w-full font-semibold text-center'>
						My Shopping Cart
					</div>
				</div>
			</div>
			<div className='h-full col-span-12 gap-4 pt-5 mb-4 lg:col-span-8 auto-rows-min'>
				{/* coppy */}
				{state &&
					state.length > 0 &&
					state.map((item, index) => (
						<div className='mb-4 overflow-auto lg:col-span-8' key={index}>
							<div className='grid grid-cols-12'>
								<div className='col-span-12 bg-white rounded-lg'>
									<div className='flex'>
										<div className='grid gap-4 girds-col-5'>
											<img
												src={item.imageUrl}
												className='w-40 p-2 mx-auto'
												alt=''
											/>
										</div>
										<div className='grid gap-4 girds-col-6'>
											<div className='flex flex-col p-4'>
												<h2 className='font-bold'>{item.productName}</h2>
												<p className='font-normal text-gray-600'>
													{item.description}
												</p>
												<div className='flex justify-between'>
													<div className='flex items-center justify-around w-24 px-1 bg-gray-200 rounded-md'>
														<button
															index={index}
															type='button'
															className='text-xl font-bold text-red-400'
															onClick={() => deleProduct(item)}
														>
															-
														</button>
														<span className='font-semibold text-md'>
															{item.qty}
														</span>
														<button
															index={index}
															type='button'
															className='text-xl font-bold text-red-400'
															onClick={() => addProduct(item)}
														>
															+
														</button>
													</div>
													<p className='text-xl font-bold'>${item.price}</p>
												</div>
											</div>
										</div>
										<div className='grid gap-4 p-4 text-red-500 girds-col-1'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='w-6 h-6 transition-all cursor-pointer hover:scale-125'
												onClick={() => trashProduct(item)}
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			<div className='h-full col-span-12 gap-4 pt-5 mb-4 lg:col-span-4 auto-rows-min'>
				<div className='lg:col-span-4'>
					<div className='grid grid-cols-12 gap-4'>
						{state.length > 0 ? (
							<div className='col-span-12'>
								<div className='grid w-full gap-1 px-4 py-2 bg-gray-100 rounded-lg gird-cols-12 h-44'>
									<div className='col-span-12'>
										<h6 className='text-lg font-medium'>Order Info</h6>
									</div>
									<div className='col-span-12 text-lg'>
										<div className='flex items-center justify-between'>
											<p className='font-light text-gray-700'>Subtotal:</p>
											<p className='font-normal'>
												{new Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'USD',
												}).format(count)}
											</p>
										</div>
										<div className='flex items-center justify-between'>
											<p className='font-light text-gray-700'>Shipping Cost:</p>
											<p className='font-normal'>${shipping}</p>
										</div>
									</div>
									<div className='col-span-12'>
										<div className='flex items-center justify-between text-3xl font-semibold'>
											<p>Total:</p>
											<p>${(count + shipping).toFixed(2)}</p>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className='col-span-12'>
								<div className='flex items-center justify-center w-full h-full gap-4 overflow-auto bg-white rounded-lg'>
									<h4 className='text-xl font-bold text-center p-7 '>
										You have no products in cart
									</h4>
								</div>
							</div>
						)}
						<div className='col-span-12'>
							<button
								type='btn'
								className={`flex items-center justify-center w-full gap-2 px-4 py-2 text-white duration-10 bg-[#0ab9dd] rounded-md shadow-md ${
									count > 0 ? '' : 'cursor-not-allowed opacity-50'
								}  text-md hover:bg-[#12849b]`}
								// disabled
								onClick={handleCheckOut}
							>
								Checkout
							</button>
						</div>
						<div className='col-span-12'>
							<Link
								to='/'
								className='flex items-center justify-center w-full gap-2 px-4 py-2 text-[#00d4ff] duration-100 border border-[#00d4ff] rounded-md shadow-md text-md hover:bg-[#0ab9dd47]'
							>
								Continue shopping
							</Link>
						</div>
					</div>
				</div>
				<div className='transition-all'>
					{checkout ? (
						<div>
							<div className='relative z-10'>
								<div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75'></div>

								<div className='fixed inset-0 z-10 overflow-y-auto'>
									<div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
										<div className='relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
											<div
												onClick={() => setCheckout(false)}
												className='float-right m-4 transition-all cursor-pointer hover:scale-125'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth={1.5}
													stroke='currentColor'
													className='w-6 h-6'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M6 18L18 6M6 6l12 12'
													/>
												</svg>
											</div>
											<div className='leading-loose'>
												<Formik
													initialValues={{
														name: '',
														email: '',
														address: '',
														city: '',
														country: '',
													}}
													validationSchema={yup.object({
														name: yup
															.string()
															.required('Please enter your Username'),
														city: yup
															.string()
															.required('Please enter your city'),
														address: yup
															.string()
															.required('Please enter your Address'),
														country: yup
															.string()
															.required('Please enter your Country'),
														zip: yup
															.string()
															.required('Please enter your Country'),
													})}
												>
													{({
														values,
														errors,
														touched,
														handleChange,
														handleBlur,
														isSubmitting,
													}) => (
														<form
															onSubmit={handleSubmit}
															className='max-w-xl p-10 m-4'
														>
															<p className='font-medium text-gray-800'>
																Customer information
															</p>
															<div className=''>
																<label
																	className='block text-sm text-gray-00'
																	htmlFor='name'
																>
																	Name
																</label>
																<input
																	className='w-full px-5 py-2 text-gray-700 bg-gray-200 rounded'
																	id='name'
																	name='name'
																	type='text'
																	// required
																	placeholder='Your Name'
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
																<p className='block font-light text-red-500 text-md'>
																	{errors.name && touched.name && errors.name}
																</p>
															</div>
															<div className='mt-2'>
																<label
																	className='block text-sm text-gray-600'
																	htmlFor='email'
																>
																	Email
																</label>
																<input
																	className='w-full px-5 py-2 text-gray-700 bg-gray-200 rounded'
																	id='email'
																	name='email'
																	type='email'
																	// required
																	placeholder='Your Email'
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
															</div>
															<div className='mt-2'>
																<label
																	className='block text-sm text-gray-600 '
																	htmlFor='address'
																>
																	Address
																</label>
																<input
																	className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
																	id='address'
																	name='address'
																	type='text'
																	required
																	placeholder='Street'
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
																<p className='block font-light text-red-500 text-md'>
																	{errors.address &&
																		touched.address &&
																		errors.address}
																</p>
															</div>
															<div className='mt-2'>
																<label
																	className='hidden block text-sm text-gray-600'
																	htmlFor='city'
																>
																	City
																</label>
																<input
																	className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
																	id='city'
																	name='city'
																	type='text'
																	placeholder='City'
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
																<p className='block font-light text-red-500 text-md'>
																	{errors.city && touched.city && errors.city}
																</p>
															</div>
															<div className='flex'>
																<div className='inline-block w-1/2 pr-1 mt-2'>
																	<label
																		className='hidden block text-sm text-gray-600'
																		htmlFor='country'
																	>
																		Country
																	</label>
																	<input
																		className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
																		id='country'
																		name='country'
																		type='text'
																		placeholder='Country'
																		onChange={handleChange}
																		onBlur={handleBlur}
																	/>
																	<p className='font-light text-red-500 text-md'>
																		{errors.country &&
																			touched.country &&
																			errors.country}
																	</p>
																</div>
																<div className='inline-block w-1/2 pl-1 mt-2 -mx-1'>
																	<label
																		className='hidden block text-sm text-gray-600'
																		htmlFor='zip'
																	>
																		Zip
																	</label>
																	<input
																		className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
																		id='zip'
																		name='zip'
																		type='text'
																		placeholder='zip'
																		onChange={handleChange}
																		onBlur={handleBlur}
																	/>
																	<p className='font-light text-red-500 text-md'>
																		{errors.zip && touched.zip && errors.zip}
																	</p>
																</div>
															</div>
															<div className='mt-4'>
																<button
																	className={`px-4 py-1 font-medium tracking-wider text-white bg-[#0ab9dd] rounded ${
																		Object.keys(errors).length !== 0
																			? 'cursor-not-allowed opacity-50'
																			: ''
																	}`}
																	type={`${
																		Object.keys(errors).length !== 0
																			? 'button'
																			: 'submit'
																	}`}
																>
																	Submit
																</button>
															</div>
														</form>
													)}
												</Formik>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default CartPage;
