import React from 'react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg mt-4 bg-white">
            {children}
        </div>
    );
};

export default Card; 