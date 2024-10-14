import AppDataSource from "../../data-source.js";
import Genre from "../../entity/Genre.js";

export async function saveGenreIfNotExist(id: number, name: string) {
    const genreRepo = AppDataSource.getRepository(Genre);
    let genre = await getGenre(id);

    if(genre == undefined){
        genre = new Genre();
        genre.id = id;
    }

    genre.name = name;

    genreRepo.save(genre);

}

export async function getGenre(id: number) {
    const genreRepo = AppDataSource.getRepository(Genre);

    return await genreRepo.findOne({
        where: {
            id
        }
    });
}