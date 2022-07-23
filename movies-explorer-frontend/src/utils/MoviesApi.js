export class movieApi {
    constructor(options) {
        // тело конструктора
        this._options = options;
        this._headers = this._options.headers;

    }
    //получаем карточки с сервера
    getMovies() {
        // ...
        return fetch(`${this._options.baseUrl}/`, {
            headers: this._options.headers,            
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
    }
    
    
   
}    

const moviesListApi = new movieApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {        
        'Content-Type': 'application/json'
    }
});


export default moviesListApi



