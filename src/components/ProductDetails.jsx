import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const retrieveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response?.data;
};

export default function ProductDetails({ id }) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: retrieveProduct,
  });

  if (isLoading) return <div>Fetching product details</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div className='w-1/2 fixed right-0 flex flex-col items-center  z-50 overflow-y-auto'>
      <h1 className='text-3xl'>Product Details</h1>
      <div className='border mt-6 items-center dark:border-stone-700 bg-gray-100 dark:bg-stone-900 text-center p-1 text-md rounded flex flex-col'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='object-cover h-24 w-24 border dark:border-stone-700 rounded-full m-auto'
        />
        <p className='text-xl border-b dark:border-stone-700'>
          {product.title}
        </p>
        <p className='p-5'>{product.description}</p>
        <p className='px-4 py-2 dark:bg-stone-600 rounded-sm'>
          ${product.price}
        </p>
        <p className='p-3 font-bold'>{product.rating}/5</p>
      </div>
    </div>
  );
}
