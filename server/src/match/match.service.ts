import { Injectable } from '@nestjs/common';
import { MatchModel } from './match.model';

@Injectable()
export class MatchService {
  constructor(private readonly matchModel: MatchModel) {}
}
