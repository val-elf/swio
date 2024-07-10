import { Injectable } from '@angular/core';
import { Api, ObjectAssistant } from './api.service';
import { IFilm } from './models/film.model';

@Injectable()
export class FilmsService {
    constructor(private api: Api) { }

    private normalize = (film: IFilm) => {
        ObjectAssistant.normalizeFields(film, ['releaseDate'], 'Date');
        ObjectAssistant.normalizeFields(film, ['episodeId'], 'number');
        ObjectAssistant.normalizeFields(film, [
            'characters',
            'planets',
            'species',
            'starships',
            'vehicles'
        ], 'id');
        return film;
    }

    async getFilms(page: number, search?: string): Promise<IFilm[]> {
        return (await this.api.getList<IFilm>('films/', { page, search }, this.normalize))!.results;
    }

    async getFilm(filmId: number) {
        return await this.api.get<IFilm>(`films/${filmId}/`, undefined, this.normalize);
    }
}
