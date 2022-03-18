export interface Task {
    createdAt: number,
    description: string,
    completed: boolean,
    updatedAt: number,
    media: string | null,
    id: string
}