import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(e: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response: any = ctx.getResponse<Response>();

    const status = (e as any).status ?? 400;

    const resp: any = response.status(status);
    resp.json({
      status,
      data: new Date().toISOString(),
      url: request.url,
      errors: e.message,
    });
  }
}
