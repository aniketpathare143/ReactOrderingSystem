// DataComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, List, ListItem, Tab, Table } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
} from 'semantic-ui-react'


const DataComponent = () => {

  const result = useSelector((state)=>state.Data.ordersData);
  console.log(result);

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const SearchProduct = (e) => {
    setSearchInput(e);
    //Immediate invoke function IIF
    (
      async () => {
        try {
          const response = await axios.get(`http://localhost:5179/api/order/search?key=${e}`);
          if (response.statusText == 'OK') {
            setData(response.data);
          }
          else {
            //alert('No orders found ')
          }
        }
        catch (error) {
          console.log(error);
        }
      }
    )()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5179/api/order');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Order Details</h2>
      <div class="ui category search">
        <div class="ui icon input">
          <Input class="prompt" type="text" value={searchInput} placeholder="Search products..." onChange={(e) => { SearchProduct(e.target.value) }} />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Placed By</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map((item) => (
              <TableRow key={item.orderId}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.placedBy}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Link to={`/OrderDetails/${item.orderId}`}>
                    <Button content='Details' primary />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Link to='/AddOrder'>
        <Button content="AddOrder" primary>
        </Button>
      </Link>
    </div>
  );
};

export default DataComponent;
