class Api {
  constructor({ baseUrl, backUrl }) {
    this._baseUrl = baseUrl;
    this._backUrl = backUrl;
    
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInformation() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  patchInfo({ name, about }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  patchAvatar({ avatar }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  postCard(card) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        console.log("Ответ от API при переключении лайка:", data);
        return data;
      })
      .catch((error) => {
        console.error("Ошибка при переключении лайка:", error);
        throw error;
      });
  }

  login = (email, password) => { 
    return fetch(`${this._backUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}), 
    }).then(this._checkResponse)
      .then((data) => {
        if (data.token){
          localStorage.setItem('jwt', data.token);
          return data;
        }
      });
  }
  

  register = (email, password) => {
    return fetch(`${this._backUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    }).then(this._checkResponse);
  }

  checkToken() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._backUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://max.students.nomoredomainsmonster.ru/api",
  backUrl: "https://max.students.nomoredomainsmonster.ru/api"
});

export default api;
