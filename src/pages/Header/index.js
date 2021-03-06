import styled from 'styled-components'
import React from "react";
import { NavLink } from 'react-router-dom'

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #3f3f3f;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  height: 56px;
  color: #ffffff;
`;

const Nav = styled.span`
  display: inline-flex;
  height: 100%;
  margin-left: 23px;
  
  & > a {
    display: inline-flex;
    height: 100%;
    align-items: center;
    opacity: 0.5;
    color: #fff;
    text-decoration: none;

    &.active {
      opacity: 0.8;
    }
  }
  
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  cursor: pointer;
`

export default function Header() {
  return (
    <Wrapper>
      <Nav>
        <NavLink
          exact
          activeClassName="active"
          to="/"
          isActive={(match, location) => {
            return location.pathname === '/' || (location.pathname || '').startsWith('/ksm')
          }}
        >
          Kusama
        </NavLink>
      </Nav>
      <Nav>
        <NavLink
          exact
          activeClassName="active"
          to="/dot"
          isActive={(match, location) => {
            return (location.pathname || '').startsWith('/dot')
          }}
        >
          Polkadot
        </NavLink>
      </Nav>
    </Wrapper>
  )
}
