import { Component, DestroyRef, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentsHttpService } from '@app/children/core/children/scheduling/appointments/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {
  AppRoute,
  CoreRoute,
  SchedulingRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import {
  AsyncPipe,
  JsonPipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  AppointmentStatus,
  AppointmentStatusList,
} from '@app/children/core/children/scheduling/appointments/enums';
import { ChipsModule } from 'primeng/chips';
import { ErrorMessageDirective } from '@app/shared/directives';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { StepperModule } from 'primeng/stepper';
import { TagModule } from 'primeng/tag';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { ConfirmationService } from 'primeng/api';
import {
  IVehicleModel,
  IVehicleProductsProductModel,
} from '@app/children/core/children/mechanical-workshop/vehicles/models';
import {
  DamagePercentage,
  DamagePercentageList,
  ServiceStatus,
  StatusServiceList,
  TypeServiceList,
  VehicleStatus,
} from '@app/children/core/children/mechanical-workshop/vehicles/enums';
import { TableModule } from 'primeng/table';
import { Ripple } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import {
  IProductModel,
  IVehiclePartModel,
} from '@app/children/core/children/mechanical-workshop/products/models';
import { ProductsHttpService } from '@app/children/core/children/mechanical-workshop/products/services';
import { CheckboxModule } from 'primeng/checkbox';
import { SessionService } from '@app/services';
import { RoleType } from '@app/children/core/children/parameters/roles/enum';
import { BaseComponentService } from '@app/children/core/services';
import { EditorModule } from 'primeng/editor';
import { BrandsHttpService } from '@app/children/core/children/mechanical-workshop/brands/services';
import { ModelsHttpService } from '@app/children/core/children/mechanical-workshop/models/services';
import { FuelHttpService } from '@app/children/core/children/mechanical-workshop/fuels/services';
import { IBrandModel } from '@app/children/core/children/mechanical-workshop/brands/models';
import { IModelModel } from '@app/children/core/children/mechanical-workshop/models/models';
import { IFuelModel } from '@app/children/core/children/mechanical-workshop/fuels/models';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    Button,
    ToolbarModule,
    RouterLink,
    NgIf,
    AsyncPipe,
    ChipsModule,
    ErrorMessageDirective,
    CalendarModule,
    DividerModule,
    StepperModule,
    TagModule,
    TableComponent,
    TableModule,
    NgForOf,
    Ripple,
    JsonPipe,
    DropdownModule,
    CheckboxModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    EditorModule,
    InputNumberModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  public readonly general: FormGroup = this.newFormGeneral;
  public readonly vehicles: FormArray = this.general.controls[
    'vehicles'
  ] as FormArray;
  public readonly vehicleProductsProduct: FormArray = this.general.controls[
    'vehicleProductsProduct'
  ] as FormArray;
  public readonly vehicle: FormGroup = this.newFormVehicle;
  public readonly product: FormGroup = this.newFormProduct;
  public id: number = 0;
  public title: string = 'Creando agendamiento';
  public vehicleColumns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
      sortable: true,
    },
    {
      header: 'Placa',
      field: 'plate',
      sortable: true,
    },
    {
      header: 'Marca',
      field: 'brand',
      sortable: true,
    },
    {
      header: 'Modelo',
      field: 'model',
      sortable: true,
    },
    {
      header: 'Combustible',
      field: 'fuel',
      sortable: true,
    },
    {
      header: 'Kilometraje',
      field: 'mileage',
      sortable: true,
    },
    {
      header: 'Estado',
      field: 'status',
      sortable: true,
    },
    {
      header: 'Fabricado en',
      field: 'made_in',
      sortable: true,
    },
    {
      header: 'Garantía',
      field: 'warranty_up_to',
      sortable: true,
    },
    {
      header: 'Próxima revisión en',
      field: 'next_review_at',
      sortable: true,
    },
  ];
  public vehicleColumnsGeneral: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
      sortable: true,
    },
    {
      header: 'Placa',
      field: 'plate',
      sortable: true,
    },
    {
      header: 'Porcentaje de daño',
      field: 'damage_percentage',
      sortable: true,
    },
    {
      header: 'Tipo de servicio',
      field: 'type_service',
      sortable: true,
    },
    {
      header: 'Estado de servicio',
      field: 'status_service',
      sortable: true,
    },
  ];
  public products: IProductModel[] = [];
  public paginator = this.productsHttpService.paginator;
  public typeService: string[] = TypeServiceList;
  public statusService: string[] = StatusServiceList;
  public damagePercentage: string[] = DamagePercentageList;
  public appointmentStatusList: string[] = AppointmentStatusList;
  protected readonly SelectionModeEnum = SelectionModeEnum;
  protected readonly RoleType = RoleType;
  protected brands: IBrandModel[] = [];
  protected models: IModelModel[] = [];
  protected fuels: IFuelModel[] = [];

  constructor(
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly destroyRef: DestroyRef,
    private readonly activatedRoute: ActivatedRoute,
    public readonly appointmentsHttpService: AppointmentsHttpService,
    public readonly productsHttpService: ProductsHttpService,
    public readonly brandsHttpService: BrandsHttpService,
    public readonly modelsHttpService: ModelsHttpService,
    public readonly fuelHttpService: FuelHttpService,
    public readonly sessionService: SessionService,
    public readonly baseComponentService: BaseComponentService,
  ) {
    this.productsHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  // general

  public get idField(): FormControl {
    return this.general.controls['id'] as FormControl;
  }

  public get statusField(): FormControl {
    return this.general.controls['status'] as FormControl;
  }

  public get scheduled_atField(): FormControl {
    return this.general.controls['scheduled_at'] as FormControl;
  }

  public get descriptionField(): FormControl {
    return this.general.controls['description'] as FormControl;
  }

  public get valid_until_atField(): FormControl {
    return this.general.controls['valid_until_at'] as FormControl;
  }

  public get reasonField(): FormControl {
    return this.general.controls['reason'] as FormControl;
  }

  // vehicle

  public get vehicleIdField(): FormControl {
    return this.vehicle.controls['id'] as FormControl;
  }

  public get vehiclePlateField(): FormControl {
    return this.vehicle.controls['plate'] as FormControl;
  }

  public get vehicleBrandField(): FormControl {
    return this.vehicle.controls['brand'] as FormControl;
  }

  public get vehicleModelField(): FormControl {
    return this.vehicle.controls['model'] as FormControl;
  }

  public get vehicleFuelField(): FormControl {
    return this.vehicle.controls['fuel'] as FormControl;
  }

  public get vehicleMileageField(): FormControl {
    return this.vehicle.controls['mileage'] as FormControl;
  }

  public get vehicleStatusField(): FormControl {
    return this.vehicle.controls['status'] as FormControl;
  }

  public get vehicleMadeInField(): FormControl {
    return this.vehicle.controls['made_in'] as FormControl;
  }

  public get vehicleWarrantyUpToField(): FormControl {
    return this.vehicle.controls['warranty_up_to'] as FormControl;
  }

  public get vehicleNextReviewAtField(): FormControl {
    return this.vehicle.controls['next_review_at'] as FormControl;
  }

  public get damagePercentageField(): FormControl {
    return this.vehicle.controls['damage_percentage'] as FormControl;
  }

  public get typeServiceField(): FormControl {
    return this.vehicle.controls['type_service'] as FormControl;
  }

  public get statusServiceField(): FormControl {
    return this.vehicle.controls['status_service'] as FormControl;
  }

  // product

  public get child_id(): FormControl {
    return this.product.controls['child_id'] as FormControl;
  }

  public get repair(): FormControl {
    return this.product.controls['repair'] as FormControl;
  }

  public get vehicle_id(): FormControl {
    return this.product.controls['vehicle_id'] as FormControl;
  }

  public get product_id(): FormControl {
    return this.product.controls['product_id'] as FormControl;
  }

  private get newFormGeneral(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      status: new FormControl(AppointmentStatus.ISSUED, [Validators.required]),
      scheduled_at: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      valid_until_at: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      vehicles: new FormArray<FormGroup>([], []),
      vehicleProductsProduct: new FormArray<FormGroup>([], []),
    });
  }

  private get newFormVehicle(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      plate: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      fuel: new FormControl(null, [Validators.required]),
      mileage: new FormControl(null, [Validators.required]),
      status: new FormControl(VehicleStatus.IN_DISUSE, [Validators.required]),
      made_in: new FormControl(null, [Validators.required]),
      warranty_up_to: new FormControl(null, [Validators.required]),
      next_review_at: new FormControl(null, [Validators.required]),
      damage_percentage: new FormControl(DamagePercentage.PENDING, [
        Validators.required,
      ]),
      type_service: new FormControl(null, []),
      status_service: new FormControl(ServiceStatus.ON_HOLD, []),
    });
  }

  private get newFormProduct(): FormGroup {
    return new FormGroup({
      child_id: new FormControl(null, []),
      repair: new FormControl(false, [Validators.required]),
      vehicle_id: new FormControl(null, [Validators.required]),
      product_id: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.handleParams();
    this.onChangeRepairOrNo();
    this.getAllBrands();
    this.getAllModels();
    this.getAllFuels();
  }

  onSubmit(): void {
    this.general.markAllAsTouched();
    // if (this.general.valid) {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
    // }
  }

  handleParams() {
    if (!isNaN(this.activatedRoute.snapshot.params['id'])) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.title = 'Editando agendamiento';
      this.getOne();
    }
  }

  public getOne() {
    this.appointmentsHttpService
      .getOne(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const appointment = res.body?.data;
          if (res.ok && appointment) {
            this.general.reset();
            this.vehicles.clear();
            this.general.reset(appointment);
            this.scheduled_atField.patchValue(
              new Date(appointment.scheduled_at),
            );
            this.valid_until_atField.patchValue(
              new Date(appointment.valid_until_at),
            );

            for (const appointmentVehicleEntity of appointment.appointmentVehicle) {
              const fgV = this.formGroupAddVehicle({
                id: appointmentVehicleEntity.vehicle.id,
                plate: appointmentVehicleEntity.vehicle?.plate,
                brand: appointmentVehicleEntity.vehicle?.brand,
                model: appointmentVehicleEntity.vehicle?.model,
                fuel: appointmentVehicleEntity.vehicle?.fuel,
                mileage: appointmentVehicleEntity.vehicle?.mileage,
                status: appointmentVehicleEntity.vehicle?.status,
                made_in: appointmentVehicleEntity.vehicle?.made_in,
                warranty_up_to:
                  appointmentVehicleEntity.vehicle?.warranty_up_to,
                next_review_at:
                  appointmentVehicleEntity.vehicle?.next_review_at,
                damage_percentage: appointmentVehicleEntity.damage_percentage,
                type_service: appointmentVehicleEntity.type_service,
                status_service: appointmentVehicleEntity.status_service,
              });
              this.vehicles.push(fgV);
            }

            for (const iVehicleProductsProductModel of appointment.appointmentProducts) {
              this.baseComponentService.listToForm(
                [iVehicleProductsProductModel],
                (fg) => {
                  this.vehicleProductsProduct.push(fg);
                },
              );
            }
          }
        },
      });
  }

  public async backToList(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.scheduling,
      SchedulingRoute.appointments,
    ]);
  }

  public addVehicle(): void {
    this.vehicle.markAllAsTouched();
    if (this.vehicle.valid) {
      const brand = this.brands.find(
        (e) => e.id == this.vehicleBrandField.value,
      );
      const model = this.models.find(
        (e) => e.id == this.vehicleModelField.value,
      );
      const fuel = this.fuels.find((e) => e.id == this.vehicleFuelField.value);
      const fg = this.formGroupAddVehicle({
        id: this.vehicleIdField.value,
        plate: this.vehiclePlateField.value,
        brand: brand,
        model: model,
        fuel: fuel,
        mileage: this.vehicleMileageField.value,
        status: this.vehicleStatusField.value,
        made_in: this.vehicleMadeInField.value,
        warranty_up_to: this.vehicleWarrantyUpToField.value,
        next_review_at: this.vehicleNextReviewAtField.value,
        damage_percentage: this.damagePercentageField.value,
        type_service: this.typeServiceField.value,
        status_service: this.statusServiceField.value,
      });
      this.vehicles.push(fg);
    }
  }

  public addProduct(): void {
    this.product.markAllAsTouched();
    if (this.product.valid) {
      const product = this.products.find((p) => p.id == this.product_id.value);
      const productChild = this.products.find(
        (p) => p.id == this.child_id.value,
      );
      const vehicle = (this.vehicles.value as IVehicleModel[]).find(
        (v) => v.plate == this.vehicle_id.value,
      );
      const child: IVehicleProductsProductModel = {
        repair: this.repair.value,
        vehicle_id: vehicle?.id,
        product_id: productChild?.id,
        vehicle: { id: vehicle?.id, plate: vehicle?.plate },
        product: productChild,
      };
      const fg = new FormGroup({
        repair: new FormControl(this.repair.value, []),
        vehicle_id: new FormControl(vehicle?.id, [Validators.required]),
        product_id: new FormControl(product?.id, [Validators.required]),
        child_id: new FormControl(child?.id, []),
        vehicle: new FormControl(child.vehicle, [Validators.required]),
        product: new FormControl(product, [Validators.required]),
        child: new FormControl(child, []),
      });
      this.vehicleProductsProduct.push(fg);
    }
  }

  deleteQuestionVehicle(v: IVehicleModel) {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar vehículo ${v.plate}?`,
      accept: () => this.delete(v),
      reject: () => {
        //
      },
    });
  }

  public getAllProducts(): void {
    this.productsHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data && value.body.data.length > 0) {
            this.products = value.body?.data ?? [];
          }
        },
      });
  }

  onChangeRepairOrNo(): void {
    this.repair.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.child_id.setValidators([Validators.required]);
        } else {
          this.child_id.removeValidators([Validators.required]);
        }
        this.child_id.reset(value ? this.child_id.value : null);
      },
    });
  }

  public deleteQuestionProduct(p: IVehiclePartModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar producto ${p.product.name}?`,
      accept: () => this.deleteProduct(p),
      reject: () => {
        //
      },
    });
  }

  public deleteProduct(product: IVehiclePartModel): void {
    const vehicleProductsProduct = this.vehicleProductsProduct
      .value as IVehicleProductsProductModel[];
    const indexP = vehicleProductsProduct.findIndex(
      (p) => p.product_id == product.product_id,
    );
    this.vehicleProductsProduct.removeAt(indexP);
  }

  protected vehicleProductsProductByVehicle(vId: IVehicleModel) {
    const ptds = this.vehicleProductsProduct
      .value as IVehicleProductsProductModel[];
    return ptds.filter(
      (p) => !ptds.some((pS) => pS.child?.product?.id == p?.product?.id),
    );
  }

  private formGroupAddVehicle(opts: {
    id: any;
    plate: any;
    brand: any;
    model: any;
    fuel: any;
    mileage: any;
    status: any;
    made_in: any;
    warranty_up_to: any;
    next_review_at: any;
    damage_percentage: any;
    type_service: any;
    status_service: any;
  }): FormGroup {
    return new FormGroup({
      id: new FormControl(opts.id, []),
      plate: new FormControl(opts.plate, [Validators.required]),
      brand: new FormControl(opts.brand, [Validators.required]),
      model: new FormControl(opts.model, [Validators.required]),
      fuel: new FormControl(opts.fuel, [Validators.required]),
      mileage: new FormControl(opts.mileage, [Validators.required]),
      status: new FormControl(opts.status, [Validators.required]),
      made_in: new FormControl(opts.made_in, [Validators.required]),
      warranty_up_to: new FormControl(opts.warranty_up_to, [
        Validators.required,
      ]),
      next_review_at: new FormControl(opts.next_review_at, [
        Validators.required,
      ]),
      damage_percentage: new FormControl(opts.damage_percentage, [
        Validators.required,
      ]),
      type_service: new FormControl(opts.type_service, [Validators.required]),
      status_service: new FormControl(opts.status_service, [
        Validators.required,
      ]),
    });
  }

  private create(): void {
    const form = {
      status: this.statusField.value,
      scheduled_at: new Date(this.scheduled_atField.value).toISOString(),
      description: this.descriptionField.value,
      valid_until_at: new Date(this.valid_until_atField.value).toISOString(),
      reason: this.reasonField.value,
      appointmentVehicle: (this.vehicles.value ?? []).map((v: any) => ({
        id: v.appointment_vehicle_id,
        appointment_id: v.appointment_id,
        damage_percentage: v?.damage_percentage,
        type_service: v?.type_service,
        status_service: v?.status_service,
        vehicle_id: v.id,
        vehicle: {
          id: v?.id,
          plate: v?.plate,
          type: v?.type,
          fuel: v?.fuel,
          mileage: v?.mileage,
          status: v?.status,
          made_in: v?.made_in,
          warranty_up_to: v?.warranty_up_to,
          next_review_at: v?.next_review_at,
          // damage_percentage: v?.damage_percentage,
          // type_service: v?.type_service,
        },
      })),
      appointmentProducts: (this.vehicleProductsProduct.value ?? []).map(
        (vpp: any) => ({
          id: vpp?.id,
          repair: vpp?.repair,
          child_id: vpp?.child_id,
          appointment_id: vpp?.appointment_id,
          vehicle_id: vpp?.vehicle_id,
          product_id: vpp?.product_id,
          child: vpp?.child,
          appointment: vpp?.appointment,
          vehicle: vpp?.vehicle,
          product: vpp?.product,
        }),
      ),
    };
    this.appointmentsHttpService
      .create(form)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.scheduling,
              SchedulingRoute.appointments,
            ]);
          }
        },
      });
  }

  private update(): void {
    const form = {
      id: this.idField.value,
      status: this.statusField.value,
      scheduled_at: this.scheduled_atField.value,
      description: this.descriptionField.value,
      valid_until_at: this.valid_until_atField.value,
      reason: this.reasonField.value,
      appointmentVehicle: (this.vehicles.value ?? []).map((v: any) => ({
        id: v.appointment_vehicle_id,
        appointment_id: v.appointment_id,
        damage_percentage: v?.damage_percentage,
        type_service: v?.type_service,
        status_service: v?.status_service,
        vehicle_id: v.id,
        vehicle: {
          id: v?.id,
          plate: v?.plate,
          type: v?.type,
          fuel: v?.fuel,
          mileage: v?.mileage,
          status: v?.status,
          made_in: v?.made_in,
          warranty_up_to: v?.warranty_up_to,
          next_review_at: v?.next_review_at,
        },
      })),
      appointmentProducts: (this.vehicleProductsProduct.value ?? []).map(
        (vpp: any) => ({
          id: vpp?.id,
          repair: vpp?.repair,
          child_id: vpp?.child_id,
          appointment_id: vpp?.appointment_id,
          vehicle_id: vpp?.vehicle_id,
          product_id: vpp?.product_id,
          child: vpp?.child,
          appointment: vpp?.appointment,
          vehicle: vpp?.vehicle,
          product: vpp?.product,
        }),
      ),
    };
    this.appointmentsHttpService
      .update(this.id, form)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.scheduling,
              SchedulingRoute.appointments,
            ]);
          }
        },
      });
  }

  private delete(v: IVehicleModel): void {
    const index = (this.vehicles.value ?? []).indexOf(v);
    this.vehicles.removeAt(index);
  }

  private getAllBrands(): void {
    this.brandsHttpService.getAll().subscribe({
      next: (res) => {
        this.brands = res.body?.data ?? [];
      },
    });
  }

  private getAllModels(): void {
    this.modelsHttpService.getAll().subscribe({
      next: (res) => {
        this.models = res.body?.data ?? [];
      },
    });
  }

  private getAllFuels(): void {
    this.fuelHttpService.getAll().subscribe({
      next: (res) => {
        this.fuels = res.body?.data ?? [];
      },
    });
  }
}
