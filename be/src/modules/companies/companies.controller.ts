import { Controller, Get, Query } from '@nestjs/common';
import { CompaniesService } from 'modules/companies/companies.service';
import { FindAllDto } from './dto/find-all.dto';

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
}
