import { Component } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {FormBuilder, FormGroup} from "@angular/forms";

const GET_MESSAGE = gql`
  query GetTestMessage {
    testMessage
  }
`;

const GET_MOVIES = gql`
  query GetMovies($search: String!) {
    imdb(search: $search) {
      results {
        image {
          url
        },
        title
      }
    }
    moviesdb(search: $search) {
      Search {
        Title,
        Poster
      }
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular-client';
  public searchForm: FormGroup;
  public testMessage?: string;
  public movies?: any;
  public imdb?: any;
  public loading = true;
  public error: any;

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: [""]
    })
  }

  ngOnInit() {
  }

  searchMovies() {
    console.log(this.searchForm);
    this.apollo
    .query({
      query: GET_MOVIES,
      variables: {
        search: this.searchForm.value.search
      }
    })
    .subscribe((result: any) => {
      console.log('result: ', result);
      // this.testMessage = result?.data?.testMessage;
      this.movies = result?.data?.moviesdb?.Search;
      this.imdb = result?.data?.imdb?.results;
      console.log('this.imdb: ', this.imdb);
      console.log('this.movies: ', this.movies);
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
