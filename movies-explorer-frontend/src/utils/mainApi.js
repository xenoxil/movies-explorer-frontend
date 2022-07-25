export class mainApi {
    constructor(options) {
        // тело конструктора
        this._options = options;
        this._headers = this._options.headers;

    }
    
    //получаем данные профайла
    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers,
            'credentials': 'include',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    


    //патчим профайл на сервере
    editProfile(newName, newEmail) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            'credentials': 'include',
            headers: this._options.headers,
            body: JSON.stringify({
                name: newName,
                email: newEmail
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })            
    }
    changeLikeCardStatus(id, isLiked) {
        // Обычная реализация: 2 разных метода для удаления и постановки лайка.
        return fetch(`${this._options.baseUrl}/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            'credentials': 'include',
            headers: this._options.headers,
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }
    
    saveMovie({country, director, duration,year,description,trailerLink,nameEN,nameRU,id,image}){
        return fetch(`${this._options.baseUrl}/movies/`, {
            method: 'POST',
            'credentials': 'include',
            headers: this._options.headers,
            body: JSON.stringify({
                country,
        director :director,
        duration: duration,
        year: year,
        description: description,
        image:`https://api.nomoreparties.co/${image.formats.small.url}`,
        trailer: trailerLink,
        nameRU:nameRU,
        nameEN:nameEN ? nameEN : nameRU,
        thumbnail:`https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        movieId:id        
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при сохранении фильма: ${res.status}`) }
            })
            .catch(() => {
                console.log(`Ошибка при сохранении фильма`)
            })
    } 
    
    //отправка лайка 
    sendLike(id) {
        return fetch(`${this._options.baseUrl}/likes/${id}`, {
            method: 'PUT',
            'credentials': 'include',
            headers: this._options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при отправке лайка: ${res.status}`) }
            })
            .catch(() => {
                console.log(`Ошибка при отправке лайка`)
            })
    }

    //удаление лайка на сервере
    removeLike(id) {
        return fetch(`${this._options.baseUrl}/likes/${id}`, {
            method: 'DELETE',
            'credentials': 'include',
            headers: this._options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при удалении лайка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка при удалении лайка ${err}`)
            })
    }
    
  
}    
const userApi = new mainApi({
    //baseUrl: 'http://localhost:3001',
    baseUrl: 'https://xenoxil.movie-explorer.nomoreparties.sbs',
    headers: {        
        'Content-Type': 'application/json'
    }
});


export default userApi