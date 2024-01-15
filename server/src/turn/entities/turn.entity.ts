import {
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsInt,
  Min,
  IsString,
} from 'class-validator';
import { UUID } from 'crypto';
import { Player } from '../../match/enums/player.enums';
export class Turn {
  @IsNotEmpty()
  @IsUUID()
  turn_id: UUID;

  @IsNotEmpty()
  @IsUUID()
  match_id: UUID;

  @IsNotEmpty()
  @IsString()
  next_player: Player;

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
}
