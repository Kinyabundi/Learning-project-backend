import { Column, Entity, ManyToOne } from "typeorm";
import BaseModel from "./base.model.entity";
import User from "./user.entity";

export enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed"
}

@Entity()
export default class Task extends BaseModel {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @Column({ type: 'timestamp', nullable: true})
    scheduledTime: Date;

    @ManyToOne(() => User, (user) => user.tasks,{
        nullable: false
    })
    user: User;
}