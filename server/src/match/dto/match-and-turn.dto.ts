import { Match } from '../entities/match.entity';
import { Turn } from '../../turn/entities/turn.entity';
import { IsNotEmpty } from 'class-validator';

export class MatchAndTurnDto {
  @IsNotEmpty()
  match: Match;

  @IsNotEmpty()
  turn: Turn;
}
