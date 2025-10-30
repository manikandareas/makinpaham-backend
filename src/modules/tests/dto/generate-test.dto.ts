import { QuestionType } from '@prisma/client';
import { IsEnum, IsPositive } from 'class-validator';

export class GenerateTestDto {
  @IsPositive()
  questionCount: number;

  @IsEnum(QuestionType, { each: true })
  questionTypes: QuestionType[];
}
