import { IsNotEmpty, IsString } from 'class-validator';
import { ComputerStrategy } from '../enums/computer-strategy.enums';
export class StrategySelected {
  @IsNotEmpty()
  @IsString()
  strategy: ComputerStrategy;
}
