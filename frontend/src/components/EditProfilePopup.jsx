import PopupWithForm from "./PopupWithForm";

import React from "react";
import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="popup-edit"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        required
        id="name-input"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        name="name"
        placeholder="Ваше имя"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="profile-name-error"></span>
      <input
        type="text"
        required
        id="job-input"
        className="popup__input popup__input_type_job"
        minLength="2"
        maxLength="200"
        name="about"
        placeholder="О себе"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error" id="job-input-error"></span>
    </PopupWithForm>
  );
}
