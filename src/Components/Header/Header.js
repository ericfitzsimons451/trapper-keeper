import React, { Component } from "react";
import App from "../../Containers/App/App";
import { connect } from "react-redux";
import { fetchAllNotes } from "../../Thunks/fetchAllNotes";
import "./Header.scss";

export const Header = class extends Component {
  render() {
    return <div>I am a stateless header</div>;
  }
};
