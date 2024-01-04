import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Statistic } from './entities/statistic.entity';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('')
  async get(): Promise<Statistic> {
    return await this.statisticsService.get();
  }
}
