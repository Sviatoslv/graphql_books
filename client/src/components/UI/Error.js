import React from 'react';

export const Error = ({ error }) => (
  <div>
    <h1>Error occured</h1>
    <p>Please Try again or contact our TehcService tech@mail.com</p>
    <p>{error.message}</p>
  </div>
);
