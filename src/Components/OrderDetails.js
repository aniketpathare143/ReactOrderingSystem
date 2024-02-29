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
            <div class="ui blue large header">Order Details</div>
            <div class="ui grey medium header">Product name-{order.productName}</div>
            <p></p>

            <div class="ui card">
                <div class="image">
                    <img src={imageSrc} />
                </div>
                <div class="content">
                    <a class="header">{order.placedBy}</a>
                    <div class="meta">
                        <span class="date">Order created on - {order.date}</span>
                    </div>
                    <div class="description">
                        From - {order.addressLine1 + " " + order.addressLine2 + " "}
                        Pincode - {order.pincode}
                    </div>
                </div>
            </div>
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