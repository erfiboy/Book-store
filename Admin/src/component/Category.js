import React, { memo, useEffect, useState, useCallback, } from 'react';
import Cookies from 'universal-cookie'
import { Nav } from "react-bootstrap";
import { fs } from 'fs'
import { withRouter } from "react-router";
import FormData from "form-data";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const cookies = new Cookies();

const Side = props => {
  let name, img, imgname;
  let [author_list, upd] = useState([]);
  useEffect(async () => {
    if (cookies.get('admin_token') == undefined)
      setTimeout(() => { window.location.replace(process.env.REACT_APP_PATH); }, 0);
    try {
      let ans = await fetch(process.env.REACT_APP_BACKEND+'category/list');
      ans = await ans.json();
      console.log(ans);
      let t = [];
      ans.forEach((item, index) => {
        if (item['image'] != undefined)
          t.push(
            <tr>
              <td>{item['name']}</td>
              <td><img src={process.env.REACT_APP_BACKEND + item['image']} width="50" /></td>
            </tr>
          )
        else
          t.push(
            <tr>
              <td>{item['name']}</td>
              <td>No Image</td>
            </tr>
          )
      })
      upd(t);
    } catch {
      upd('No connection to backend!');
    }
  }, []);
  const submit = () => {
    let token = cookies.get('admin_token');
    const formData = new FormData();
    console.log(img);

    // Update the formData object 
    formData.append(
      "image",
      img,
      imgname
    );
    formData.append(
      "name",
      name
    );
    formData.append(
      "token",
      token
    );

    // Details of the uploaded file 

    // Request made to the backend api 
    // Send formData object 
    axios.post(process.env.REACT_APP_BACKEND+"category/create", formData);
    document.location.reload(true);
  }
  return (
    <div style={{ padding: '5%' }}>
      <table class="table table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <input type="text" className="form-control" name="user" placeholder="دسته" onChange={evt => { name = evt.target.value; }} required />
            </th>
            <th>
              <input class="form-control form-control-sm" onChange={evt => { imgname = evt.target.files[0].name; img = evt.target.files[0] }} id="formFileSm" type="file" />
            </th>
            <th>
              <input class="form-control form-control-sm" onClick={submit} id="formFileSm" type="button" value="ثبت" />
            </th>
          </tr>
          {author_list}
        </tbody>
      </table>
    </div>
  );
};

export default Side