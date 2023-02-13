import { Entity, OneToOne, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { RequestType } from './dto/request-image.dto'

@Entity()
export class dreamSequence {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   sessionId: string

   @Column()
   prompt: string

   @Column()
   image: string

   @Column()
   type: RequestType

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String
}