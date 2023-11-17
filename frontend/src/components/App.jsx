import React, { useState, useEffect } from "react";
import { Route, Switch, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";

import ProtectedRoute from "./ProtectedRoute";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";

export default function App() {
  const [isEditProfilePopupOpen, openEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, openAddCardPopup] = useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopup] = useState(false);
  const [selectedCard, openCardPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  // const [isRegistrationOpen, setRegistrationOpen] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInformation(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUserEmail(res.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEditAvatarClick() {
    openEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    openEditProfilePopup(true);
  }

  function handleAddCardClick() {
    openAddCardPopup(true);
  }

  function closeAllPopups() {
    openEditProfilePopup(false);
    openAddCardPopup(false);
    openEditAvatarPopup(false);
    openCardPopup(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    openCardPopup(card);
  }

  function handleCardLike(card) {
    // const isLiked = card.likes.some((id) => id === currentUser._id);
    const isLiked = card.likes.some((id) => String(id) === String(currentUser._id));

    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        console.log("Обновленные данные карточки:", newCard);
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.error("Ошибка при переключении лайка:", error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddCard(card) {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUserInfo({ name, about }) {
    api
      .patchInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegistration(email, password) {
    api
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSucceeded(true);
          setIsInfoTooltipPopupOpen(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        setIsSucceeded(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin(email, password) {
    api
      .login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setCurrentUserEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsSucceeded(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function logOut() {
    localStorage.removeItem("jwt");
    setCurrentUserEmail("");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header currentUserEmail={currentUserEmail} onLogout={logOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration}></Register>}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin}> </Login>}
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUserInfo}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <Footer />

        <PopupWithForm
          name="card-delete"
          title="Вы уверены?"
          buttonName="Да"
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSucceeded={isSucceeded}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
