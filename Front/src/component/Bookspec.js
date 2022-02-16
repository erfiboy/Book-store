import React, { memo, useEffect, useState, useCallback, } from 'react';
import headerimg from '../Header.jpg'
import booktestimg from '../Book.jpg'
import { useParams } from 'react-router-dom';

const Bookspec = () => {
    let { id } = useParams();
    useEffect(async () => {
        try {
            let ans = await fetch('http://localhost:1337/list');
            ans = await ans.json();
            console.log(ans['response']);
        } catch (err) {

        }
    }, []);
    return (
        <>
            <h3 className='bg-dark' style={{ color: 'white', textAlign: 'center', paddingTop: '30px', marginBottom: '-15px' }}>Popular Books</h3>
            <div style={{ padding: '2%' }} className='bg-dark'>
                <div className="row">
                    {id}
                </div>
            </div>
        </>
    )
}

export default React.memo(Bookspec)