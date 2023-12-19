import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { UUID } from 'crypto';
import { Player } from '../enums/player.enums';

export class Match {
  @IsNotEmpty()
  @IsUUID()
  match_id: UUID;

  @IsNotEmpty()
  @IsInt()
  integer_1: number;

  @IsNotEmpty()
  @IsInt()
  integer_2: number;

  @IsNotEmpty()
  @IsInt()
  integer_3: number;

  @IsNotEmpty()
  @IsString()
  first_player: Player;

  @IsString()
  winner: Player;

  @IsNotEmpty()
  @IsBoolean()
  match_finished: boolean;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsNotEmpty()
  @IsDateString()
  updated_at: Date;

  @IsDateString()
  deleted_at: Date;
}
