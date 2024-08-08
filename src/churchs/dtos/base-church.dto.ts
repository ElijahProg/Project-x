import { ObjectId } from "mongoose";

export class BaseChurch{
    readonly name: string;
    readonly location: string;
    readonly description: string;
    readonly diocese: ObjectId
}