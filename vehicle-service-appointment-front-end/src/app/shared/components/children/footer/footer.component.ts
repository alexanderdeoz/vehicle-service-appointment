import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DividerModule],
  template: `
    <div class="flex flex-column align-items-center bg-primary-50 mt-8">
      <div class="w-full">
        <div
          class="inline-flex flex-wrap flex-column gap-2 col-12 sm:col-6 md:col-4 lg:col-3"
        >
          <h6 class="text-primary">Empresa</h6>
          <span>Dirección: Pista de la Carolina, Quito 170506, Ecuador</span>
          <span>Empresa dedicada al servicio automotriz</span>
        </div>
        <div
          class="inline-flex flex-wrap flex-column gap-2 col-12 sm:col-6 md:col-4 lg:col-3"
        >
          <h6 class="text-primary">Contactos</h6>
          <span>Teléfono: 8131351313</span>
          <span>Email: empresa&#64;tes.com</span>
        </div>
        <div
          class="inline-flex flex-wrap flex-column gap-2 col-12 sm:col-6 md:col-4 lg:col-3"
        >
          <h6 class="text-primary">Servicios</h6>
          <span>Reparación</span>
          <span>Mantenimiento</span>
          <span>Inspección</span>
        </div>
        <div
          class="inline-flex flex-wrap flex-column gap-2 col-12 sm:col-6 md:col-4 lg:col-3"
        >
          <h6 class="text-primary">Redes</h6>
          <span>
            <i class="pi pi-facebook"></i>
            Facebook
          </span>
          <span>
            <i class="pi pi-instagram"></i>
            Instagram
          </span>
          <span>
            <i class="pi pi-telegram"></i>
            Telegram
          </span>
          <span>
            <i class="pi pi-linkedin"></i>
            Linkedin
          </span>
          <span>
            <i class="pi pi-link"></i>
            nuestra-pagina.com
          </span>
          <span>
            <i>X</i>
            Twitter
          </span>
        </div>
      </div>
      <p-divider />
      <h6 class="text-primary text-center">
        Servicio de agendamiento de servicio automotriz
      </h6>
      <small class="text-primary text-center">
        Copyright © {{ date.getFullYear() }}. Todos los derechos reservados.
      </small>
    </div>
  `,
})
export class FooterComponent {
  protected readonly date: Date = new Date();
}
