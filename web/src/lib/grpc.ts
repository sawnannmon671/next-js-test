import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const USER_PROTO_PATH = path.resolve(process.cwd(), 'proto/user.proto');
const APPROVAL_PROTO_PATH = path.resolve(process.cwd(), 'proto/approval_status.proto');

const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const userDefinition = protoLoader.loadSync(USER_PROTO_PATH, loaderOptions);
const approvalDefinition = protoLoader.loadSync(APPROVAL_PROTO_PATH, loaderOptions);

const userProto = grpc.loadPackageDefinition(userDefinition) as any;
const approvalProto = grpc.loadPackageDefinition(approvalDefinition) as any;

// Defensive initialization to prevent crashes if proto structure changes
const userPkg = userProto?.user || {};
const approvalPkg = approvalProto?.approval || {};

export const userClient = userPkg.UserService ? new userPkg.UserService(
  process.env.GRPC_SERVER_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
) : null;

export const roleClient = userPkg.RoleService ? new userPkg.RoleService(
  process.env.GRPC_SERVER_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
) : null;

export const permissionClient = userPkg.PermissionService ? new userPkg.PermissionService(
  process.env.GRPC_SERVER_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
) : null;

export const approvalClient = approvalPkg.ApprovalStatusService ? new approvalPkg.ApprovalStatusService(
  process.env.GRPC_SERVER_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
) : null;

export const getUsers = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!userClient) return reject(new Error("User service not found in proto"));
    userClient.GetUserList({}, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.users || []);
    });
  });
};

export const createUser = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!userClient) return reject(new Error("User service not found in proto"));
    userClient.CreateUser(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const updateUser = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!userClient) return reject(new Error("User service not found in proto"));
    userClient.UpdateUser(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const deleteUser = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!userClient) return reject(new Error("User service not found in proto"));
    userClient.DeleteUser({ id }, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

// Roles
export const getRoles = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!roleClient) return reject(new Error("Role service not found in proto"));
    roleClient.GetRoleList({}, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.roles || []);
    });
  });
};

export const createRole = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!roleClient) return reject(new Error("Role service not found in proto"));
    roleClient.CreateRole(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

// Permissions
export const getPermissions = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!permissionClient) return reject(new Error("Permission service not found in proto"));
    permissionClient.GetPermissionList({}, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.permissions || []);
    });
  });
};

export const createPermission = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!permissionClient) return reject(new Error("Permission service not found in proto"));
    permissionClient.CreatePermission(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const getApprovalStatuses = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!approvalClient) return reject(new Error("Approval service not found in proto"));
    approvalClient.GetApprovalStatusList({}, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.statuses || []);
    });
  });
};

export const createApprovalStatus = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!approvalClient) return reject(new Error("Approval service not found in proto"));
    approvalClient.CreateApprovalStatus(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const updateApprovalStatus = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!approvalClient) return reject(new Error("Approval service not found in proto"));
    approvalClient.UpdateApprovalStatus(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const deleteApprovalStatus = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!approvalClient) return reject(new Error("Approval service not found in proto"));
    approvalClient.DeleteApprovalStatus({ id }, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};
export const login = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!userClient) return reject(new Error("User service not found in proto"));
    userClient.Login(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};
