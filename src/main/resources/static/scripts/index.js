class MovieDbService{
    static getKeyApi(){
        return this.keyApi = "a500a4291e09f6a2ba7c43214281c000";
    }

    static getMovies(query, fun) {
        let urlMovies = "https://api.themoviedb.org/3/search/movie";
        let queryString = {
            "api_key"  : this.getKeyApi(),
            "query"    : query,
            "language" : "pt-br",
            "page"     : 1
        };

        $.get(urlMovies, queryString)
            .done(function (data) {
                fun(data);
            });
    }

    static loadGenres(){
        let urlGenres= "https://api.themoviedb.org/3/genre/movie/list";
        let queryString = {
            "api_key"   : this.getKeyApi(),
            "language"  : "pt-br"
        };

        $.get(urlGenres, queryString)
            .done(function (g) {
                localStorage.setItem("generos", JSON.stringify(g));
            });
    }

    static getUrlImages(){
        return  "http://image.tmdb.org/t/p/w154";
    }
}

class Filme{
    constructor(titulo, tituloOriginal, sinopse, srcImage, anoLancamento, generos){
        this.titulo = titulo;
        this.tituloOriginal = tituloOriginal;
        this.sinopse = sinopse;
        this.srcImage = srcImage;
        this.anoLancamento = anoLancamento;
        this.generos = generos;
    }
}

class FilmeFactory{
    constructor(data){
        this.titulo = data.title;
        this.tituloOriginal = data.original_title;
        this.sinopse = data.overview;
        this.anoLancamento = moment(data.release_date).year();
        this.generos = this._discoverGenreName(data.genre_ids);
        this.srcImage = this._choseImage(data.poster_path);
    }

    getInstace(){
        return new Filme(this.titulo, this.tituloOriginal, this.sinopse, this.srcImage, this.anoLancamento, this.generos);
    }

    _discoverGenreName(idsGeneroDoFilme){
        let generos=[];
        let todosGeneros = JSON.parse(localStorage.getItem("generos"));

        for (var i in idsGeneroDoFilme){
            for (var j in todosGeneros.genres){
                if(idsGeneroDoFilme[i] === todosGeneros.genres[j].id){
                    generos.push(todosGeneros.genres[j].name);
                }
            }
        }
        return generos;
    }

    _choseImage(poster_path){
        if (poster_path === null){
            return "https://s-media-cache-ak0.pinimg.com/736x/a6/e4/e0/a6e4e0205e012dd409f67bbbfd8c18ff.jpg";
        }
        return this.srcImage = MovieDbService.getUrlImages() + poster_path;
    }
}