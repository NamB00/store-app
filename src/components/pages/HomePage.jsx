import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCart } from '../../redux/actions';
import { toast } from 'react-toastify';
import { loadUsersAsync } from '../../redux/reducer/products/products.thunks';
import { useAuth } from '../../contexts/auth-context';
import { RingLoader } from 'react-spinners';

const HomePage = () => {
	const slug = useParams();
	const [count, setCount] = useState(1);
	const { userInfo, property, IdCollection } = useAuth();
	const [LoadingSK, setLoadingSK] = useState(true);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const { products } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(loadUsersAsync());
	}, []);
	const addProduct = (product) => {
		if (!userInfo) {
			navigate('/sign-in');
		} else {
			dispatch(addCart(product));
			toast.success('order successfully!!');
		}
	};

	useEffect(() => {
		if (!products) {
			setLoadingSK(true);
		} else {
			setLoadingSK(false);
		}
	}, [products]);

	return (
		<div className='pt-5'>
			<div className='container h-full mx-auto'>
				<div className='grid h-full grid-cols-12 gap-5'>
					{LoadingSK ? (
						<div className='col-span-12 mx-auto translate-y-1/2'>
							<RingLoader
								color='#0ab9dd'
								loading={LoadingSK}
								size={150}
								aria-label='PacmanLoader'
								data-testid='PacmanLoader'
							/>
						</div>
					) : (
						products &&
						products.length > 0 &&
						products.map((item, index) => (
							<div
								key={index}
								className='w-full max-w-sm col-span-12 mx-auto overflow-hidden transition-all bg-white rounded-lg shadow-md sm:col-span-6 md:col-span-4 xl:col-span-3 lg:col-span-3 dark:bg-gray-800 dark:border-gray-700'
							>
								<div className='flex flex-col h-full'>
									<Link to={`/products/${item.productId}`}>
										<img
											className='image h-[300px] mx-auto p-2 rounded-t-lg transition-all hover:scale-110 '
											src={item.imageUrl}
											alt='product image'
										/>
									</Link>
									<div className='flex flex-col flex-1 px-5 pb-5'>
										<Link to={`/products/${item.productId}`}>
											<h5 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
												{item.productName}
											</h5>
										</Link>
										<div className='flex items-center mt-2.5 mb-5'>
											<svg
												className='w-5 h-5 text-yellow-300'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<title>First star</title>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
											</svg>
											<svg
												className='w-5 h-5 text-yellow-300'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<title>Second star</title>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
											</svg>
											<svg
												className='w-5 h-5 text-yellow-300'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<title>Third star</title>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
											</svg>
											<svg
												className='w-5 h-5 text-yellow-300'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<title>Fourth star</title>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
											</svg>
											<svg
												className='w-5 h-5 text-yellow-300'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<title>Fifth star</title>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
											</svg>
											<span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
												5.0
											</span>
										</div>
										<div className='flex items-center justify-between mt-auto md:flex-col xl:flex-row'>
											<span className='text-3xl font-bold text-gray-900 dark:text-white'>
												${item.price}
											</span>
											<button
												type='button'
												className='flex items-center px-4 py-3 text-sm font-medium text-white rounded-md bg-gradient-to-r from-[#0072ff] to-[#0ab9dd] transition-all hover:scale-110'
												onClick={() =>
													addProduct({
														...item,
														count,
														IdCollection,
														property,
													})
												}
											>
												Add to cart
											</button>
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
