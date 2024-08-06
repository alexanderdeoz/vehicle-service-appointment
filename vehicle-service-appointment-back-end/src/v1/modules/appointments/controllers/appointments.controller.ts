import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@v1/modules/appointments/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp, PublicRoute } from '@v1/shared/decorators';
import { FilterAppointmentDto } from '@v1/modules/appointments/dto/filter-appointment.dto';
import { Appointment } from '@v1/modules/appointments/entities';
import { GetParamUserId } from '@v1/modules/users/decorators';
import { GetUserById } from '@v1/modules/users/pipes';
import { User } from '@v1/modules/users/entities';

@AuthHttp()
@ApiTags(AppRoute.appointments)
@Controller({
  path: AppRoute.appointments,
  version: Version.V1,
})
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetParamUserId(GetUserById) userAuth: User,
  ) {
    return await this.appointmentsService.create(
      createAppointmentDto,
      userAuth,
    );
  }

  @Get()
  async findAll(@Query() params: FilterAppointmentDto<Appointment>) {
    return await this.appointmentsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return await this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.appointmentsService.remove(+id);
  }

  @PublicRoute()
  @Get('report-status/:id')
  async reportStatus(
    @Res() res,
    @Param('id') id: number,
  ): Promise<StreamableFile> {
    const buffer = await this.appointmentsService.reportStatus(id);
    res.type('application/pdf').send(buffer);
  }

  @PublicRoute()
  @Get('report-products-request/:id')
  async reportProductsRequest(
    @Res() res,
    @Param('id') id: number,
  ): Promise<StreamableFile> {
    const buffer = await this.appointmentsService.reportProductsRequest(+id);
    res.type('application/pdf').send(buffer);
  }
}
