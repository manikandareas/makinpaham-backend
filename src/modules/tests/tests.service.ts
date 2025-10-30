import { Injectable, Logger } from '@nestjs/common';
import { GenerateTestDto } from './dto/generate-test.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { GENERATE_QUESTIONS_QUEUE } from './tests.constants';
import { Queue } from 'bullmq';

@Injectable()
export class TestsService {
  private readonly logger = new Logger(TestsService.name, {
    timestamp: true,
  });

  constructor(
    @InjectQueue(GENERATE_QUESTIONS_QUEUE)
    private readonly generateQuestionsQueue: Queue,
  ) {}

  async generateTest(generateTestDto: GenerateTestDto) {
    this.logger.log('Generating test...');
    this.logger.log(generateTestDto);

    await this.generateQuestionsQueue.add('process', generateTestDto);

    return {
      message: 'Test added to queue',
    };
  }
}
