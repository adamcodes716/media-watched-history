interface ShowInterface {
   // tslint:disable-next-line: variable-name
   watcher_count: string;
   // tslint:disable-next-line: variable-name
   play_count: string;
   // tslint:disable-next-line: variable-name
   collected_count: string;
   // tslint:disable-next-line: variable-name
   collector_count: string;
   show?: {
     title: string;
     year: string;
     ids: {
       trakt: string;
       tvdb: string;
       imdb: string;
       tmdb?: string;
       tvrage: string;
     };
   };
}

export class Show {
  // tslint:disable-next-line: variable-name
  public watcher_count: string;
  // tslint:disable-next-line: variable-name
  public play_count: string;
  // tslint:disable-next-line: variable-name
  public collected_count: string;
  // tslint:disable-next-line: variable-name
  public collector_count: string;
  public show?: {
    title: string;
    year: string;
    ids: {
      trakt: string;
      tvdb: string;
      imdb: string;
      tmdb: string;
      tvrage: string;
    };
  };
}


export class ZShow {
  public id: string;
  public action: string;
  public type: string;
  // tslint:disable-next-line: variable-name
  public watched_at: string;
  public episode?: {
    ids: {
      trakt: string;
      tvdb: string;
      imdb: string;
      tmdb: string;
      tvrage: string;
    };
    season?: number;
    number: number;
    released: string;
    title: number;
    number_abs: number;
    overview: string;
    rating: number;
    votes: number;
    comment_count: number;
    first_aired: string;
    updated_at: string;
    available_translations: string;
    runtime: number;
  };
  public show?:
  {
    title: string,
    year: number,
    ids: {
      trakt: string;
      tvdb: string;
      imdb: string;
      tmdb: string;
      tvrage: string;
      slug: string;
    }
    overview: string;
    first_aired: string;
    airs:
    {
      day: string;
      time: string,
      timezone: string;
    }
    runtime: number;
    certification: string;
    country: string;
    trailer: string;
    homepage: string;
    status: string;
    rating: number;
    votes: number;
    comment_count: number;
    network: string;
    updated_at: string;
    language: string;
    available_translations;  string;
    genres: string;
    aired_episodes: string;
  };

  // constructor(title: string, year: string, released: string, url: string, trailer: string, runtime: string, tagline: string,
  // overview: string, certification: string, imdb_id: string, tmdb_id: string, images: string, genres: string, ratings: string) {}
}
