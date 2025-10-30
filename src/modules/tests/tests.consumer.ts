import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';

import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { GenerateTestDto } from './dto/generate-test.dto';
import { GENERATE_QUESTIONS_QUEUE } from './tests.constants';

@Processor(GENERATE_QUESTIONS_QUEUE)
export class TestsConsumer extends WorkerHost {
  private readonly logger = new Logger(TestsConsumer.name, {
    timestamp: true,
  });

  async process(job: Job<GenerateTestDto>) {
    this.logger.log(`Processing job ${job.id}`);

    await new Promise((resolve) => setTimeout(resolve, 8000));

    this.logger.log(`Job ${job.id} phase 1 completed`);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    this.logger.log(`Job ${job.id} phase 2 completed`);
  }

  @OnWorkerEvent('completed')
  onComplete(job: Job<GenerateTestDto>) {
    this.logger.log(`Job ${job.id} all completed`);
  }
}
