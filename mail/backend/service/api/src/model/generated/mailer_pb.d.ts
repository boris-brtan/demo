// package: mailerPackage
// file: src/model/mailer.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class mailEntry extends jspb.Message { 
    getSubject(): string;
    setSubject(value: string): mailEntry;
    getSender(): string;
    setSender(value: string): mailEntry;
    getRecipient(): string;
    setRecipient(value: string): mailEntry;
    getCc(): string;
    setCc(value: string): mailEntry;
    getBody(): string;
    setBody(value: string): mailEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): mailEntry.AsObject;
    static toObject(includeInstance: boolean, msg: mailEntry): mailEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: mailEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): mailEntry;
    static deserializeBinaryFromReader(message: mailEntry, reader: jspb.BinaryReader): mailEntry;
}

export namespace mailEntry {
    export type AsObject = {
        subject: string,
        sender: string,
        recipient: string,
        cc: string,
        body: string,
    }
}

export class sendResponse extends jspb.Message { 
    getStatus(): boolean;
    setStatus(value: boolean): sendResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): sendResponse.AsObject;
    static toObject(includeInstance: boolean, msg: sendResponse): sendResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: sendResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): sendResponse;
    static deserializeBinaryFromReader(message: sendResponse, reader: jspb.BinaryReader): sendResponse;
}

export namespace sendResponse {
    export type AsObject = {
        status: boolean,
    }
}
