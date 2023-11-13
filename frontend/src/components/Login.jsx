import Auth from "./Auth";

function Login(props) {
  return (
    <Auth
      name="login"
      onSubmit={props.onLogin}
      title="Вход"
      buttonText="Войти"
    ></Auth>
  );
}

export default Login;
