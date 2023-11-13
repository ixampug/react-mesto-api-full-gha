import React, { useState, useCallback, useEffect } from "react";

export default function Auth(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isFormValid = Object.values(errors).every((error) => !error);
    setIsValid(isFormValid);
  }, [errors]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      props.onSubmit(values.email, values.password);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return (
    <form className="auth" name={props.name} onSubmit={handleSubmit} noValidate>
      <h3 className="auth__title">{props.title}</h3>
      <input
        type="email"
        id="login-input"
        name="email"
        value={values.email || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        className="auth__input"
        placeholder="Email"
        required
      />
      <span className="auth__input auth__input_type_error">{errors.email}</span>
      <input
        type="password"
        id="password"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        minLength="2"
        className="auth__input"
        placeholder="Пароль"
        required
      />
      <span className="auth__input auth__input_type_error">
        {errors.password}
      </span>
      <button
        type="submit"
        className={`auth__submit ${!isValid && `auth__submit_disabled`}`}
        disabled={!isValid}
      >
        {props.buttonText}
      </button>
      {props.children}
    </form>
  );
}
