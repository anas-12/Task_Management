import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalService } from '@framework/services/global.service';
import { AuthLoginInfo } from '@framework/auth/login-info';
import { AuthService } from '@framework/auth/auth.service';
import { TokenStorageService } from '@framework/auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , AfterViewInit{
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private msg: MessageService, private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private route: ActivatedRoute, private global: GlobalService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.router.navigate(['./u/prg']);
    }
  }

  ngAfterViewInit() {
    this.msg.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo();
    this.loginInfo.username = this.form.username;
    this.loginInfo.password = this.form.password;
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.global.setUid(data.uid);
        this.global.setCurrentProgramId(data.pid);
        this.global.setLogged(true);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.msg.add({severity: 'success', summary: 'Success', detail: 'Login successful'});
        this.router.navigate(['./u/prg']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message || 'Error: Unable to login. Please check your credentials.';
        this.isLoginFailed = true;
        this.msg.add({severity: 'error', summary: 'Error', detail: this.errorMessage});
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
