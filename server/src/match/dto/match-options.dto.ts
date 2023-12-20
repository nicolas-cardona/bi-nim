import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PlayerRandom } from '../enums/player-random.enums';

export class MatchOptionsDto {
  @IsNotEmpty()
  @IsInt()
  piles: number;

  @IsNotEmpty()
  @IsString()
  firstPlayer: PlayerRandom;
}
