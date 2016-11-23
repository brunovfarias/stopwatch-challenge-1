class MovieDb{
    constructor(){
        this.keyApi = "a500a4291e09f6a2ba7c43214281c000";
        this.urlImages= "http://image.tmdb.org/t/p/w154";
        // getGenres();

    }

    getMovies(query, fun) {
        let urlMovies = "https://api.themoviedb.org/3/search/movie";
        let queryString = {
            "api_key": this.keyApi,
            "query"  : query,
            "language": "pt-br"
        };

        return $.get(urlMovies, queryString)
            .done(function (data) {
                fun(data);
            });
    };

    getGenres(){
        let urlGenres= "/genre/movie/list";
        let queryString = {
            "api_key": this.keyApi,
            "language": "pt-br"
        };

        // $.get(urlGenres, queryString)
        //     .done(function (r) {
        //         this.genres = r;
        //     });
    }

}

class Filme{
    constructor(titulo, tituloOriginal, sinopse, srcImage){
        this.titulo = titulo;
        this.tituloOriginal = tituloOriginal;
        this.sinopse = sinopse;
        this.srcImage = srcImage;
    }
}

class FilmeFactory{
    constructor(data){
        this.titulo = data.title;
        this.tituloOriginal = data.original_title;
        this.sinopse = data.overview;
        this.srcImage = new MovieDb().urlImages + data.poster_path;
    }

    getInstace(){
        return new Filme(this.titulo, this.tituloOriginal, this.sinopse, this.srcImage);
    }
}