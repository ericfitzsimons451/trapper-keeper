import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
    return (
      <header className="header">
        <h1>Trapper Keeper</h1>
        <NavLink to="/new-note">Create New Note</NavLink>
      </header>
    )
};