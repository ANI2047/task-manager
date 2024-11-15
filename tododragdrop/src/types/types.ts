export type Task = {
  id: number;
  task: string;
  tag: string;
  date: string;
  description: string;
};

export type TaskMap = {
  [key: string]: Task[];
};


export enum PriorityType {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum StatusType {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  CLOSED = "CLOSED",
}

export type Issue = {
  id: number;
  title: string;
  description: string;
  assigneeId: string;
  comments?: string | null;
  type: string;
  status: StatusType;
  sequential: boolean;
  priority: PriorityType;
  projectId?: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  sequence?: number;
};