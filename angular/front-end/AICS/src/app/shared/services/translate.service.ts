import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers,RequestOptions } from '@angular/http';
@Injectable()
export class TranslateService {
    public baseURI = environment.serverUrl;

    constructor(
        private http: HttpClient,
    ) { }

    translate(text: string): any { 
        return this.http.post(this.baseURI + '/translate', {
            'data': {
                'key': text
            }
        });
    }
}
