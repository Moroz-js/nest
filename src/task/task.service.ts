import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

@Injectable()
export class TaskService {
    private tasks = [
        {
            id: 1,
            title: "Test",
            isCompleted: true,
        },
        {
            id: 2,
            title: "Test",
            isCompleted: true,
        },
        {
            id: 3,
            title: "Test",
            isCompleted: true,
        }
    ]
    findAll() {
        return this.tasks
    }

    findById(id: number) {
        const task = this.tasks.find((task) => task.id == id)

        if (!task) {
            throw new NotFoundException
        }

        return task
    }

    create(createTaskDto: createTaskDto) {
        const newTask = {
            id: this.tasks.length + 1,
            title: createTaskDto.title,
            isCompleted: false
        }

        this.tasks.push(newTask)

        return this.tasks
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {

        const { title, isCompleted } = updateTaskDto;

        const task = this.findById(id);

        if (!task) {
            throw new NotFoundException
        }

        task.title = title;
        task.isCompleted = isCompleted

        return task;

    }

}
