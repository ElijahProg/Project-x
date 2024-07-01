import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export type UsersDocument = User & Document

@Schema()
export class User extends Model {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({
        required: true,
        unique: true,
        type: String,
    })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: new Date() })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)