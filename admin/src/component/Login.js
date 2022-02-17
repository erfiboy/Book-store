import React, { memo, useEffect, useState, useCallback, } from 'react';
import Cookies from 'universal-cookie'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const cookies = new Cookies();

const Login = () => {
    let [msg, upd] = useState('');
    console.log(cookies.get('admin_token'))
    let user, pass;
    useEffect(async () => {
        if(cookies.get('admin_token')!=undefined)
          setTimeout(() => { window.location.replace('http://localhost:3006'); }, 0);
    },[]);
    const onFinish = async (values) => {
        console.log('Success:', user);
        try {
            let ans = await fetch('http://localhost:1337/login?username=' + user + '&password=' + pass);
            ans = await ans.json();
            if (ans['token'] == undefined) {
                throw 'نام کاربری یا رمز عبور تکراری است.';
            }
            cookies.set('token', ans['token'])
            setTimeout(() => { window.location.replace('http://localhost:3006'); }, 500);
            upd('<div class="alert alert-success" role="alert">با موفقیت وارد شدید!</div>');
        } catch (err) {
            upd('<div class="alert alert-danger" role="alert">' + err + '</div>');
            console.log(err);
        }
    };

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, []);
    return (
        <>
            <div className='row bg-dark' style={{ paddingTop: '10%', height: '100vh' }}>
                <div className="col-sm-12">
                    <section className="ftco-section" style={{ minHeight: '100vh', width: '90%', marginTop: '3%', textAlign: 'center', color: 'white', minHeight: '500px', display: 'block', margin: 'auto' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6 text-center mb-5">
                                    <h2 className="heading-section" style={{ color: 'white' }}>فرم ورود کاربران</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-4">
                                    <div className="login-wrap p-0">
                                        {/* <form name="basic" className="signin-form"> */}
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="user" placeholder="نام کاربری" onChange={evt => { user = evt.target.value; }} required />
                                        </div>
                                        <div className="form-group">
                                            <input id="password-field" type="password" name="pass" className="form-control" onChange={evt => { pass = evt.target.value; }} placeholder="رمز عبور" required />
                                            <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        </div>
                                        <div className="form-group">
                                            <button htmlType="button" onClick={onFinish} className="form-control btn btn-primary submit px-3">ورود</button>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: msg }}></div>
                                        {/* </form> */}
                                        <p className="w-100 text-center">&mdash; یا &mdash;</p>
                                        <div className="social d-flex text-center">
                                            <Link to='/signup' className="px-2 py-2 mr-md-1 rounded" style={{ width: '100%' }} >
                                                <button style={{ width: '100%' }} className="form-control btn btn-primary submit px-3">
                                                    ثبت نام
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default React.memo(Login)