// package: mailerPackage
// file: src/model/mailer.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as src_model_mailer_pb from "./mailer_pb";

interface IMailerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    send: IMailerService_Isend;
}

interface IMailerService_Isend extends grpc.MethodDefinition<src_model_mailer_pb.mailEntry, src_model_mailer_pb.sendResponse> {
    path: "/mailerPackage.Mailer/send";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_model_mailer_pb.mailEntry>;
    requestDeserialize: grpc.deserialize<src_model_mailer_pb.mailEntry>;
    responseSerialize: grpc.serialize<src_model_mailer_pb.sendResponse>;
    responseDeserialize: grpc.deserialize<src_model_mailer_pb.sendResponse>;
}

export const MailerService: IMailerService;

export interface IMailerServer {
    send: grpc.handleUnaryCall<src_model_mailer_pb.mailEntry, src_model_mailer_pb.sendResponse>;
}

export interface IMailerClient {
    send(request: src_model_mailer_pb.mailEntry, callback: (error: grpc.ServiceError | null, response: src_model_mailer_pb.sendResponse) => void): grpc.ClientUnaryCall;
    send(request: src_model_mailer_pb.mailEntry, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_model_mailer_pb.sendResponse) => void): grpc.ClientUnaryCall;
    send(request: src_model_mailer_pb.mailEntry, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_model_mailer_pb.sendResponse) => void): grpc.ClientUnaryCall;
}

export class MailerClient extends grpc.Client implements IMailerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public send(request: src_model_mailer_pb.mailEntry, callback: (error: grpc.ServiceError | null, response: src_model_mailer_pb.sendResponse) => void): grpc.ClientUnaryCall;
    public send(request: src_model_mailer_pb.mailEntry, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_model_mailer_pb.sendResponse) => void): grpc.ClientUnaryCall;
    public send(request: src_model_mailer_pb.mailEntry, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_model_mailer_pb.sendResponse) => void): grpc.ClientUnaryCall;
}
