import React from 'react';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-lg p-3 mb-4 w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
        />
    );
};

export default Input; 