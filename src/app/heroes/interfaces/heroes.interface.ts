export interface Heroe {
    id?:              string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string;
}

//hemos añadido ? en id porque cuando nosotros creeemos un nuevo heroe puede que no tengamos el id.

//hemos credo alt_img y le añadimos ? por lo mismo que arriba. Será una url

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}