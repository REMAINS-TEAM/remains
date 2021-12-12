import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// for not all fields
// exclude
// export class UpdateUserDto extends OmitType(CreateUserDto, ['name'] as const) {}
// only these
// export class UpdateUserDto extends PickType(CreateUserDto, ['name'] as const) {}
