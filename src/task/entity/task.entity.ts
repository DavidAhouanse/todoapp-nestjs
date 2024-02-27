import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Une entité est un modèle qui dit comment les données dans une base de données doivent être organisées. Les entités
 * sont des classes TypeScript qui représentent la structure de vos données de base de données. Elles définissent la
 * manière dont les données sont stockées et récupérées dans la base de données.
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: Boolean, nullable: false, default: false })
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
