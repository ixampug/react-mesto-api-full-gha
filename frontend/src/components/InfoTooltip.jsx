import success from "../images/galochka.svg";
import fail from "../images/krestick.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="auth__image"
          src={props.isSucceeded ? success : fail}
          alt={props.isSucceeded ? "Успешно" : "Ошибка"}
        />
        <p className="auth__text">
          {props.isSucceeded
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
