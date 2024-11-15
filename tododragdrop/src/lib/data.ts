import { TaskMap } from "@/types/types";

export const statuses = [
  {
    "name": "Todo",
    "key": "OPEN"
  },
  {
    "name": "In Progress",
    "key": "IN_PROGRESS"
  },
  {
    "name": "In Review",
    "key": "IN_REVIEW"
  },
  {
    "name": "Done",
    "key": "CLOSED"
  }
]

export const initialState: TaskMap = {
  Pending: [
    {
      id: 1,
      task: "Learn React",
      description: "Learn React through the React documentation",
      tag: "Low",
      date: "2023-06-10"
    },
    {
      id: 2,
      task: "Set up Node.js environment",
      description: "Install Node.js and npm on the local machine",
      tag: "Medium",
      date: "2023-06-12"
    },
    {
      id: 3,
      task: "Plan Project Architecture",
      description: "Outline the structure of the new web app project",
      tag: "High",
      date: "2023-06-14"
    }
  ],
  "In Progress": [
    {
      id: 4,
      task: "Implement Authentication",
      description: "Set up user authentication with JWT",
      tag: "High",
      date: "2023-06-16"
    },
    {
      id: 5,
      task: "Create Landing Page",
      description: "Design and build the landing page UI",
      tag: "Medium",
      date: "2023-06-18"
    },
    {
      id: 6,
      task: "Set up Database",
      description: "Configure MongoDB database and initial schema",
      tag: "High",
      date: "2023-06-20"
    }
  ],
  "In Review": [
    {
      id: 7,
      task: "Code Review for Authentication Module",
      description: "Review the code for authentication and ensure security standards",
      tag: "High",
      date: "2023-06-22"
    },
    {
      id: 8,
      task: "UI/UX Review for Landing Page",
      description: "Check the responsiveness and design consistency",
      tag: "Medium",
      date: "2023-06-24"
    }
  ],
  Done: [
    {
      id: 9,
      task: "Initialize Project Repository",
      description: "Set up Git repository and initial commit",
      tag: "Low",
      date: "2023-06-08"
    },
    {
      id: 10,
      task: "Install Dependencies",
      description: "Install basic dependencies like React, Express, etc.",
      tag: "Low",
      date: "2023-06-09"
    }
  ]
};
