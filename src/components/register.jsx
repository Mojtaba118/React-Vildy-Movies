import React, { Component } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { register } from "../services/registerService";
import auth from "./../services/authService";
import Form from "./commons/form";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  //   validate = () => {
  //     const { data } = this.state;
  //     const errors = {};
  //     if (data.username.trim() === "") {
  //       errors["username"] = "Username is Required...";
  //     }
  //     if (data.password.trim() === "") {
  //       errors["password"] = "Password is Required...";
  //     }
  //     if (data.name.trim() === "") {
  //       errors["name"] = "Name is Required...";
  //     }
  //     return Object.keys(errors).length === 0 ? null : errors;
  //   };

  //   validateProperty = ({ name, value }) => {
  //     if (name === "username") {
  //       if (value.trim() === "") {
  //         return "Username is Required...";
  //       }
  //     }

  //     if (name === "password") {
  //       if (value.trim() === "") {
  //         return "Password is Required...";
  //       }
  //     }

  //     if (name === "name") {
  //       if (value.trim() === "") {
  //         return "Name is Required...";
  //       }
  //     }
  //   };

  //   handleChange = ({ currentTarget: input }) => {
  //     const { errors } = { ...this.state };
  //     const errorMessage = this.validateProperty(input);
  //     if (errorMessage) errors[input.name] = errorMessage;
  //     else delete errors[input.name];
  //     const data = { ...this.state.data };
  //     data[input.name] = input.value;
  //     this.setState({ data, errors });
  //   };
  //   handleSubmit = e => {
  //     e.preventDefault();
  //     const errors = this.validate();
  //     this.setState({ errors: errors || {} });
  //     if (errors) return;
  //     console.log("Submitted");
  //   };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      const { headers } = await register(this.state.data);
      auth.loginWithJWT(headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
