import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

const Modal = () => {
	const state = useSelector((state) => {
		return state.handleCart;
	});
	console.log(state);
	const handleSendData = (e) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target).entries());
		console.log({ ...data, ...state });
	};
	return (
		<div>
			<div className='relative z-10'>
				<div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75'></div>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
						<div className='relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
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
										name: yup.string().required('Please enter your Username'),
										email: yup
											.string()
											.email('Please enter valid email adress')
											.required('Please enter your Email'),
										address: yup
											.string()
											.required('Please enter your Username'),
									})}
									onSubmit={(values, { setSubmitting, resetForm }) => {
										console.log(JSON.stringify(values, null, 2));
										setSubmitting(false);
										resetForm();
									}}
								>
									{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										isSubmitting,
										handleSubmit,
									}) => (
										<form onSubmit={handleSubmit} className='max-w-xl p-10 m-4'>
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
													required
													placeholder='Your Name'
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<label className='block font-light text-red-500 text-md'>
													loi roi hsdshiudhoshdo
													{/* {errors.name && touched.name && errors.name} */}
												</label>
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
													required
													placeholder='Your Email'
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<p className='font-light text-red-500 text-md'>
													{errors.email && touched.email && errors.email}
												</p>
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
												/>
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
													required
													placeholder='City'
												/>
											</div>
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
													required
													placeholder='Country'
												/>
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
													required
													placeholder='zip'
												/>
											</div>
											<div className='mt-4'>
												<button
													className={`px-4 py-1 text-white font-medium tracking-wider bg-[#0ab9dd] rounded  ${
														errors ? 'cursor-not-allowed opacity-50' : ''
													}`}
													type='submit'
												>
													Submit
													{console.log(errors)}
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
	);
};

export default Modal;
