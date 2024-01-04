import { IsInt, IsNotEmpty } from 'class-validator';

export class Statistic {
  @IsNotEmpty()
  @IsInt()
  totalMatches: number;

  @IsNotEmpty()
  @IsInt()
  winningMatches: number;
}
