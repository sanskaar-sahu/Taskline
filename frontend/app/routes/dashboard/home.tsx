import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { Loader } from "@/components/loader";
import { NoDataFound } from "@/components/no-data-found";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import { WorkspaceAvatar } from "@/components/workspace/workspace-avatar";
import type { Workspace } from "@/types";
import { PlusCircle } from "lucide-react";

// Dashboard components
import { RecentProjects } from "@/components/dashboard/recnt-projects";
import { StatsCard } from "@/components/dashboard/stat-card";
import { StatisticsCharts } from "@/components/dashboard/statistics-charts";
import { UpcomingTasks } from "@/components/upcoming-tasks";
import { useGetWorkspaceStatsQuery } from "@/hooks/use-workspace";
import type {
  Project,
  ProjectStatusData,
  StatsCardProps,
  Task,
  TaskPriorityData,
  TaskTrendsData,
  WorkspaceProductivityData,
} from "@/types";

const home = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { data: workspaces, isLoading } = useGetWorkspacesQuery() as {
    data: Workspace[];
    isLoading: boolean;
  };

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  // Fetch dashboard stats only if workspaceId exists
  const { data, isPending } = useGetWorkspaceStatsQuery(workspaceId!, {
    skip: !workspaceId,
  }) as {
    data: {
      stats: StatsCardProps;
      taskTrendsData: TaskTrendsData[];
      projectStatusData: ProjectStatusData[];
      taskPriorityData: TaskPriorityData[];
      workspaceProductivityData: WorkspaceProductivityData[];
      upcomingTasks: Task[];
      recentProjects: Project[];
    };
    isPending: boolean;
  };

  // 🔹 Case 1: Still loading workspaces
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Loader />
      </div>
    );
  }

  const hasWorkspaces = workspaces && workspaces.length > 0;

  // 🔹 Case 2: No workspace selected (no workspaceId in URL)
  if (!workspaceId || !hasWorkspaces) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            {hasWorkspaces
              ? "Select Your Workspace"
              : "No Workspaces Found"}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            {hasWorkspaces
              ? "Choose where you’d like to start collaborating today."
              : "Create a new workspace to get started."}
          </p>
        </div>

        {/* Workspace Grid */}
        {hasWorkspaces ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
            {workspaces.map((workspace) => (
              <a
                href={`/dashboard?workspaceId=${workspace._id}`}
                key={workspace._id}
                className="group relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <WorkspaceAvatar
                    name={workspace.name}
                    color={workspace.color}
                  />
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {workspace.name}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm">
                  {workspace.description || "No description provided"}
                </p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>
            ))}

            {/* Create new workspace card */}
            <div
              onClick={() => setIsCreatingWorkspace(true)}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-300 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-indigo-50/70 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <PlusCircle className="w-10 h-10 text-indigo-600 mb-2" />
              <span className="font-medium text-indigo-700">
                Create Workspace
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <NoDataFound
              title="No workspaces found"
              description="You haven't created any workspace yet."
              buttonText="Create Workspace"
              buttonAction={() => setIsCreatingWorkspace(true)}
            />
          </div>
        )}

        {/* Modal for creating new workspace */}
        <CreateWorkspace
          isCreatingWorkspace={isCreatingWorkspace}
          setIsCreatingWorkspace={setIsCreatingWorkspace}
        />
      </div>
    );
  }

  // 🔹 Case 3: Workspace selected → show dashboard
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8 2xl:space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <StatsCard data={data?.stats} />

      <StatisticsCharts
        stats={data.stats}
        taskTrendsData={data.taskTrendsData}
        projectStatusData={data.projectStatusData}
        taskPriorityData={data.taskPriorityData}
        workspaceProductivityData={data.workspaceProductivityData}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects data={data.recentProjects} />
        <UpcomingTasks data={data.upcomingTasks} />
      </div>
    </div>
  );
};

export default home;
