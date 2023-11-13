import React from "react";

export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_fullview ${props.card ? "popup_opened" : ""}`}
      id="popup-open-image"
    >
      <div className="popup__fullscreen">
        <img
          className="popup__picture"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <h3 className="popup__subtitle">{props.card ? props.card.name : ""}</h3>
        <button
          className="popup__close popup__close_fullview"
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
