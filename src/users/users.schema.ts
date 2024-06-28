import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UsersDocument = User & Document

@Schema()
export class User{
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()

    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)