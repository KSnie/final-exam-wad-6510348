"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function CustomerDetails({ params }) {
    const [customer, setCustomer] = useState(null);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        // Fetch customer details by ID
        const fetchCustomer = async () => {
            const response = await fetch(`/api/customer/${id}`);
            const data = await response.json();
            setCustomer(data);
        };
        fetchCustomer();
    }, [id]);

    if (!customer) return <p>Loading...</p>;

    return (
        <main>
            <div className="w-full h-full my-10 mx-10">
                <h1 className="font-bold text-xl">Customer Details</h1>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Date of Birth:</strong> {new Date(customer.dob).toLocaleDateString()}</p>
                <p><strong>Member Number:</strong> {customer.membernumber}</p>
                <p><strong>Interest:</strong> {customer.interest}</p>
                <Button variant="outlined" onClick={() => router.push('/customer')}>
                    Back to Customer List
                </Button>
            </div>
        </main>
    );
}
