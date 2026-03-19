import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const USER_PROTO_PATH = path.join(process.cwd(), 'proto/user.proto');
const APPROVAL_PROTO_PATH = path.join(process.cwd(), 'proto/approval_status.proto');

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

export const userClient = new userProto.user.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

export const approvalClient = new approvalProto.approval.ApprovalStatusService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

export const getUser = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    userClient.GetUser({ id }, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const getApprovalStatuses = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    approvalClient.GetApprovalStatusList({}, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.statuses);
    });
  });
};

export const createApprovalStatus = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    approvalClient.CreateApprovalStatus(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const updateApprovalStatus = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    approvalClient.UpdateApprovalStatus(data, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

export const deleteApprovalStatus = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    approvalClient.DeleteApprovalStatus({ id }, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};
