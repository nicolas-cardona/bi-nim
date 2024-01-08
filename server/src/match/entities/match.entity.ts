import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { UUID } from 'crypto';
import { Player } from '../enums/player.enums';

export class Match {
  @IsNotEmpty()
  @IsUUID()
  match_id: UUID;

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
}
