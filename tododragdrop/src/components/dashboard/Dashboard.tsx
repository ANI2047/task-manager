"use client";

import { statuses } from "@/lib/data";
import { Issue, PriorityType, StatusType } from "@/types/types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useCallback, useState } from "react";
import IssueCard from "../issue";

const issuesInitial: Issue[] = [
  {
    id: 1,
    title: "Create Wireframes",
    description: "Develop wireframes for the homepage and key pages.",
    assigneeId: "user456",
    comments: "Need feedback from stakeholders.",
    type: "Design",
    status: StatusType.IN_PROGRESS,
    sequential: true,
    priority: PriorityType.HIGH,
    projectId: "1a2b3c4d",
    deadline: new Date("2024-01-10T12:00:00Z"),
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-03T15:00:00Z"),
  },
  {
    id: 2,
    title: "Front-End Implementation",
    description: "Implement the homepage using HTML/CSS and JavaScript.",
    assigneeId: "user789",
    comments: null,
    type: "Development",
    status: StatusType.OPEN,
    sequential: true,
    priority: PriorityType.MEDIUM,
    projectId: "1a2b3c4d",
    deadline: new Date("2024-01-15T17:00:00Z"),
    createdAt: new Date("2024-01-02T11:00:00Z"),
    updatedAt: new Date("2024-01-02T11:00:00Z"),
  },
  {
    id: 3,
    title: "Content Creation",
    description: "Write SEO-friendly content for all key pages.",
    assigneeId: "user890",
    comments: "Coordinate with the marketing team.",
    type: "Content",
    status: StatusType.OPEN,
    sequential: false,
    priority: PriorityType.MEDIUM,
    projectId: "1a2b3c4d",
    deadline: new Date("2024-01-18T10:00:00Z"),
    createdAt: new Date("2024-01-04T09:00:00Z"),
    updatedAt: new Date("2024-01-04T09:00:00Z"),
  },
  {
    id: 4,
    title: "SEO Optimization",
    description: "Optimize the website for search engines.",
    assigneeId: "user321",
    comments: "Use best practices for keywords and metadata.",
    type: "SEO",
    status: StatusType.IN_PROGRESS,
    sequential: false,
    priority: PriorityType.HIGH,
    projectId: "1a2b3c4d",
    deadline: new Date("2024-01-20T15:00:00Z"),
    createdAt: new Date("2024-01-05T12:00:00Z"),
    updatedAt: new Date("2024-01-06T14:00:00Z"),
  },
  {
    id: 5,
    title: "Accessibility Testing",
    description: "Ensure the website meets accessibility standards.",
    assigneeId: "user654",
    comments: null,
    type: "Testing",
    status: StatusType.IN_REVIEW,
    sequential: true,
    priority: PriorityType.MEDIUM,
    projectId: "1a2b3c4d",
    deadline: new Date("2024-01-25T17:00:00Z"),
    createdAt: new Date("2024-01-06T09:00:00Z"),
    updatedAt: new Date("2024-01-07T11:00:00Z"),
  },
  {
    id: 6,
    title: "Set Up CI/CD Pipeline",
    description: "Configure automated deployment for the app.",
    assigneeId: "user345",
    comments: "Waiting for cloud access.",
    type: "DevOps",
    status: StatusType.IN_REVIEW,
    sequential: false,
    priority: PriorityType.URGENT,
    projectId: "5e6f7g8h",
    deadline: new Date("2024-02-10T12:00:00Z"),
    createdAt: new Date("2024-02-02T09:45:00Z"),
    updatedAt: new Date("2024-02-06T10:00:00Z"),
  },
  {
    id: 7,
    title: "User Authentication",
    description: "Implement secure user login and registration.",
    assigneeId: "user678",
    comments: null,
    type: "Development",
    status: StatusType.IN_PROGRESS,
    sequential: true,
    priority: PriorityType.HIGH,
    projectId: "5e6f7g8h",
    deadline: new Date("2024-02-15T12:00:00Z"),
    createdAt: new Date("2024-02-03T10:30:00Z"),
    updatedAt: new Date("2024-02-07T11:00:00Z"),
  },
  {
    id: 8,
    title: "Push Notifications",
    description: "Set up push notifications for important app events.",
    assigneeId: "user789",
    comments: "Coordinate with the backend team for integration.",
    type: "Development",
    status: StatusType.OPEN,
    sequential: true,
    priority: PriorityType.MEDIUM,
    projectId: "5e6f7g8h",
    deadline: new Date("2024-02-20T14:00:00Z"),
    createdAt: new Date("2024-02-05T08:00:00Z"),
    updatedAt: new Date("2024-02-05T08:00:00Z"),
  },
  {
    id: 9,
    title: "UI/UX Design",
    description: "Design the user interface for the app's main screens.",
    assigneeId: "user101",
    comments: "Focus on intuitive navigation.",
    type: "Design",
    status: StatusType.IN_PROGRESS,
    sequential: true,
    priority: PriorityType.HIGH,
    projectId: "5e6f7g8h",
    deadline: new Date("2024-02-25T17:00:00Z"),
    createdAt: new Date("2024-02-06T09:30:00Z"),
    updatedAt: new Date("2024-02-06T09:30:00Z"),
  },
  {
    id: 10,
    title: "Beta Testing",
    description: "Conduct beta testing with a small user group.",
    assigneeId: "user234",
    comments: "Collect feedback on usability and bugs.",
    type: "Testing",
    status: StatusType.OPEN,
    sequential: false,
    priority: PriorityType.MEDIUM,
    projectId: "5e6f7g8h",
    deadline: new Date("2024-02-28T10:00:00Z"),
    createdAt: new Date("2024-02-08T09:00:00Z"),
    updatedAt: new Date("2024-02-08T09:00:00Z"),
  },
];

