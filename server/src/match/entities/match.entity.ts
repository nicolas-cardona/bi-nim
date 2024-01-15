import { IsNotEmpty, IsUUID, IsString, IsDateString } from 'class-validator';
import { UUID } from 'crypto';
import { Player } from '../enums/player.enums';

export class Match {
  @IsNotEmpty()
  @IsUUID()
  match_id: UUID;

  @IsString()
  winner: Player;

  @IsDateString()
  match_finished: Date;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;
}
