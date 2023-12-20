import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TurnService } from './turn.service';

@Controller('turn')
export class TurnController {
  constructor(private readonly turnService: TurnService) {}
}
