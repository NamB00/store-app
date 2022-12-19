import React from 'react';
import { Link } from 'react-router-dom';

const ProductListsPage = ({ products }) => {
	return (
		<>
			{products &&
				products.length > 0 &&
				products.map((item, index) => (
					<Link
						to={`/products/${item.productId}`}
						key={index}
						id={item.productId}
					>
						<div className='flex p-4 bg-white rounded-lg'>
							<div className='w-[150px] h-full col-span-4'>
								<img src={item.imageUrl} alt='' />
							</div>
							<div className='w-full col-span-8'>
								<h2 className='font-bold'>{item.productName}</h2>
								<p className='font-normal text-gray-600 line-clamp-2'>
									{item.description}
								</p>
								<div className='flex items-center justify-between mt-5'>
									<p className='text-xl font-bold'>${item.price}</p>
									<h3 className='font-medium text-[#0ab9dd] text-md'>Detail</h3>
								</div>
							</div>
						</div>
					</Link>
				))}
		</>
	);
};

export default ProductListsPage;
