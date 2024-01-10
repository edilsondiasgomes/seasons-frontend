import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


// const swalWithPrimeButtons = Swal.mixin({
//   customClass: {
//     confirmButton: 'p-button-success',
//     cancelButton: 'p-button-danger'
//   },
//   buttonsStyling: false
// });

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  private readonly confirmButtonColor = '#b1c7c9';

  public save(text: string, title?: string) {
    this.callFire(text, title, 'success')
  }

  public error(text: string, title?: string) {
    this.callFire(text, title, 'error')
  }

  public info(text: string, title?: string) {
    this.callFire(text, title, 'info')
  }

  private callFire(text?: string, title?: string, icon?: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: this.confirmButtonColor,
      confirmButtonText: 'Fechar'
    });


  }

  public confirm(text: string, title: string, textConfirmed: string, callBackConfirmed: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#22C55E',
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: textConfirmed,
          confirmButtonColor: this.confirmButtonColor,
          confirmButtonText: 'Fechar',
          icon: "success"
        });
        callBackConfirmed();
      }
    });
  }
}
