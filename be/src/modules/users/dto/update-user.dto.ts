import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from '../dto/register-user.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}

// for not all fields
// exclude
// export class UpdateUserDto extends OmitType(CreateUserDto, ['name'] as const) {}
// only these
// export class UpdateUserDto extends PickType(CreateUserDto, ['name'] as const) {}
