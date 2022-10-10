import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    description: 'HTTP response status code',
  })
  statusCode: number;

  @ApiProperty({
    description: 'HTTP response error message',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP response string',
  })
  error: string;
}
