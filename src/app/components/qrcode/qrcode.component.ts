import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {

  formats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];

  onCodeResult(result: string) {
    console.log('Código lido:', result);
    // aqui você pode redirecionar, buscar no banco, etc.
  }

}
