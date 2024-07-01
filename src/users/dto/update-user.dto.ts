import { Prop } from "@nestjs/mongoose";
import { BaseUser } from "./base-user.dto";

export class UpdateUserDto extends BaseUser {
    @Prop({ default: new Date() })
    updatedAt: Date;
}