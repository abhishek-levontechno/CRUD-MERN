// src/components/ItemForm.js

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createItem, updateItem, fetchItemById } from '../services/item.services';

const ItemForm = () => {
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchItemById(id)
                .then((response) => setItem(response.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(item);
        if (id) {
            updateItem(id, item)
                .then(() => navigate(`/`))
                .catch((err) => console.log(err));
        } else {
            createItem(item)
                .then(() => navigate(`/`))
                .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            <h1>{id ? 'Update' : 'Create'} Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'} Item</button>
            </form>
        </div>
    );
};

export default ItemForm;
