import { PartialType } from '@nestjs/mapped-types';
import { CreateNotDto } from './create-not.dto';

export class UpdateNotDto extends PartialType(CreateNotDto) {}
