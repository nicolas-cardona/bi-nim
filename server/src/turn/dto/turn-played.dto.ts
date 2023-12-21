import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { UUID } from 'crypto';
export class TurnPlayed {
  @IsNotEmpty()
  @IsUUID()
  match_id: UUID;

  @IsInt()
  @IsPositive()
  @IsOptional()
  pile_1: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  pile_2: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  pile_3: number;
}
