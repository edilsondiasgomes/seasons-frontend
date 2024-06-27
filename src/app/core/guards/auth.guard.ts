import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AlertService } from "../services/alert.service"
import { UserService } from "../services/user.service"

export const authGuard = () => {
  const userService = inject(UserService)
  const router = inject(Router)
  const alertService = inject(AlertService)

  if (userService.isUserLogged()) {
    return true
  } else {
    alertService.confirm('Você precisar fazer o login para acessar a próxima página. Deseja continuar', 'Atenção!', () => {
      router.navigateByUrl('login')
    })
    return false
  }
}
