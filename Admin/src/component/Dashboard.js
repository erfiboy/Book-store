import { Form, Input, Button, Checkbox, Card, Spin, message } from 'antd';
import React, { memo, useState, useCallback, } from 'react';
import Parse from 'parse'
import Logo from '../logo.png'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const About = () => {
  return (
    <>
      {/* <h3 style={{ textAlign: 'center', marginTop: '30px'}}>About Us</h3> */}
      <div style={{ padding: '2%', verticalAlign: 'middle', paddingTop: '10%' }}>
        <div className="row" style={{direction: 'ltr'}}>
          <div className="col-sm-2">
          </div>
          <div className="col-sm-3" style={{ borderRadius: '3px', textAlign: 'center' }}>
            <img className="card-img-top bg-dark" src={Logo} alt="Card image cap" />
          </div>
          <div className="col-sm-6" style={{ direction: 'ltr', verticalAlign: 'center', textAlign: 'left' }}>
            This website is implemented as the project of the designing web-pages course. <br />
            Groups members:
            <ul>
              <li>
                Erfan Nosrati
              </li>
              <li>
                Amirhosein Javadi
              </li>
              <li>
                Arsalan Firoozi
              </li>
            </ul> <br />
            You can see books, search in books' list, and purchase.<br /><br />
            <h4 style={{ position: 'relative', width: '50%', left: '25%' }}>
              We design,<br />
              We create,<br />
              We are rich.
            </h4>
          </div>
          <div className="col-sm-2">
          </div>
        </div>
      </div>

    </>
  );
};

export default React.memo(About)