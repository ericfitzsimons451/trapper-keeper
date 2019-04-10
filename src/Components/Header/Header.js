import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <h1>Trapper Keeper</h1>
      <div className='new-note-style-container'>
        <NavLink to="/new-note" className='create-new'>Create New Note</NavLink>
      </div>
    </header>
  )
};