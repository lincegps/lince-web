import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  notificarSucesso(msg: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  notificarWarning(msg: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: msg,
    });
  }

  notificarWarningComOnClose(msg: string, onClose): void {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: msg,
      onClose: () => onClose(),
    }).then((result) => {
      if (result) {
        onClose();
      }
    });
  }

  confirmDialog(title: string, msg: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: msg,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    });
  }

  notificarError(
    titulo: string,
    detalhe: string,
    erro: HttpErrorResponse,
    icon: string = 'error'
  ): void {
    const htmlTitle = `<p class='mt-10'>${titulo}</p>`;

    let title = 'Ocorreu um erro';

    let footer;

    let isAlerta: boolean;

    if (erro && [400, 401, 402, 403, 404].includes(erro.status)) {
      icon = 'warning';
      title = 'Atenção!';
      isAlerta = true;
    }

    if (detalhe) {
      const htmlDetail = `
        <div class='box-log'>
          <div class='box-log-description'>
            ${detalhe}
          </div>
        </div>
      `;
      footer = htmlDetail;
    } else if (isAlerta && erro && erro.error && erro.error.detail) {
      const detail = erro.error.detail;
      const htmlDetail = `
        <div class='box-log'>
          <div class='box-log-description'>
           (${erro.error.status}) - ${detail}
          </div>
        </div>
      `;
      footer = htmlDetail;
    }

    const options: any = {
      icon,
      title,
      html: htmlTitle,
      customClass: {
        container: 'box-class-modal-sweetalert',
        confirmButton: 'sweetalert-btn sweetalert-btn-confirm',
        cancelButton: 'sweetalert-btn sweetalert-btn-info',
      },
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-check-circle"></i> OK',
      cancelButtonText: '<i class="fa fa-info-circle"></i>',
      footer,
    };
    Swal.fire(options).then((res: any) => {
      if (res && res.dismiss === 'cancel') {
        const logErroElemento: HTMLElement = document.getElementById(
          'log-erro-menu'
        );
        setTimeout(() => {
          if (logErroElemento) {
            logErroElemento.click();
          }
        }, 500);
      }
    });
  }
}
