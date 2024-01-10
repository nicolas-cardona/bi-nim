import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { PlayerRandom } from '../enums/player-random.enums';

export class MatchOptionsDto {
  @IsNotEmpty()
  @IsInt()
  @Min(2)
  @Max(3)
  piles: number;

  @IsNotEmpty()
  @IsString()
  firstPlayer: PlayerRandom;
}
