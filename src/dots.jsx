import {useState, useEffect} from 'react';

export const Dots = (props) => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const timer = setInterval(() => {
            if(dots.length >= props.maxNumber) {
                setDots('.');
            } else {
                setDots(dots + '.');
            }
        }, props.interval);
        return () => {
            clearInterval(timer);
        };
    });

    return (
        dots
    );
};