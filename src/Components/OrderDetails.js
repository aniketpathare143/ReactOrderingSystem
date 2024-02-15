import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Confirm, Image, List, ListItem } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { DeleteOrderData } from '../AppStore/Slice';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    function DeletePlacedOrder(id) {
        console.log(id);
        const val = window.confirm('Are you sure you want to delete a order?')
        if (val) {
            (async () => {
                try {
                    dispatch(DeleteOrderData(id));
                    const response = await axios.delete(`http://localhost:5179/api/order/${id}`);
                    if (response.statusText == 'OK') {
                        alert('Deleted successfully!');
                        navigate('/DataComponent')
                    }
                    else {
                        alert('Unable to delete a order.')
                    }
                }
                catch (error) {
                    console.log(error);
                }
            })()
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5179/api/order/${id}`);
                setImageSrc('data:image/jpeg;base64,' + response.data.productImage)
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!order) return <p>No order found for ID: {id}</p>;

    return (
        <div className="order-details">
            <h2>Order Details for Order Id - {order.orderId} </h2>           
            <List bulleted>
                <ListItem><strong>Order ID:</strong> {order.orderId}</ListItem>
                <ListItem><strong>Product Name:</strong> {order.productName}</ListItem>               
                <ListItem><strong>Date:</strong> {order.date}</ListItem>
                <ListItem><strong>Placed By:</strong> {order.placedBy}</ListItem>
                <img src={imageSrc}></img>
                <ListItem><strong>Address Line1:</strong> {order.addressLine1}</ListItem>
                <ListItem><strong>Address Line2:</strong> {order.addressLine2}</ListItem>
                <ListItem><strong>Pincode:</strong> {order.pincode}</ListItem>
            </List>
            <div>
                <Link to='/DataComponent'>
                    <Button primary content="Go Back" ></Button>
                </Link>

                <Button secondary content="Delete" onClick={() => DeletePlacedOrder(order.orderId)} ></Button>

            </div>
        </div>
    );
};

export default OrderDetails;