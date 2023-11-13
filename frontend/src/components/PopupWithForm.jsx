export default function PopupWithForm(props) {
  const popupClassName = `popup popup_type_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;
  // написать пропс buttonname
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonName}
          </button>
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть"
            onClick={handleClose}
          />
        </form>
      </div>
    </div>
  );
}
