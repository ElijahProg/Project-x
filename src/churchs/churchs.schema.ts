import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
import { Lookups } from "src/lookup/lookup.schema";

export type ChurchesDocument = Churches & Document

@Schema()
export class Churches extends Model {
    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    location: { lat: string, lng: string }
    @Prop({ required: true })
    description: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lookups' })
    diocese: Lookups
}