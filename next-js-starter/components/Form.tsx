"use client";

import React, { useState } from 'react';
import Input from './Input'
import Button from './Button';
import Card from './Card';


const Form: React.FC = () => {
    const [username, setUsername] = useState('');
    const [greeting, setGreeting] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setGreeting(`Hello ${username}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Welcome to Next.js Starter</h1>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            <Button type="submit">Submit</Button>
            {greeting && <Card>{greeting}</Card>}
        </form>
    );
};

export default Form; 