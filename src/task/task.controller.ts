import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Task } from "generated/prisma";
import { TaskService } from "./task.service";

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.taskService.getTaskById(parseInt(id));
    if (!taskFound) {
      throw new BadRequestException('Task not found');
    }
    return taskFound;
  }


  @Post()
  async createTask(@Body() data: Task) {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    return this.taskService.updateTask(parseInt(id), data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(parseInt(id));
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }


}
