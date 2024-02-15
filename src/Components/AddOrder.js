import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormField, Input, Label, LabelDetail, Message } from "semantic-ui-react";
import { useDispatch } from 'react-redux'
import { AddOrderData } from "../AppStore/Slice";

const AddOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({});
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

    const validateForm = (data) => {
        let errors = {};

        if (!data.productName) {
            errors.productName = 'Product name is required';
        }

        if (!data.amount) {
            errors.amount = 'Amount is required';
        } else if (isNaN(data.amount)) {
            errors.amount = 'Amount must be a number';
        }

        if (!data.placedBy) {
            errors.placedBy = 'Placed by is required';
        }

        if (!data.address.addressLine1) {
            errors.addressLine1 = 'Address Line 1 is required';
        }

        if (!data.address.addressLine2) {
            errors.addressLine2 = 'Address Line 2 is required';
        }

        if (!data.address.pincode) {
            errors.pincode = 'Pincode is required';
        }

        return errors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
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
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            // Form is invalid, display validation errors
            setErrors(validationErrors);
            return;
        }
        try {

            dispatch(AddOrderData({ formData }));
            const formDataWithImage = new FormData();
            formDataWithImage.append("productName", formData.productName);
            formDataWithImage.append("placedBy", formData.placedBy);
            formDataWithImage.append("amount", formData.amount);
            formDataWithImage.append("address.addressLine1", formData.address.addressLine1);
            formDataWithImage.append("address.addressLine2", formData.address.addressLine2);
            formDataWithImage.append("address.pincode", formData.address.pincode);
            formDataWithImage.append("file", image);

            const response = await axios.post('http://localhost:5179/api/order', formDataWithImage, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
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
            <Form className="ui container form" onSubmit={handleSubmit} error={Object.keys(errors).length > 0}>
                <FormField><LabelDetail>Order Name:</LabelDetail><Input type="Text" name='productName' value={formData.productName} onChange={handleChange} error={errors.productName}></Input><br></br></FormField>
                <FormField><LabelDetail>Order Amount:</LabelDetail><Input type="Number" name='amount' value={formData.amount} onChange={handleChange} error={errors.amount}></Input><br></br></FormField>
                <FormField><LabelDetail>Placed By:</LabelDetail><Input type="Text" name='placedBy' value={formData.placedBy} onChange={handleChange} error={errors.placedBy}></Input><br></br></FormField>
                <FormField><LabelDetail>Address Line1:</LabelDetail><Input type="TextArea" name='addressLine1' value={formData.address.addressLine1} onChange={handleAddressChange} error={errors.addressLine1}></Input><br></br></FormField>
                <FormField><LabelDetail>Address Line2:</LabelDetail><Input type="Text" name='addressLine2' value={formData.address.addressLine2} onChange={handleAddressChange} error={errors.addressLine2}></Input><br></br></FormField>
                <FormField><LabelDetail>Pincode:</LabelDetail><Input type="Text" name='pincode' value={formData.address.pincode} onChange={handleAddressChange} error={errors.pincode}></Input><br></br></FormField>
                <FormField><LabelDetail>Upload photo:</LabelDetail>
                    {/* <Input type="file" name="productImage" accept="image/*" value={formData.productImage} onChange={handleImageChange}></Input> */}
                    <div>
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                </FormField>
                <Message
                    error
                    header="Validation Error"
                    list={Object.values(errors)}
                />
                <Button type="Submit" content="Submit" primary></Button>
            </Form>
        </div>
    )
}

export default AddOrder;