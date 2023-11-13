import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((like) => like === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card">
      <img
        className="card__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__table">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeClick}
            src={props.card.link}
          />
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__delete"
          aria-label="Удалить"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
    </div>
  );
}
