class MovieDb{
    constructor(){
        this.keyApi = "a500a4291e09f6a2ba7c43214281c000";
        this.urlImages= "http://image.tmdb.org/t/p/w154";
    }

    getMovies(query, fun) {
        let urlMovies = "https://api.themoviedb.org/3/search/movie";
        let queryString = {
            "api_key": this.keyApi,
            "query"  : query,
            "language": "pt-br",
            "page": 1
        };

        return $.get(urlMovies, queryString)
            .done(function (data) {
                fun(data);
            });
    };
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
        if (data.poster_path === null)
            {this.srcImage =  "https://s-media-cache-ak0.pinimg.com/736x/a6/e4/e0/a6e4e0205e012dd409f67bbbfd8c18ff.jpg"}
        else
            {this.srcImage = new MovieDb().urlImages + data.poster_path;}
        this.generos = this.seila(data.genre_ids);
    }

    getInstace(){
        return new Filme(this.titulo, this.tituloOriginal, this.sinopse, this.srcImage, this.anoLancamento, this.generos);
    }

    seila(idsGeneroDoFilme){
        var generos=[];
        var todosGeneros = JSON.parse(localStorage.getItem("generos"))

        for (var i in idsGeneroDoFilme){
            for (var j in todosGeneros.genres){
                if(idsGeneroDoFilme[i] === todosGeneros.genres[j].id){
                    generos.push(todosGeneros.genres[j].name);
                }
            }
        }
        return generos;
    }
}