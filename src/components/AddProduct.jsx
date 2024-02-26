import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function AddProduct() {
  const [state, setState] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    rating: 5,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post('https//localhost:3000/products', newProduct),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  const submitData = (e) => {
    e.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value =
      e.target.type === 'number' ? e.target.valueAsNumber : e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <div className='w-1/4 fixed  flex flex-col items-center'>
      <h2 className='text-3xl'>Add Product</h2>
      <form
        onSubmit={submitData}
        className='flex flex-col dark:bg-stone-900 gap-5 mt-6 border dark:border-stone-700 p-5'
      >
        <input
          type='text'
          value={state.title}
          name='title'
          placeholder='Product title'
          onChange={handleChange}
          className='px-5 py-3 dark:bg-stone-700'
        />
        <textarea
          value={state.description}
          name='description'
          onChange={handleChange}
          placeholder='Product details'
          className='px-5 py-3 dark:bg-stone-700'
        />
        <input
          type='text'
          value={state.thumbnail}
          name='thumbnail'
          onChange={handleChange}
          placeholder='Thumbnail URL'
          className='px-5 py-3 dark:bg-stone-700'
        />
        <input
          type='number'
          name='price'
          value={state.price}
          onChange={handleChange}
          placeholder='Product price'
          className='px-5 py-3 dark:bg-stone-700'
        />
        <button
          type='submit'
          className='dark:bg-stone-400 text-stone-950 font-bold'
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
