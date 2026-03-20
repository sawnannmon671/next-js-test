"use server";

import { 
  getApprovalStatuses as getStatusesGrpc,
  createApprovalStatus as createStatusGrpc,
  updateApprovalStatus as updateStatusGrpc,
  deleteApprovalStatus as deleteStatusGrpc,
  getUsers,
  createUser,
  getRoles,
  createRole,
  getPermissions,
  createPermission
} from "./grpc";

// Approval Status Actions
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

// User Actions
export async function fetchUsersAction() {
  try {
    const data = await getUsers();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createUserAction(data: any) {
  try {
    const result = await createUser(data);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Role Actions
export async function fetchRolesAction() {
  try {
    const data = await getRoles();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createRoleAction(data: any) {
  try {
    const result = await createRole(data);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Permission Actions
export async function fetchPermissionsAction() {
  try {
    const data = await getPermissions();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPermissionAction(data: any) {
  try {
    const result = await createPermission(data);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
