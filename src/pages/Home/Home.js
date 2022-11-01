import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Home = () => {
    const foods = useLoaderData();
    const [showFoods, setShowFoods] = useState(foods);
    const [products, setProducts] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        //fetching with post method
        fetch(`http://localhost:5000/foods`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(products)
        })
            .then(res => res.json())
            .then(data => console.log(data))

    };

    const handleBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newProduct = { ...products };
        newProduct[field] = value;
        console.log(newProduct);
        setProducts(newProduct);

    };

    const handleDelete = (food) => {
        const agree = window.confirm(`Are you sure to delete ${food.pname}`);
        if(agree) {
            console.log(food._id);
            fetch(`http://localhost:5000/foods/${food._id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                const remainingFoods = foods.filter(f => f._id !== food._id);
                setShowFoods(remainingFoods);
            })
            .catch(err => console.log(err.message))

        }
    };

    return (
        <div className='container mx-auto'>
            <form onSubmit={handleSubmit} className='space-y-3 text-center'>
                <input onBlur={handleBlur} type="text" name='pname' placeholder='Product Name' required className='border border-black p-2' />
                <br />
                <input onBlur={handleBlur} type="text" name='price' placeholder='Product Price' required className='border border-black p-2' />
                <br />
                <input onBlur={handleBlur} type="text" name='imgUrl' placeholder='Product imageUrl' required className='border border-black p-2' />
                <br />
                <input onBlur={handleBlur} type="number" name='quantity' placeholder='Product quantiy' required className='border border-black p-2' />
                <br />
                <input onBlur={handleBlur} type="number" name='review' placeholder='Product Review required' className='border border-black p-2' /><br />
                <input type="submit" value={'submit'} className='p-2 bg-blue-600 cursor-pointer' />

            </form>

            <div className='grid grid-cols-3 gap-5'>
                {
                    showFoods.map(food => (

                        <div key={food._id} className='border border-[#00052b] p-2'>
                            <div className='flex items-center justify-center'>
                                <img src={food.imgUrl} alt="" className='w-[300px] h-[300px]' />
                            </div>
                            <p>{food.pname}</p>
                            <p>price:{food.price}</p>
                            <p>Quantity:{food.quantity}</p>
                            <p>Reivew:{food.review}</p>
                            <div className='flex items-center justify-between'>
                                <button className='bg-blue-600 p-1 font-semibold rounded'>update</button>
                                <button className='bg-red-600 p-1 font-semibold rounded' onClick={() => handleDelete(food)}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Home