import { Controller, Post, Get, Body, Res, HttpStatus, BadRequestException } from "@nestjs/common";
import { TaskService } from "./task.service";
import Task from "src/entities/task.entity";
import { ApiResponseType } from "src/types/Api";
import { Response } from "express";

@Controller('api/task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(@Body() taskData: Task, @Res() res: Response<ApiResponseType<Partial<Task>>>){
        try{
            const task = await this.taskService.createTask(taskData);
            return res.status(HttpStatus.CREATED).json({
                msg: "Task created successfully",
                status: "success",
                data: task,
            });
        } catch (err) {
            throw new BadRequestException({
                status: "error",
                msg: err.message || "An error was encountered while creating task",
            });
        }
    }
}