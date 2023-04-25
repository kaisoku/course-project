import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expireDate: string;
  localId: string;
  displayName?: string;
  registerd?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9f_rN3Pl-rc4zWyoLHIXaPVsG2bkGYok',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9f_rN3Pl-rc4zWyoLHIXaPVsG2bkGYok',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "Une erreur inconnu s'est produite";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          "Aucun enregistrement d'utilisateur ne correspond à cet identifiant. L'utilisateur a peut-être été supprimé";
        break;
      case 'NVALID_PASSWORD':
        errorMessage =
          "Le mot de passe n'est pas valide ou l'utilisateur n'a pas de mot de passe";
        break;
      case 'USER_DISABLED':
        errorMessage =
          "Le compte d'utilisateur a été désactivé par un administrateur.";
        break;
      case 'EMAIL_EXISTS':
        errorMessage =
          "L'adresse e-mail est déjà utilisée par un autre compte.";
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = ' La connexion par mot de passe est désactivé';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          "Nous avons bloqué toutes les demandes de cet appareil en raison d'une activité inhabituelle. Réessayez plus tard.";
        break;
    }
    return throwError(() => errorMessage);
  }
}
