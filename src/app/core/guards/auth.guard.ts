  import { inject } from "@angular/core"
  import { Router } from "@angular/router"
  import { AlertService } from "../services/alert.service"
  import { UserService } from "../services/user.service"
  import { DialogService } from 'primeng/dynamicdialog';
  import { LoginComponent } from "src/app/components/login/login.component";

  export const authGuard = () => {
    const userService = inject(UserService)
    const router = inject(Router)
    const alertService = inject(AlertService)
    let dialogService = inject(DialogService)

    if (userService.isUserLogged()) {
      return true
    } else {
      alertService.confirm('Você precisar fazer o login para acessar a próxima página. Deseja continuar', 'Atenção!', () => {
        dialogService.open(LoginComponent, { header: '' });
      })
      return false
    }
  }
