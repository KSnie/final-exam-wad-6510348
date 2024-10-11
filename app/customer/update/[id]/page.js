"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';

export default function UpdateCustomer({ params }) {
    const [customer, setCustomer] = useState({
        name: '',
        dob: '',
        membernumber: '',
        interest: '',
    });
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        const fetchCustomer = async () => {
            const response = await fetch(`/api/customer/${id}`);
            const data = await response.json();

            // Format the date of birth to YYYY-MM-DD
            const formattedDob = new Date(data.dob).toISOString().split('T')[0];

            setCustomer({
                ...data,
                dob: formattedDob, // Set formatted date of birth
            });
        };
        fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerData = {
            ...customer,
            dob: new Date(customer.dob).toISOString(), // Convert to ISO string
        };

        const response = await fetch(`/api/customer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                updateData: customerData, // Ensure this structure is correct
            }),
        });

        if (response.ok) {
            router.push('/customer'); // Navigate back to the customer list
        } else {
            const errorResponse = await response.json();
            console.error("Error updating customer:", errorResponse);
        }
    };

    return (
        <main>
            <div className="w-full h-full my-10 mx-10">
                <h1 className="font-bold text-xl">Update Customer</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={customer.dob}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Member Number"
                        name="membernumber"
                        type="number"
                        value={customer.membernumber}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Interest"
                        name="interest"
                        value={customer.interest}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained">
                        Update Customer
                    </Button>
                </form>
            </div>
        </main>
    );
}
