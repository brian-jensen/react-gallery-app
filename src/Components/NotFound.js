import React from 'react';

// Displays 404 error message if an invalid url route is entered in the browser 
const NotFound = () => (
  <div>
    <img src={require("../images/404.svg")} alt="" />
  </div>
);

export default NotFound;
