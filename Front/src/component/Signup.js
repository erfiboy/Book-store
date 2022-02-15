import React, { memo, useEffect, useState, useCallback, } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const Signup = () => {
    let user, pass1, pass2, name, email, fam;
    const onFinish = async (values) => {
        console.log('Success:', user);
        try {
            let ans = await fetch('http://localhost:1337/signup?username='+user+'&password='+pass1+'&secpassword='+pass2+'&email='+email+'&firstname='+name+'&lastname='+fam);
            ans = await ans.json();
            if(ans['token']==undefined){
                throw 'err';
            }
            // let t = [];
            // ans['response'].forEach((item, index) => {
            //     t.push(
            //         <div className="col-sm-3">
            //             <div className="card">
            //                 <img className="card-img-top" src={booktestimg} height='400px' alt="Card image cap" />
            //                 <div className="card-body">
            //                     <h5 className="card-title">{item['name']}</h5>
            //                     <p className="card-text">قیمت: {item['price']}</p>
            //                     <p className="card-text">نویسنده: {item['author']}</p>
            //                     <a href="#" className="btn btn-primary">اطلاعات بیشتر</a>
            //                 </div>
            //             </div>
            //         </div>
            //     )
            // })
            // upd(t);
        } catch {
            console.log('False Username or Password!');
        }
    };
    return (
        <>
            <div className='row bg-dark' style={{ paddingTop: '5%' }}>
                <div className="col-sm-12">
                    <section className="ftco-section" style={{ minHeight: '100vh', width: '90%', marginTop: '3%', textAlign: 'center', color: 'white', minHeight: '500px', display: 'block', margin: 'auto' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6 text-center mb-5">
                                    <h2 className="heading-section" style={{ color: 'white' }}>فرم ثبت نام کاربران</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-4">
                                    <div className="login-wrap p-0">
                                        {/* <h3 className="mb-4 text-center">Have an account?</h3> */}
                                        <form action="#" className="signin-form">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="نام کاربری" onChange={evt => { user = evt.target.value; }} required />
                                            </div>
                                            <div className="form-group">
                                                <input id="password-field" type="password" className="form-control" placeholder="رمز عبور" onChange={evt => { pass1 = evt.target.value; }} required />
                                                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                            </div>
                                            <div className="form-group">
                                                <input id="password-field" type="password" className="form-control" placeholder="تکرار رمز عبور" onChange={evt => { pass2 = evt.target.value; }} required />
                                                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="ایمیل" onChange={evt => { email = evt.target.value; }} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="نام" onChange={evt => { name = evt.target.value; }} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="نام خانوادگی" onChange={evt => { fam = evt.target.value; }} required />
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className="form-control btn btn-primary submit px-3" onSubmit={onFinish}>ثبت نام</button>
                                            </div>
                                        </form>
                                        <p className="w-100 text-center">&mdash; یا &mdash;</p>
                                        <div className="social d-flex text-center">
                                            <Link to='/login' className="px-2 py-2 mr-md-1 rounded" style={{ width: '100%' }} ><button style={{ width: '100%' }} className="form-control btn btn-primary submit px-3">ورود</button></Link>
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

export default React.memo(Signup)