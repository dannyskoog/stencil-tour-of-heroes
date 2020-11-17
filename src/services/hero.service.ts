import axios from "axios";
import { Hero } from "../components/app-heroes/hero";
import { messageService } from "./message.service";

const API_BASE_URL = "http://localhost:4000";

class HeroService {

  /** GET heroes from the server */
  getHeroes(): Promise<Hero[]> {
    return axios.get<Hero[]>(`${API_BASE_URL}/api/heroes`)
      .then(response => {
        this.log('fetched heroes');
        return response.data;
      })
      .catch(this.handleError<Hero[]>('getHeroes', []));
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Promise<Hero> {
    return axios.get<Hero>(`${API_BASE_URL}/api/heroes/${id}`)
      .then(response => {
        this.log(`fetched hero id=${id}`)
        return response.data;
      })
      .catch(this.handleError<Hero>(`getHero id=${id}`));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Promise<void> {
    return axios.put<void>(`${API_BASE_URL}/api/heroes/${hero.id}`, hero)
      .then(() => this.log(`updated hero id=${hero.id}`))
      .catch(this.handleError<void>('updateHero'));
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Promise<Hero> {
    return axios.post<Hero>(`${API_BASE_URL}/api/heroes/`, hero)
      .then((response) => {
        this.log(`added hero w/ id=${response.data.id}`);
        return response.data;
      })
      .catch(this.handleError<Hero>('addHero'));
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Promise<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${API_BASE_URL}/api/heroes/${id}`;

    return axios.delete<Hero>(url)
      .then((response) => {
        this.log(`deleted hero id=${id}`);
        return response.data;
      })
      .catch(this.handleError<Hero>('deleteHero'));
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Promise<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return Promise.resolve([]);
    }
    return axios.get<Hero[]>(`${API_BASE_URL}/api/heroes/?q=${term}`)
      .then(response => {
        response.data.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`);

        return response.data;
      })
      .catch(this.handleError<Hero[]>('searchHeroes', []));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): T => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return result as T;
  };
}
}

export const heroService = new HeroService();
