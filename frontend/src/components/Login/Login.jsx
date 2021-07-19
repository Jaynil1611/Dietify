import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts";
import {
  checkEmailAndPassword,
  getFormValues,
  useDocumentTitle,
} from "../../utils";
import { handleToast } from "../Toast/Toast";
import "./Login.css";

function Login() {
  const { loginUser, dispatch } = useProduct();
  const navigate = useNavigate();
  useDocumentTitle("Login");

  const handleUserLogin = async (email, password) => {
    return (await loginUser(email, password)) ? navigate("/") : navigate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = getFormValues(e, "login");
    if (checkEmailAndPassword(email, password)) {
      return handleUserLogin(email, password);
    }
    handleToast(dispatch, "User credentials are not valid");
  };

  const fillGuestCredentials = (e) => {
    e.target.form[0].value = "dietify@test.com";
    e.target.form[1].value = "deit123";
  };

  return (
    <>
      <div className="login__container">
        <div className="login__box">
          <div className="text--center">
            <h2> Login </h2>
          </div>
          <div className="text--left margin--md">
            <form onSubmit={handleSubmit}>
              <div className="login__input-container" role="group">
                <label
                  id="email-label"
                  htmlFor="email-input"
                  className="input__container subtitle--sm text--bold"
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
              <div className="text--center">
                <button
                  type="button"
                  className="button--submit button--width"
                  onClick={fillGuestCredentials}
                >
                  Fill Guest Credentials
                </button>
              </div>
              <button className="button--submit subtitle--sm">Sign In</button>
            </form>
            <div className="margin--top spacing--vh text--center">
              New to Dietify
              <Link to="/signup" className="join-now">
                Join now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
