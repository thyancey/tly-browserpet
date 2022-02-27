import React from 'react';
import { Loader } from './loader';
import { Pinger } from './pinger';
import { Saver } from './saver';


const Helper = () => {
  return (
    <>
      <Saver />
      <Loader />
      <Pinger />
    </>
  );
}

export default Helper;