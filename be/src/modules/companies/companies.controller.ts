import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from 'modules/companies/companies.service';
import { FindAllDto } from './dto/find-all.dto';
import { CreateCompanyDto } from 'modules/companies/dto/create-company.dto';
import { GetIsPaidOrAdminGuard } from 'guards/getIsPaidOrAdmin.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}
  @Get()
  async findAll(@Query() { name }: FindAllDto) {
    return this.companiesService.findAll(name);
  }
  @Get('types')
  async findAllTypes() {
    return this.companiesService.findAllTypes();
  }

  @Get(':id')
  @UseGuards(GetIsPaidOrAdminGuard)
  async findOne(@Param() params: { id: string }) {
    return this.companiesService.findOne(+params.id);
  }

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }
}
