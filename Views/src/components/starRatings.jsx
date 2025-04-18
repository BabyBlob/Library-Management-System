import React from 'react';
import { FaStar } from 'react-icons/fa';

export const StarRatings = ({ rating, onRatingChange, interactive = true }) => {
    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                    <FaStar 
                        key={i} 
                        size={30} 
                        color={starValue <= rating ? "#ffc107" : "#e4e5e9"} 
                        onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    />
                );
            })}
        </div>
    );
};

export default StarRatings;