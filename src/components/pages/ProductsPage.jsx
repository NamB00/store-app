import React, { useState, useEffect, CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersAsync } from '../../redux/reducer/products/products.thunks';
import ProductListsPage from './ProductListsPage';
import { useNavigate, useParams } from 'react-router-dom';
import { addCart } from '../../redux/actions';
import { useAuth } from '../../contexts/auth-context';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';

const ProductsPage = () => {
	const [LoadingSK, setLoadingSK] = useState(true);
	const slug = useParams();
	const [count, setCount] = useState(1);
	const { userInfo, setUserInfo, property, setProperty, IdCollection } =
		useAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading, products, errorMessage } = useSelector(
		(state) => state.products
	);
	const addProduct = (product) => {
		if (!userInfo) {
			navigate('/sign-in');
		} else {
			dispatch(addCart(product));
			setCount(1);
			toast.success('order successfully!!');
		}
	};
	const handleSetcount = () => {
		if (count === 1) return;
		setCount(count - 1);
	};

	useEffect(() => {
		setCount(1);
		if (!products) {
			setLoadingSK(true);
		} else {
			setLoadingSK(false);
		}
	}, [slug.id, products]);

	useEffect(() => {
		dispatch(loadUsersAsync());
	}, []);

	if (!products) return;

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
						<>
							<div className='h-[650px] col-span-12 md:col-span-7 bg-white rounded-md '>
								<img
									src={products[slug.id - 1].imageUrl}
									className='h-[400px] mx-auto '
									alt=''
								/>
								<div className='p-4'>
									<h2 className='text-xl font-bold'>
										{products[slug.id - 1].productName}
									</h2>
									<p className='text-gray-600'>
										{products[slug.id - 1].description}
									</p>
									<div className='flex items-center justify-between mt-10'>
										<div className='flex items-center justify-around px-2 py-1 bg-gray-200 rounded-md w-[130px]'>
											<button
												type='button'
												className='text-xl font-bold text-red-400 transition-all hover:scale-125'
												onClick={handleSetcount}
											>
												-
											</button>
											<span className='font-semibold text-md'>{count}</span>
											<button
												type='button'
												className='text-xl font-bold text-red-400 transition-all hover:scale-125'
												onClick={() => setCount(count + 1)}
											>
												+
											</button>
										</div>
										<div className='flex items-center'>
											<p className='mr-5 text-2xl font-bold'>
												${products[slug.id - 1].price}
											</p>
											<button
												className='flex items-center p-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-[#0072ff] to-[#0ab9dd] transition-all hover:scale-110'
												onClick={() =>
													addProduct({
														...products[slug.id - 1],
														count,
														IdCollection,
														property,
													})
												}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth={1.5}
													stroke='currentColor'
													className='w-5 h-5 mr-2'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
													/>
												</svg>
												Add to cart
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className='h-[650px] col-span-12 md:col-span-5 overflow-y-scroll'>
								<div className='grid h-auto gap-3 grids-col-12'>
									<ProductListsPage products={products}></ProductListsPage>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
