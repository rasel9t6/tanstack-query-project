import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
  return response?.data;
};

export default function ProductList({ setShowDetails, setSelectedProductId }) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: retrieveProducts,
  });

  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occurred: {error.message} </div>;

  function handleClick(productId) {
    setShowDetails((prev) => !prev);
    setSelectedProductId(productId);
  }

  return (
    <div className='flex flex-col mx-auto justify-center items-center w-30'>
      <h2 className='text-3xl'>Product List</h2>
      <ul className='flex flex-wrap cursor-pointer mt-4 justify-center items-center'>
        {products &&
          products.map((product) => (
            <li
              key={product.id}
              onClick={() => handleClick(product.id)}
              className='flex dark:bg-stone-900 flex-col items-center m-2 border dark:border-stone-700 rounded-sm'
            >
              <img
                className='object-cover h-64 w-96 rounded-sm'
                src={product.thumbnail}
                alt={product.title}
              />
              <p className='text-xl my-3'>{product.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
