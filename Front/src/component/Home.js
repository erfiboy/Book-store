import React, { memo, useEffect, useState, useCallback, } from 'react';
import headerimg from '../Header.jpg'
import booktestimg from '../Book.jpg'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className='bg-color' style={{ backgroundAttachment: 'fixed', backgroundImage: 'url(' + headerimg + ')', verticalAlign: 'middle', height: '400px', color: 'white' }} >
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundAttachment: 'fixed' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 style={{ color: 'white' }} className="mb-3">JefBook</h1>
                            <h4 style={{ color: 'white' }} className="mb-3">Brings you all you need!</h4>
                            <a className="btn btn-outline-light btn-lg" href="#!" role="button">Popular Books</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <img src={headerimg} style={{width: '100%'}}/> */}
        </>
    );
};

const Popbooks = () => {
    let [itemList, upd] = useState([]);
    useEffect(async () => {
        try {
            let ans = await fetch('http://localhost:1337/list');
            ans = await ans.json();
            console.log(ans['response']);
            let t = [];
            ans['response'].forEach((item, index) => {
                t.push(
                    <div className="col-sm-3">
                        <div className="card">
                            <img className="card-img-top" src={booktestimg} height='400px' alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{item['name']}</h5>
                                <p className="card-text">قیمت: {item['price']}</p>
                                <p className="card-text">نویسنده: {item['author']}</p>
                                <Link to={"/book/"+item['id']} className="btn btn-primary">اطلاعات بیشتر</Link>
                            </div>
                        </div>
                    </div>
                )
            })
            upd(t);
        } catch {
            upd('No connection to backend!');
        }
    }, []);
    return (
        <>
            <h3 className='bg-dark' style={{ color: 'white', textAlign: 'center', paddingTop: '30px', marginBottom: '-15px' }}>Popular Books</h3>
            <div style={{ padding: '2%' }} className='bg-dark'>
                <div className="row">
                    {itemList}
                </div>
            </div>
        </>
    )
}

const Home = () => {
    return (
        <>
            <Header />
            <Popbooks />
        </>
    );
};

export default React.memo(Home)