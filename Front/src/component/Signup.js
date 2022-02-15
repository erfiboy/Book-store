import React, { memo, useEffect, useState, useCallback, } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div className='row bg-dark' style={{paddingTop: '5%'}}>
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
                                        {/* <h3 className="mb-4 text-center">Have an account?</h3> */}
                                        <form action="#" className="signin-form">
                                        <div className="form-group">
                                                <input type="text" className="form-control" placeholder="نام کاربری" required />
                                            </div>
                                            <div className="form-group">
                                                <input id="password-field" type="password" className="form-control" placeholder="رمز عبور" required />
                                                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                            </div>
                                            <div className="form-group">
                                                <input id="password-field" type="password" className="form-control" placeholder="تکرار رمز عبور" required />
                                                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="ایمیل" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="نام" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="نام خانوادگی" required />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="form-control btn btn-primary submit px-3">ثبت نام</button>
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

export default React.memo(Login)