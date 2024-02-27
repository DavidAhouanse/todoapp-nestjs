import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  //ApiProperty()
  @IsNotEmpty()
  @IsString({
    message: 'Veuillez renseignez une tâche valide.',
  })
  @ApiProperty({ example: "Rendez-vous à l'ambassade de Chine" })
  title: string;

  @ApiProperty({ example: false })
  @IsBoolean({
    message: 'Veuillez renseignez une valeur booléenne.',
  })
  done: boolean;
}
