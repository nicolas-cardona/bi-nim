import { IsNotEmpty, IsUUID, IsDateString, IsInt, Min } from 'class-validator';
import { UUID } from 'crypto';
export class Turn {
  @IsNotEmpty()
  @IsUUID()
  turn_id: UUID;

  @IsNotEmpty()
  @IsUUID()
  match_id: UUID;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  integer_1: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  integer_2: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  integer_3: number;

  @IsNotEmpty()
  @IsInt()
  turn_order: number;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsNotEmpty()
  @IsDateString()
  updated_at: Date;

  @IsDateString()
  deleted_at: Date;
}
