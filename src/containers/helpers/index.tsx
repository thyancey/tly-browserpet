import React from 'react';
import { Loader } from './loader';
import { Pinger } from './pinger';
import { Saver } from './saver';


export default () => {
  return (
    <>
      <Saver />
      <Loader />
      <Pinger />
    </>
  );
}
