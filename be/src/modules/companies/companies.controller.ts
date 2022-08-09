import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompaniesService } from 'modules/companies/companies.service';
import { FindAllDto } from './dto/find-all.dto';
import { CreateCompanyDto } from 'modules/companies/dto/create-company.dto';

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

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }
}
