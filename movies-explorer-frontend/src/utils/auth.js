export class Auth {
  constructor(options) {
    // тело конструктора
    this._options = options;
    this._headers = this._options.headers;
  }

  register(email, password,name) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",     
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  login(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  logout() {
    return fetch(`${this._options.baseUrl}/signout`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },     
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

 
}

const auth = new Auth({
 // baseUrl: 'http://localhost:3001',
  baseUrl: "https://xenoxil.movie-explorer.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
