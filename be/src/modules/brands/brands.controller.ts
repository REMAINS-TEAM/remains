import { Controller, Get, Query } from '@nestjs/common';
import { BrandsService } from 'modules/brands/brands.service';
import { FindAllDto } from './dto/find-all.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll(@Query() dto: FindAllDto) {
    return this.brandsService.findAll(dto);
  }
}
