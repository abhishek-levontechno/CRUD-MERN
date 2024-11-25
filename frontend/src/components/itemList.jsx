// src/components/ItemList.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../services/item.services';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems()
            .then(response => setItems(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        deleteItem(id)
            .then(() => {
                const newItems = items.filter(item => item._id !== id);
                setItems(newItems);
            })
            .catch(err => console.log(err));
    };

    return (
        <div >
            <h1>Items</h1>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/create" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Create Item</Link>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.name} - INR {item.price}
                        <Link to={`/item/${item._id}`} style={{ margin: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>View</Link>
                        <Link to={`/edit/${item._id}`} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Edit</Link>
                        <button style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'red', color: 'white', textDecoration: 'none', borderRadius: '5px' }} onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
