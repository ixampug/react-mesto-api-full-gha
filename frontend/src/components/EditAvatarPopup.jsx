import PopupWithForm from "./PopupWithForm";

import React, { useEffect } from "react";

import { useRef } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popupUpdateAvatarForm"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        required
        id="link-avatar-input"
        className="popup__input popup__input_type_link"
        name="avatar"
        placeholder="Ссылка на фото"
        ref={avatarRef}
      />
      <span className="popup__error" id="link-avatar-input-error"></span>
    </PopupWithForm>
  );
}
