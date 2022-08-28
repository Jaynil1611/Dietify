import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts";
import { signUpUser } from "../../server";
import {
  checkEmailAndPassword,
  getFormValues,
  useDocumentTitle,
} from "../../utils";
import { handleToast } from "../Toast/Toast";
import "./Login.css";

function SignUp() {
  const { dispatch } = useProduct();
  const navigate = useNavigate();
  useDocumentTitle("Sign Up");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, firstname, lastname } = getFormValues(e, "signup");
    if (firstname && lastname && checkEmailAndPassword(email, password)) {
      return (await signUpUser({
        dispatch,
        firstname,
        lastname,
        email,
        password,
      }))
        ? navigate("/login")
        : navigate("");
    }
    handleToast(dispatch, "Form fields are incorrect, check again");
  };

  return (
    <>
      <div className="login__container">
        <div className="login__box">
          <div className="text--center">
            <h2> Sign Up </h2>
          </div>
          <div className="text--left margin--md">
            <form onSubmit={handleSubmit}>
              <div className="login__input-container" role="group">
                <label
                  id="firstname-label"
                  htmlFor="firstname-input"
                  className="input__container subtitle--sm text--bold"
                >
                  First Name
                  <span className="required text--primary">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname-input"
                  className="login__input"
                  required
                />
              </div>
              <div className="login__input-container" role="group">
                <label
                  id="lastname-label"
                  htmlFor="lastname-input"
                  className="input__container margin--top subtitle--sm text--bold"
                >
                  Last Name
                  <span className="required text--primary">*</span>
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname-input"
                  className="login__input"
                  required
                />
              </div>
              <div className="login__input-container" role="group">
                <label
                  id="email-label"
                  htmlFor="email-input"
                  className="input__container margin--top subtitle--sm text--bold"
                >
                  Email
                  <span className="required text--primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email-input"
                  className="login__input"
                  required
                />
              </div>
              <div className="login__input-container" role="group">
                <label
                  id="password-label"
                  htmlFor="password-input"
                  className="input__container margin--top subtitle--sm text--bold"
                >
                  Password
                  <span className="required text--primary">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password-input"
                  className="login__input"
                  required
                />
                <div className="label--helper body--md text--gray">
                  Password should be of 6 characters (including one letter &
                  number)
                </div>
              </div>
              <button className="button--submit subtitle--sm">Sign Up</button>
            </form>
            <div className="margin--top spacing--vh text--center">
              Already on Dietify
              <Link to="/login" className="join-now">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
