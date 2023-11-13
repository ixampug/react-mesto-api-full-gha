import PopupWithForm from "./PopupWithForm";
import React from "react";

const { useState } = React;

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="popup-add"
      title="Новое место"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        required
        id="name-card-input"
        className="popup__input popup__input_type_title"
        minLength="2"
        maxLength="30"
        name="name"
        placeholder="Название"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="name-card-input-error"></span>
      <input
        type="url"
        required
        id="image-url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="link-input-error"></span>
    </PopupWithForm>
  );
}
