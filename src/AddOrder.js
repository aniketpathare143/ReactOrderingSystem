import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormField, Input, Label, LabelDetail } from "semantic-ui-react";

const AddOrder = () => {
   
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        amount: 0,
        placedBy: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            pincode: ''
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5179/api/order', formData);
            alert('Order placed successfully!');
            navigate('/DataComponent');
        } catch (error) {
            alert('Error placing order:', error);
        }
    };

    return (
        <div>
            <br></br>
            <div class="ui container">
                <h2>
                    Add New Order
                </h2>
                <br></br>
            </div>
            {
                redirect && <Link to='/DataComponent'></Link>
            }
            <Form className="ui container form" onSubmit={handleSubmit}>
                <FormField><LabelDetail>Order Name:</LabelDetail><Input type="Text" name='productName' value={formData.productName} onChange={handleChange}></Input><br></br></FormField>
                <FormField><LabelDetail>Order Amount:</LabelDetail><Input type="Number" name='amount' value={formData.amount} onChange={handleChange}></Input><br></br></FormField>
                <FormField><LabelDetail>Placed By:</LabelDetail><Input type="Text" name='placedBy' value={formData.placedBy} onChange={handleChange}></Input><br></br></FormField>
                <FormField><LabelDetail>Address Line1:</LabelDetail><Input type="TextArea" name='addressLine1' value={formData.address.addressLine1} onChange={handleAddressChange}></Input><br></br></FormField>
                <FormField><LabelDetail>Address Line2:</LabelDetail><Input type="Text" name='addressLine2' value={formData.address.addressLine2} onChange={handleAddressChange}></Input><br></br></FormField>
                <FormField><LabelDetail>Pincode:</LabelDetail><Input type="Text" name='pincode' value={formData.address.pincode} onChange={handleAddressChange}></Input><br></br></FormField>
                <Button type="Submit" content="Submit" primary></Button>
            </Form>
        </div>
    )
}

export default AddOrder;