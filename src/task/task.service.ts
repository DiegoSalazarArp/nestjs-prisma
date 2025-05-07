import { Injectable } from "@nestjs/common";
import { Task } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return null;
    }

    return task;
  }

  async createTask(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(id: number, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}