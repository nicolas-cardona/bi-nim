import { IsInt, IsPositive, Min, Max } from 'class-validator';
export class TurnPlayed {
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(3)
  pile: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  value: number;
}
