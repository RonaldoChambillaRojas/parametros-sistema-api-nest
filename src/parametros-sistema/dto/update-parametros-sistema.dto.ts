import { PartialType } from '@nestjs/mapped-types';
import { CreateParametrosSistemaDto } from './create-parametros-sistema.dto';

export class UpdateParametrosSistemaDto extends PartialType(CreateParametrosSistemaDto) {}
