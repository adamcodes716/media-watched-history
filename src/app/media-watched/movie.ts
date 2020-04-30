export class Movie {

  public id: string;
  public action: string;
  public type: string;
  // tslint:disable-next-line: variable-name
  public watched_at: string;
  public movie?:
        { ids: {
          trakt: string,
          tmdb: string,
          imdb: string,
          slug: string
        },
          title: string,
          tagline: string,
          year: string,
          released: string,
          runtime: number,
          rating: number,
          trailer: string,
          overview: string,
          genres: string
        };


 // constructor(title: string, year: string, released: string, url: string, trailer: string, runtime: string, tagline: string,
// overview: string, certification: string, imdb_id: string, tmdb_id: string, images: string, genres: string, ratings: string) {}

}
