import React, { Component } from "react";

class Like extends Component {
  render() {
    let className = "fa fa-heart";
    className += this.props.liked ? "" : "-o";
    return (
      <i
        className={className}
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
      />
    );
  }
}

export default Like;
