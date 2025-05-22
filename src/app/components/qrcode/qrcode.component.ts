import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {
  selectedDevice: MediaDeviceInfo | undefined;

  formats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.ITF,         // Muito usado em boletos bancários
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39];
  result: any

  onCodeResult(result: string) {
    this.result = result;
    alert(`Código detectado: ${result}`);
    // ou: navegar, buscar dados, etc.
  }
  onScanFailure() {
    // alert('Nenhum código detectado no frame');
  }

  onScanError(error: any) {

    // alert('Erro ao escanear: ' + error);
  }

}
