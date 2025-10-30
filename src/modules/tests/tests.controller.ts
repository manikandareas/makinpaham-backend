import { Body, Controller, Post } from '@nestjs/common';
import { GenerateTestDto } from './dto/generate-test.dto';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('generate')
  create(@Body() generateTestDto: GenerateTestDto) {
    return this.testsService.generateTest(generateTestDto);
  }
}
