// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var src_model_mailer_pb = require('./mailer_pb.js');

function serialize_mailerPackage_mailEntry(arg) {
  if (!(arg instanceof src_model_mailer_pb.mailEntry)) {
    throw new Error('Expected argument of type mailerPackage.mailEntry');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mailerPackage_mailEntry(buffer_arg) {
  return src_model_mailer_pb.mailEntry.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mailerPackage_sendResponse(arg) {
  if (!(arg instanceof src_model_mailer_pb.sendResponse)) {
    throw new Error('Expected argument of type mailerPackage.sendResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mailerPackage_sendResponse(buffer_arg) {
  return src_model_mailer_pb.sendResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MailerService = exports.MailerService = {
  send: {
    path: '/mailerPackage.Mailer/send',
    requestStream: false,
    responseStream: false,
    requestType: src_model_mailer_pb.mailEntry,
    responseType: src_model_mailer_pb.sendResponse,
    requestSerialize: serialize_mailerPackage_mailEntry,
    requestDeserialize: deserialize_mailerPackage_mailEntry,
    responseSerialize: serialize_mailerPackage_sendResponse,
    responseDeserialize: deserialize_mailerPackage_sendResponse,
  },
};

exports.MailerClient = grpc.makeGenericClientConstructor(MailerService);
