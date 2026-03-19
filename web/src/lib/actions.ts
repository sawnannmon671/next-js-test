"use server";

import { 
  getApprovalStatuses as getStatusesGrpc,
  createApprovalStatus as createStatusGrpc,
  updateApprovalStatus as updateStatusGrpc,
  deleteApprovalStatus as deleteStatusGrpc,
  getUser as getUserGrpc
} from "./grpc";

export async function fetchUserAction(id: string) {
  try {
    const data = await getUserGrpc(id);
    return { success: true, data };
  } catch (error: any) {
    console.error("gRPC User Error:", error.message);
    return { success: false, error: "Failed to fetch user data" };
  }
}

export async function fetchApprovalStatuses() {
  try {
    const data = await getStatusesGrpc();
    return { success: true, data };
  } catch (error: any) {
    console.error("gRPC Fetch Error:", error.message);
    return { success: false, error: "Backend server is offline or unreachable" };
  }
}

export async function createStatusAction(data: any) {
  try {
    const result = await createStatusGrpc(data);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("gRPC Create Error:", error.message);
    return { success: false, error: "Failed to create application status" };
  }
}

export async function updateStatusAction(data: any) {
  try {
    const result = await updateStatusGrpc(data);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("gRPC Update Error:", error.message);
    return { success: false, error: "Failed to update application status" };
  }
}

export async function deleteStatusAction(id: string) {
  try {
    const result = await deleteStatusGrpc(id);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("gRPC Delete Error:", error.message);
    return { success: false, error: "Failed to delete application status" };
  }
}
