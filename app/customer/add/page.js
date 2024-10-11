"use client";

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';

export default function AddCustomer() {
    const [customer, setCustomer] = useState({
        name: '',
        dob: '',
        membernumber: '',
        interest: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (response.ok) {
            router.push('/customer');
        }
    };

    return (
        <main>
            <div className="w-full h-full my-10 mx-10">
                <h1 className="font-bold text-xl">Add New Customer</h1>
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
                        Add Customer
                    </Button>
                </form>
            </div>
        </main>
    );
}
