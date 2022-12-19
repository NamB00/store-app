import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Modal = () => {
	const state = useSelector((state) => {
		return state.handleCart;
	});
	console.log(state);
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target).entries());
		console.log({ ...data, ...state });
		// console.log(data);
		// axios({
		// 	method: 'post',
		// 	url: 'http://localhost:4000/api/checkout',
		// 	data: data,
		// })
		// 	.then(function (response) {
		// 		console.log(response);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	};
	return (
		<div>
			<div className='relative z-10'>
				<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
							<div className='leading-loose'>
								<form onSubmit={handleSubmit} className='max-w-xl m-4 p-10'>
									<p className='text-gray-800 font-medium'>
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
											required
											placeholder='Your Name'
										/>
									</div>
									<div className='mt-2'>
										<label
											className='block text-sm text-gray-600'
											htmlFor='email'
										>
											Email
										</label>
										<input
											className='w-full px-5  py-2 text-gray-700 bg-gray-200 rounded'
											id='email'
											name='email'
											type='email'
											required
											placeholder='Your Email'
										/>
									</div>
									<div className='mt-2'>
										<label
											className=' block text-sm text-gray-600'
											htmlFor='address'
										>
											Address
										</label>
										<input
											className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
											id='address'
											name='address'
											type='text'
											required=''
											placeholder='Street'
										/>
									</div>
									<div className='mt-2'>
										<label
											className='hidden text-sm block text-gray-600'
											htmlFor='city'
										>
											City
										</label>
										<input
											className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
											id='city'
											name='city'
											type='text'
											required
											placeholder='City'
										/>
									</div>
									<div className='inline-block mt-2 w-1/2 pr-1'>
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
											required
											placeholder='Country'
										/>
									</div>
									<div className='inline-block mt-2 -mx-1 pl-1 w-1/2'>
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
											required
											placeholder='zip'
										/>
									</div>
									<div className='mt-4'>
										<button
											className='px-4 py-1 text-white font-medium tracking-wider bg-blue-500 rounded'
											type='submit'
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
