import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register, login } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

// Validation schema for the registration form
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  surname: Yup.string().required("Surname is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Validation schema for the login form
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration forms
  const dispatch = useDispatch(); // Hook to dispatch actions
  const users = useSelector((state) => state.user.users); // Selector to get the list of users
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Initial values for login form
  const initialLoginValues = {
    username: "",
    password: "",
  };

  // Initial values for registration form
  const initialRegisterValues = {
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  };

  // Function to handle user registration
  const handleRegister = (values, { setSubmitting, resetForm }) => {
    // Process and clean up username and email
    const username = values.username
      ? values.username.trim().toLowerCase()
      : "";
    const email = values.email ? values.email.trim().toLowerCase() : "";

    // Debugging: Log processed values
    console.log("Processed username:", username);
    console.log("Processed email:", email);

    // Check if the username or email already exists in the user list
    const userExists = users.some(
      (user) =>
        (user.username && user.username.toLowerCase() === username) ||
        (user.email && user.email.toLowerCase() === email)
    );

    if (userExists) {
      // Alert if user exists and stop form submission
      alert("Username or email already exists");
      setSubmitting(false);
      return;
    }

    // Create a new user object
    const newUser = {
      id: new Date().getTime(), // Unique ID based on timestamp
      firstName: values.firstName,
      surname: values.surname,
      username: username,
      email: email,
      password: values.password, // Password is stored as is
    };

    // Dispatch registration and login actions
    dispatch(register(newUser));
    dispatch(login(newUser));

    // Reset form and navigate to home page
    setSubmitting(false);
    resetForm();
    navigate("/");
  };

  // Function to handle user login
  const handleLogin = (values, { setSubmitting, resetForm }) => {
    // Process and clean up username and password
    const username = values.username
      ? values.username.trim().toLowerCase()
      : "";
    const password = values.password ? values.password.trim() : "";

    // Find user matching username and password
    const user = users.find(
      (user) =>
        user.username &&
        user.username.toLowerCase() === username &&
        user.password &&
        user.password === password
    );

    if (!user) {
      // Alert if user is not found and stop form submission
      alert("Invalid username or password");
      setSubmitting(false);
      return;
    }

    // Dispatch login action
    dispatch(login(user));

    // Reset form and navigate to home page
    setSubmitting(false);
    resetForm();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h1>Authentication Page</h1>
      <div className="toggle-buttons">
        {/* Buttons to toggle between login and registration */}
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Register
        </button>
      </div>
      {isLogin ? (
        <div className="form-container">
          <h2>Login</h2>
          <Formik
            initialValues={initialLoginValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <label htmlFor="username">Username</label>
                  <Field type="text" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="form-container">
          <h2>Register</h2>
          <Formik
            initialValues={initialRegisterValues}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <Field type="text" name="firstName" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="surname">Surname</label>
                  <Field type="text" name="surname" />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="username">Username</label>
                  <Field type="text" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
