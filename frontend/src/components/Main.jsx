import React, { useEffect, useContext, useState } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <button
            className="profile__change-photo"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__photo"
              src={currentUser.avatar}
              alt="Фотография профиля"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="Редактировать"
              className="profile__edit"
              type="button"
              onClick={props.onEditProfile}
            />
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}
