import React, { memo, useState, useCallback, } from 'react';
import Logo from '../logo.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const P404 = () => {
  return (
    <>
      Not found!
    </>
  );
};

export default React.memo(P404)