import { Movie } from '../media-watched/movie';
import { Component, OnInit } from '@angular/core';
import { Show } from '../media-watched/show';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaWatchedDataService } from './media-watched-data.service';

class MoviePoster {
  constructor(
    // tslint:disable-next-line: variable-name
    public backdrop_path: string,
    public overview: string,
  ) {}
}

@Component({
  templateUrl: './media-watched-detail.component.html',
  styleUrls: ['./media-watched-detail.component.scss']

})
export class MediaWatchedDetailComponent implements OnInit {
  pageTitle = 'Movie';
  mediaMovie: Movie;
  mediaShow: Show;
  moviePoster: any;
  moviePosterUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, public mediaWatchedDataService: MediaWatchedDataService ) {
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    // tslint:disable-next-line: prefer-const
    let id: number = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.mediaWatchedDataService.getMovie(id).subscribe({
    // this.mediaWatchedDataService.getMovies().subscribe({
      next:  movie => {
        this.mediaMovie = movie[0];
        this.mediaWatchedDataService.getMediaPoster('movie', id.toString()).subscribe({
           next:  data => {
          console.log (data.poster_path);
          this.moviePosterUrl = ('https://image.tmdb.org/t/p/w500/' + data.poster_path);
          this.moviePoster = data;
     },
       });
      },
     });
    // this.mediaWatchedDataService.getMediaPoster('movie', id.toString()).subscribe({
    // next:  data => {
    //  console.log (data.poster_path);
    //  this.moviePosterUrl = ('https://image.tmdb.org/t/p/w500/' + data.poster_path);
    //  this.moviePoster = data;
    // },
   // });

  }

  onBack(): void{
    this.router.navigate(['/mediawatched']);
  }

}
