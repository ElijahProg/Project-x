import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type LookupsDocument = Lookups & Document

@Schema()
export class Lookups extends Model {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, enum: ["Diocese"] })
    type: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true, default: false })
    isParent: boolean

    @Prop({ required: true, default: new Date })
    createdAt: Date
}

export const LookupsSchema = SchemaFactory.createForClass(Lookups)