import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterUserDto } from 'src/app/models/RegisterUserDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  user = new RegisterUserDto();
  private suscription: Subscription;
  sexo = 'Masculino';
  loading = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.suscription) this.suscription.unsubscribe();
  }

  register() {
    this.loading = true;
    this.user.sexo = this.sexo;
    this.suscription = this.authService.register(this.user).subscribe((res) => {
      this.loading = true;
      this.router.navigate(['/home']);
    });
  }
}
