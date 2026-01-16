import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TodosModule } from './todos/todos.module';
import { UserGuard } from './common/guards/user.guard';

@Module({
  imports: [TodosModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class AppModule {}