export default function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>(issuesInitial);
  
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
  
      console.log("Drag event initiated with result:", result);
  
      // Exit if dropped outside any droppable area
      if (!destination) {
        console.log("Drop cancelled - outside any droppable area.");
        return;
      }
  
      // Exit if item is dropped in the same position
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        console.log("Drop cancelled - item dropped in the same position.");
        return;
      }
  
      console.log("Moving issue from:", source, "to:", destination);
  
      const newIssues = [...issues];
  
      // Get the issue being moved
      const sourceIssues = issues.filter(
        (issue) => issue.status === source.droppableId
      );
      const movedIssue = sourceIssues[source.index];
  
      console.log("Issue being moved:", movedIssue);
  
      // Remove the moved issue from the original position in newIssues
      const movedIssueIndexInNewIssues = newIssues.findIndex(
        (issue) => issue.id === movedIssue.id
      );
      newIssues.splice(movedIssueIndexInNewIssues, 1);
  
      console.log("Removed issue from original position:", movedIssueIndexInNewIssues);
  
      // Update the status if moving to a different column
      const updatedMovedIssue = { ...movedIssue };
      if (source.droppableId !== destination.droppableId) {
        updatedMovedIssue.status = destination.droppableId as StatusType;
        console.log("Updated issue status to:", updatedMovedIssue.status);
      }
  
      // Get the indices in newIssues of the destination status
      const destinationIssueIndicesInNewIssues = newIssues
        .map((issue, index) =>
          issue.status === destination.droppableId ? index : -1
        )
        .filter((index) => index !== -1);
  
      console.log(
        "Destination issue indices in newIssues:",
        destinationIssueIndicesInNewIssues
      );
  
      let insertIndexInNewIssues;
  
      if (destinationIssueIndicesInNewIssues.length === 0) {
        // No issues with destination status, insert at end
        insertIndexInNewIssues = newIssues.length;
        console.log("No issues with destination status, inserting at end.");
      } else if (destination.index === 0) {
        // Insert before the first issue with destination status
        insertIndexInNewIssues = destinationIssueIndicesInNewIssues[0];
        console.log("Inserting before the first issue with destination status.");
      } else if (
        destination.index === destinationIssueIndicesInNewIssues.length
      ) {
        // Insert after the last issue with destination status
        insertIndexInNewIssues =
          destinationIssueIndicesInNewIssues[
            destinationIssueIndicesInNewIssues.length - 1
          ] + 1;
        console.log("Inserting after the last issue with destination status.");
      } else {
        // Insert before the issue at destination.index
        insertIndexInNewIssues =
          destinationIssueIndicesInNewIssues[destination.index];
        console.log(
          "Inserting before the issue at destination index:",
          destination.index
        );
      }
  
      console.log(
        "Final insert index in newIssues:",
        insertIndexInNewIssues
      );
  
      // Insert the updatedMovedIssue into newIssues at the calculated index
      newIssues.splice(insertIndexInNewIssues, 0, updatedMovedIssue);
  
      console.log("New issues state after insertion:", newIssues);
  
      // Update the issues state
      setIssues(newIssues);
      console.log("Issues state updated successfully.");
    },
    [issues]
  );
  
  
  
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 p-4 rounded-lg border border-slate-600">
        {statuses.map((status) => (
          <Droppable key={status.key} droppableId={status.key}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                <h3 className="font-semibold mb-2 text-center">
                  {status.name}
                </h3>

                {issues
                  ?.filter((issue) => issue.status === status.key)
                  .map((individualIssue, index) => (
                    <Draggable
                      key={individualIssue.id}
                      draggableId={individualIssue.id.toString()}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <IssueCard issue={individualIssue} />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
