import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { FindAllDto } from './dto/find-all.dto';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get()
  async findAll(@Query() { q }: FindAllDto) {
    return this.searchService.findAll(q);
  }
}
