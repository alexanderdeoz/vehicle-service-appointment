import { Confirmation } from 'primeng/api';

export const ConfirmationServiceConfig: Confirmation = {
  header: 'Confirmar',
  dismissableMask: true,
  message: 'Do you want to delete this record?',
  icon: 'pi pi-info-circle',
  acceptButtonStyleClass: 'p-button-text p-button-text',
  rejectButtonStyleClass: 'p-button-danger p-button-text',
};
