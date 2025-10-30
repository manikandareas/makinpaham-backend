import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TestsConsumer } from './tests.consumer';
import { GENERATE_QUESTIONS_QUEUE } from './tests.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: GENERATE_QUESTIONS_QUEUE,
    }),
  ],
  controllers: [TestsController],
  providers: [TestsService, TestsConsumer],
})
export class TestsModule {}
