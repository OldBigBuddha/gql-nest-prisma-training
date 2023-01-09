import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * This class is used to validate the environment variables.
 * Add a validation rule if you added a new one required to validate.
 */
export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNumber()
  PORT = 3333; // you can define a default value

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;
}

/**
 * Validate a configuration
 * @param config a non-validated configuration object merged environment variables and .env.development.local
 * @returns a validated configuration  object
 */
export function validate(config: Record<string, unknown>): EnvValidator {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
