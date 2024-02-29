// DataComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, Pagination } from 'semantic-ui-react';
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

  const result = useSelector((state) => state.Data.ordersData);
  console.log(result);

  const [data, setData] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  var filteredData = [];

  const setStartCount = () => {
    setStart(end)
  }

  const HandleNextCount = () => {
    setStartCount();
    //if (end = filteredData.length)
    setEnd(end + 3)
    setpageCount(pageCount + 1)
  }

  const setEndCount = () => {
    //if (end <= filteredData.length)
    setStart(start - 3)
  }

  const HandlePreviousCount = () => {
    setEndCount();
    setEnd(end - 3)
    setpageCount(pageCount - 1)
  }

  const SearchProduct = (e) => {
    setSearchInput(e)
  }

  console.log(data.length);
  console.log("start: " + start)
  console.log("end: " + end)

  if (searchInput === "") {
    filteredData = data
    filteredData = filteredData.slice(start, end);
  }
  else {
    filteredData = data.filter((res) => res.productName.startsWith(searchInput));
    filteredData = filteredData.slice(start, end);
    //setData(filteredData);
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
      <Table sortable celled>
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
            filteredData.map((item) => (
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
      <div class="ui container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button class="ui button">{pageCount}</Button>
        {
          start <= 0 ?
            <Button class="ui button" floated='right' disabled>Previous</Button> :
            <Button class="ui button" floated='right' onClick={HandlePreviousCount}>Previous</Button>
        }
        {
          end >= data.length ?
            <Button class="ui button" floated='right' disabled>Next</Button> :
            <Button class="ui button" floated='right' onClick={HandleNextCount}>Next</Button>
        }
      </div>
      <Link to='/AddOrder'>
        <Button content="AddOrder" primary>
        </Button>
      </Link>

    </div>
  );
};


export default DataComponent;
