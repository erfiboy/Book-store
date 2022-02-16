import React, { memo, useEffect, useState, useCallback, } from 'react';
import headerimg from '../Header.jpg'
import booktestimg from '../Book.jpg'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Bookspec = () => {
    let [logstate, logupd] = useState('');
    let [incard, incardupd] = useState(false);
    let [available, availableupd] = useState(false);
    let [res, resupd] = useState('');
    let { id } = useParams();
    let [des, desupd] = useState('');
    let num = 0;
    useEffect(async () => {
        if (cookies.get('token') == undefined)
            logupd('false');
        else {
            logupd('true');
            incardupd(true)
        }
        try {
            let ans = await fetch('http://localhost:1337/status?id=' + id);
            ans = await ans.json();
            desupd(ans['response']);
            availableupd(true);
            if ('true' != ans['response']['is_available']) {
                availableupd(false);
            }
            console.log(ans['response'])
        } catch (err) {
            desupd('No Connection!');
        }
    }, []);
    const add = async () => {
        if (logstate == 'false')
            resupd('<div class="alert alert-danger" role="alert">ابتدا وارد اکانت خود شوید.</div>');
        else {
            let ans = await fetch('http://localhost:1337/add-cart?id=' + id + '&number=' + num + '&token=' + cookies.get('token'));
            ans = await ans.json();
            resupd('<div class="alert alert-success" role="alert">به سبد خرید شما اضافه شد.</div>');
            console.log(ans)
        }
    }
    const del = async () => {
        if (logstate == 'false')
            resupd('<div class="alert alert-danger" role="alert">ابتدا وارد اکانت خود شوید.</div>');
        else {
            let ans = await fetch('http://localhost:1337/add-cart?id=' + id + '&number=0&token=' + cookies.get('token'));
            ans = await ans.json();
            resupd('<div class="alert alert-success" role="alert">کالا از سبد خرید شما حذف شد.</div>');
            console.log(ans)
        }
    }
    return (
        <>
            <h3 className='bg-dark' style={{ color: 'white', textAlign: 'center', paddingTop: '30px', marginBottom: '-15px', direction: 'rtl' }}>کتاب {des['name']}</h3>
            <div style={{ padding: '2%' }} className='bg-dark'>
                <div className="row" style={{ marginBottom: '2%' }}>
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-2">
                        <img className="card-img-top" src={booktestimg} style={{ textAlign: 'right' }} alt="Card image cap" />
                    </div>
                    <div className="col-sm-4" style={{ marginTop: '2%', color: 'white', direction: 'rtl', textAlign: 'right' }}>
                        نویسنده: {des['author']}<br />
                        دسته: {des['category']}<br />
                        توضیح: {des['description']}<br /><br />
                        {('true' == des['is_available']) && <div style={{ color: '#bde3bd' }}>در انبار موجود است.</div>}
                        {('true' != des['is_available']) && <div style={{ color: 'red' }}>اتمام موجودی</div>}
                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
                {available &&
                    <div className="row" style={{ marginBottom: '2%' }}>
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-4" style={{ color: 'white', direction: 'rtl', textAlign: 'right' }} >
                            <div style={{ width: '100%', backgroundColor: '#00000000', color: 'white', border: '0', textAlign: 'center' }} className="form-control px-3">
                                قیمت: {des['price']} ریال
                            </div>
                        </div>
                        <div className="col-sm-4" style={{ display: 'flex', color: 'white', direction: 'rtl', textAlign: 'right' }} >

                            <span style={{ color: 'white', width: '30%', display: 'flex' }} >
                                <div className="form-control" style={{ border: '0', backgroundColor: '#00000000', color: 'white' }} >تعداد:</div>
                                <input type="number" min="1" max="100" className="form-control" style={{ color: 'white' }} onChange={evt => { num = evt.target.value; }} />
                            </span>
                            <button onClick={add} style={{ width: '70%', marginRight: '1%' }} className="form-control btn btn-primary submit px-3">
                                به سبد خرید اضافه کن!
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16" style={{ marginRight: '3%' }}>
                                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col-sm-2">
                        </div>
                    </div>
                }
                {incard && available &&
                    <div className="row" style={{ marginBottom: '2%' }}>
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-4" style={{ color: 'white', direction: 'rtl', textAlign: 'right' }} >
                        </div>
                        <div className="col-sm-4" style={{ color: 'white', direction: 'rtl', textAlign: 'center' }} >
                            <button onClick={del} style={{ width: '100%', marginRight: '1%' }} className="form-control btn btn-primary submit px-3">
                                حذف از سبد خرید
                            </button>
                        </div>
                        <div className="col-sm-2">
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-4" style={{ color: 'white', direction: 'rtl', textAlign: 'right' }} >

                    </div>
                    <div className="col-sm-4" style={{ color: 'white', direction: 'rtl', textAlign: 'right' }} >
                        <div dangerouslySetInnerHTML={{ __html: res }}></div>
                    </div>
                    <div className="col-sm-2">
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(Bookspec)