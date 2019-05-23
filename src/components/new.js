import Profile from './profile';
import React from 'react';

export default ({ ...props }) => (
  <Profile
    name="New profile"
    { ...props }
  />
);
