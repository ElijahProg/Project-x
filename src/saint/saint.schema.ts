import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type SaintsDocument = Saints & Document

@Schema()
export class Saints extends Model {
    @Prop({ required: true })
    fullName: string

    @Prop({ required: true })
    picture: string

    @Prop({ required: true })
    description: string

}

export const SaintsSchema = SchemaFactory.createForClass(Saints)
