import { element } from 'protractor';
import { TranslateService } from './../shared/services/translate.service';
import { SSEService } from './../shared/services/sse.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../shared/services/http.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { keywords as PageTextWords } from './login.constants';
import { MatSnackBar } from '@angular/material';

declare var particlesJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  public htmlPageText: any;

  public currentLanguageIsEnglish: boolean;
  constructor(
    public fb: FormBuilder,
    public http: HttpService,
    public auth: AuthService,
    public sse: SSEService,
    public router: Router,
    public translateService: TranslateService,
    public snackBar: MatSnackBar
  ) {
    this.myForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.currentLanguageIsEnglish = true;
    this.htmlPageText = [];
    PageTextWords['ENGLISH'].forEach((el: any) => {
      this.htmlPageText[el.key] = el.value;
    });
  }

  ngOnInit() {
    // ParticlesJS Config.
    particlesJS('particles-js', {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': true,
            'value_area': 700
          }
        },
        'color': {
          'value': '#ffffff'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 5
          }
        },
        'opacity': {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 150,
          'color': '#ffffff',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 4,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'grab'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 140,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 7
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    });


  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Close", { duration: 1000 });
  }

  toggleLanguage() {

    this.currentLanguageIsEnglish = !this.currentLanguageIsEnglish;
    console.log("changed to", this.currentLanguageIsEnglish)
    if (!this.currentLanguageIsEnglish) {
      console.log('translating to hindi');
      PageTextWords['HINDI'].forEach((el: any) => {
        this.htmlPageText[el.key] = el.value;
      });
    }
    else {
      console.log("shoukd change to English", this.currentLanguageIsEnglish)
      PageTextWords['ENGLISH'].forEach((el: any) => {
        this.htmlPageText[el.key] = el.value;
      });

    }


  }

  submitCredentials(data) {
    let request: any;
    request = {
      email: data.username,
      password: data.password
    };
    if (request.password != null) {
      this.myForm.reset();
      this.auth.empty();
      // this.router.navigateByUrl('/admin');
      this.http.verifyUser(request)
        .subscribe(
          (response: any) => {
            console.log(response.token);
            if (response.status === 'LOGIN') {
              // console.log('Here!');
              this.auth.storeStatus(response.token, response.designation);
              this.sse.establishSSE();
              if (response.designation === 'admin') {
                this.router.navigateByUrl('/admin');
              } else if (response.designation === 'gc') {
                this.router.navigateByUrl('/gc');
              } else if (response.designation === 'gc') {
                this.router.navigateByUrl('/gc');
              } else if (response.designation === 'ra') {
                this.router.navigateByUrl('/requesting_authority');
              } else {
                this.router.navigateByUrl('/user');
              }
            }
          },
          (error) => {
            console.log("Error");
            this.openSnackBar("Wrong Credentials!");
            if (error.status === 'INVALID_CRED') {

            }
            // this.router.navigateByUrl('/admin');
          });
    } else {
      this.openSnackBar("Please enter credentials!");
    }

  }

}
