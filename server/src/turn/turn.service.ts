import { Injectable } from '@nestjs/common';
import { TurnModel } from './turn.model';

@Injectable()
export class TurnService {
  constructor(private readonly turnModel: TurnModel) {}
}
