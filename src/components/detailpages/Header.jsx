import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

let useClickOutside = (handler) => {
	let domNode = useRef(null);
	const maybeHandler = (event) => {
		if (domNode.current && !domNode.current.contains(event.target)) {
			handler();
		}
	};
	useEffect(() => {
		document.addEventListener('click', maybeHandler, true);
		return () => {
			document.removeEventListener('click', maybeHandler, true);
		};
	});

	return domNode;
};
const Header = ({ state }) => {
	const [Show, setShow] = useState(false);
	let domNode = useClickOutside(() => {
		setShow(false);
	});
	return (
		<div className='shadow-m bg-[#0ab9dd]'>
			<div className='container mx-auto '>
				<div className='flex items-center justify-between py-2'>
					<div className='flex items-center w-1/3 gap-8 text-white cursor-pointer md:hidden'>
						<div
							ref={domNode}
							className='relative transition-all hover:scale-125'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-7 h-7'
								onClick={() => setShow(!Show)}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>
						</div>
						<div
							className={`absolute ${
								Show ? '' : 'hidden'
							}  left-0 z-10 w-full top-14 `}
						>
							<div>
								<div className='py-4 px-3  bg-[#26b3cf] rounded-b-md dark:bg-gray-800 flex flex-col'>
									<NavLink
										to='/'
										className='relative inline-block text-lg font-normal text-white '
									>
										Home
									</NavLink>
									<NavLink
										to='/products/1'
										className='relative inline-block text-lg font-normal text-white'
										// onClick={() => setShow(true)}
									>
										Product
									</NavLink>
									<NavLink
										to='/reviews'
										className='relative inline-block text-lg font-normal text-white'
										// onClick={() => setShow(true)}
									>
										Reviews
									</NavLink>
								</div>
							</div>
						</div>
					</div>
					<div className='items-center hidden w-1/3 gap-8 md:flex '>
						<NavLink
							to='/'
							className='relative inline-block text-lg font-normal text-white '
						>
							Home
						</NavLink>
						<NavLink
							to='/products/1'
							className='relative inline-block text-lg font-normal text-white'
						>
							Product
						</NavLink>
						<NavLink
							to='/reviews'
							className='relative inline-block text-lg font-normal text-white '
						>
							Reviews
						</NavLink>
					</div>
					<div className='w-1/3'>
						<NavLink to='/'>
							<h2 className='text-2xl font-bold text-center text-white'>
								Beauty.bd
							</h2>
						</NavLink>
					</div>
					<div className='w-1/3'>
						<div className='flex items-center justify-end'>
							<div className='relative flex items-center justify-center w-10 h-10 text-2xl text-blue-500 transition-all rounded-full cursor-pointer hover:scale-125'>
								<Link to='/carts'>
									<span className='absolute top-1 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full'>
										{state?.length || 0}
									</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='text-white transition-all w-7 h-7'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
										/>
									</svg>
								</Link>
							</div>
							<div className='relative flex items-center justify-center w-10 h-10 text-2xl rounded-full cursor-pointer'>
								<Link to='/users'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='text-white transition-all w-7 h-7 hover:scale-125'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
