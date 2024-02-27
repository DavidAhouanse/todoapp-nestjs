import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //decorateur requis pour creer un controller, prends en parametre un prefix de route
export class AppController {
  constructor(private readonly appService: AppService) {}
}
