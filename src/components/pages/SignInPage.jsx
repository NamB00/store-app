import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { auth } from '../../firebase-app/firebase-config';

const SignInPage = () => {
	document.title = 'Login Page';
	const [password, setPassword] = useState(false);
	const [submit, setSubmit] = useState(true);
	const { userInfo } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo?.email) {
			navigate('/');
		}
	}, [userInfo]);

	const handleSubmit = async (e) => {
		setSubmit(false);
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target).entries());
		await signInWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				toast.success('Login user successfully!!');
				navigate('/carts');
				setSubmit(true);
			})
			.catch((error) => {
				setSubmit(true);
				toast.error('The Username or Password is Incorrect');
			});
	};

	return (
		<div>
			<div className='selection:bg-cyan-200 selection:text-white'>
				<div className='flex items-center justify-center min-h-screen bg-cyan-100'>
					<div className='flex-1 p-8'>
						<div className='mx-auto overflow-hidden bg-white shadow-xl w-80 rounded-3xl'>
							<div className='relative h-48 bg-[#0ab9dd] rounded-bl-4xl'>
								<svg
									className='absolute bottom-0'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 1440 320'
								>
									<path
										fill='#ffffff'
										fillOpacity='1'
										d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
									></path>
								</svg>
							</div>
							<div className='px-10 pt-4 pb-8 bg-white rounded-tr-4xl'>
								<h1 className='text-2xl font-semibold text-gray-900'>
									Login account
								</h1>
								<form className='mt-12' onSubmit={handleSubmit}>
									<div className='relative'>
										<input
											id='email'
											name='email'
											type='email'
											className='w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-cyan-600'
											placeholder='john@doe.com'
										/>
										<label
											htmlFor='email'
											className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
										>
											Email address
										</label>
									</div>
									<div className='relative mt-10'>
										<input
											id='password'
											type={`${password ? 'text' : 'password'}`}
											name='password'
											className='w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-cyan-600'
											placeholder='Password'
										/>
										<label
											htmlFor='password'
											className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
										>
											Password
										</label>
										<div className='absolute top-0 right-0 transition-all translate-y-1/2 cursor-pointer'>
											{password ? (
												<svg
													width='22'
													height='14'
													viewBox='0 0 22 14'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
													onClick={() => setPassword(false)}
												>
													<path
														d='M14.5 1.62156C16.8312 2.50868 18.7928 4.24569 20.5245 6.37837C20.8098 6.72982 20.8099 7.23217 20.5245 7.58361C17.9889 10.7065 14.96 12.981 11 12.981C7.04003 12.981 4.01115 10.7065 1.4755 7.58361C1.19014 7.23216 1.19016 6.72981 1.47551 6.37837C3.69735 3.64197 6.29789 1.55697 9.5717 1.0828C9.75303 1.05654 9.93641 1.03522 10.1219 1.019L10.561 1'
														stroke='#999999'
														strokeWidth='1.4'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
													<path
														d='M13.5 6.98096C13.5 8.36167 12.3807 9.48096 11 9.48096C9.61929 9.48096 8.5 8.36167 8.5 6.98096C8.5 5.60025 9.61929 4.48096 11 4.48096C12.3807 4.48096 13.5 5.60025 13.5 6.98096Z'
														stroke='#999999'
														strokeWidth='1.4'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
											) : (
												<svg
													width='22'
													height='20'
													viewBox='0 0 22 20'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
													onClick={() => setPassword(true)}
												>
													<path
														d='M13.5356 8.46454C13.7677 8.69669 13.9519 8.97229 14.0775 9.27561C14.2032 9.57892 14.2678 9.90401 14.2678 10.2323C14.2678 10.5606 14.2031 10.8857 14.0775 11.189C13.9518 11.4923 13.7677 11.7679 13.5355 12.0001C13.3034 12.2322 13.0278 12.4164 12.7245 12.542C12.4211 12.6676 12.0961 12.7323 11.7678 12.7323C11.4394 12.7323 11.1144 12.6676 10.811 12.5419C10.5077 12.4163 10.2321 12.2322 10 12'
														stroke='#999999'
														strokeWidth='1.5'
														strokeLinecap='round'
													/>
													<path
														d='M11 4C7.04003 4 4.01115 6.27449 1.4755 9.39738C1.19014 9.74883 1.19009 10.2511 1.47544 10.6025C2.18711 11.479 2.93763 12.2887 3.73669 13M6.74043 15.0348C8.03446 15.6495 9.44549 16 11 16C11.2884 16 11.5719 15.9879 11.8507 15.9643L12.2607 15.9122M15.7029 5.18844C17.5178 6.15443 19.0991 7.64187 20.5245 9.39741C20.8099 9.74885 20.8099 10.2512 20.5245 10.6026C19.1774 12.2617 17.6911 13.6813 16 14.6476'
														stroke='#999999'
														strokeWidth='1.4'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
													<path
														d='M19.1217 1.11547L1.9998 18.9996'
														stroke='#999999'
														strokeWidth='1.5'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
											)}
										</div>
									</div>

									<button
										type='submit'
										className={`mt-20 px-4 py-2 rounded bg-[#0ab9dd] hover:bg-cyan-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-cyan-500 focus:ring-opacity-80 cursor-pointer ${
											submit ? '' : 'cursor-not-allowed opacity-50'
										}`}
									>
										Login
									</button>
								</form>
								<Link
									to='/sign-up'
									className='block mt-4 text-sm font-medium text-center text-[#0ab9dd] hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500'
								>
									Don't Have an Account?
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
