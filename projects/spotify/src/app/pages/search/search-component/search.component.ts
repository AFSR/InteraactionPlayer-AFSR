import { Component, OnInit, Input } from '@angular/core';

// Services
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { GlobalService} from '../../../services/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() public showModal: boolean = false;

  public artistsList: any[] = [];
  public tracksList: any[] = [];
  public onSearch: boolean = false;
  public activeLanguage: string = 'en';

  constructor( private searchService: SearchService, private router: Router ) { /*empty*/ }

  ngOnInit(): void {
    this.onSearch = false;
  }

  // search both artist and track
  public search(term: string): void {
    console.log('Term to find:', term);
    this.onSearch = true;

    // update url with term
    this.router.navigate(['/spotify/search', term]);

    this.searchService.getTracksAndArtists(term).subscribe((data: any) => {
      this.artistsList = data.artists.items;
      this.tracksList = data.tracks.items;

      console.log('Data:', data);

      if (this.artistsList.length === 0 && this.tracksList.length === 0) {
        this.showModal = true;
      }

    }, (err) => {
      console.log('Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Complete!');
    });
  }
}
