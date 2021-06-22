import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm/orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
