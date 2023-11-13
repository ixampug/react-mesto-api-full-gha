import { Link } from "react-router-dom";
import Auth from "./Auth";

function Register(props) {
  return (
    <Auth
      name="register"
      onSubmit={props.onRegister}
      title="Регистрация"
      buttonText="Зарегистрироваться"
    >
      <Link to="/sign-in" className="auth__enter">
        {"Уже зарегистрированы? Войти"}
      </Link>
    </Auth>
  );
}

export default Register;
