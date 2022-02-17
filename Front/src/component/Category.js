import React, { memo, useEffect, useState, useCallback, } from 'react';
import { useParams } from 'react-router-dom';
import Parse from 'parse'
import unkcat from '../Book.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Writers = () => {
  let { name } = useParams();
  console.log(name);
  let [author_list, upd] = useState([]);
  useEffect(async () => {
    try {
      let ans = await fetch('http://localhost:1337/category/list');
      ans = await ans.json();
      console.log(ans);
      let t = [];
      ans.forEach((item, index) => {
        if (item['image'] != undefined)
          t.push(
            <div className="col-sm-3" style={{ display: 'flex' }}>
              <div className="card">
                <img className="card-img-top" src={'http://localhost:1337/' + item['image']} height='400px' alt="Card image cap" />
                <div className="card-body bg-dark" style={{ textAlign: 'center' }}>
                  <Link to={"/category/" + item['name']}>
                    {item['name']}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '2%' }} width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )
        else
          t.push(
            <div className="col-sm-3" style={{ display: 'flex' }}>
              <div className="card">
                <img className="card-img-top" src={unkcat} height='400px' alt="Card image cap" />
                <div className="card-body bg-dark" style={{ textAlign: 'center' }}>
                  <Link to={"/category/" + item['name']}>
                    {item['name']}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '2%' }} width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </Link>
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
      <h3 style={{ textAlign: 'center', marginTop: '30px' }}>دسته ها</h3>
      <div style={{ padding: '2%' }}>
        <div className="row" style={{ direction: 'rtl' }}>
          {author_list}
        </div>
      </div>

    </>
  );
};

export default React.memo(Writers)