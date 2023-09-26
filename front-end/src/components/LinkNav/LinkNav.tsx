import React from 'react';
import { NavLink } from 'react-router-dom';

import LinkTabProps from '../../interfaces/LinkTabProps.interface';

import './LinkNav.scss';

function LinkNav(props: LinkTabProps) {

  return (
    <NavLink to={props.href} className="link-nav">
      {props.label}
    </NavLink>
  );
}

export default LinkNav;
