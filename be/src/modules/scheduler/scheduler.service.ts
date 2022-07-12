import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  @Interval(5 * 1000)
  cleanNotActivatedUsers() {
    console.log('WORKS!!!!');
  }
}
