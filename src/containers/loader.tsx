import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { jsonc } from 'jsonc';
import { setPet } from '../services/petstore';
import { PetDefinition } from '../types';

const readIt = (dispatch:any) => {
  const url =  `assets/data.jsonc`;

  fetch(url, {
    mode: 'cors'
  })
    .then(res => res.text())
    .then(
      text => jsonc.parse(text), 
      err => {
        console.error(`Error fretching item from ${url}`, err);
      }
    ) //- bad url responds with 200/ok? so this doesnt get thrown
    .then(
      json => {
        console.log(`data was read successfully`, json);
        json.forEach((petDef: PetDefinition) => {
          dispatch(setPet(petDef));
        });

        return true;
      }, 
      err => {
        console.error(`Error parsing (the url (${url}) was bad), skipping`, err?.stack || err);
      }
    );
}

export const Loader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    readIt(dispatch);
  }, [])

  return (null)
}
