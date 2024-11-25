import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../services/item.services';

const ItemDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItemById(id)
            .then((response) => setItem(response.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
        <div>
            <h1>{item._id}</h1>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>Price: INR {item.price}</p>
        </div>
    );
};

export default ItemDetail;
