"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch all customers when the component mounts
        const fetchCustomers = async () => {
            const response = await fetch(`/api/customer`);
            const data = await response.json();
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    const deleteCustomer = async (id) => {
        const response = await fetch(`/api/customer/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Refresh the customer list after deletion
            setCustomers(customers.filter(customer => customer._id !== id));
        }
    };

    const addCustomer = () => {
        // Redirect to a form to add a new customer
        router.push('/customer/add');
    };

    const updateCustomer = (id) => {
        // Redirect to the update form for the existing customer
        router.push(`/customer/update/${id}`);
    };

    return (
        <main>
            <div className="w-full h-full my-10">
                <h1 className="font-bold text-xl">Customer Management</h1>
                <Button variant="contained" onClick={addCustomer}>
                    Add New Customer
                </Button>
                <ul>
                    {customers.map((customer) => (
                        <li key={customer._id} className="flex justify-between">
                            <span onClick={() => router.push(`/customer/${customer._id}`)} className="cursor-pointer">{customer.name}</span>
                            <div>
                                <Button variant="outlined" onClick={() => updateCustomer(customer._id)}>
                                    Update
                                </Button>
                                <Button variant="outlined" color="error" onClick={() => deleteCustomer(customer._id)}>
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
