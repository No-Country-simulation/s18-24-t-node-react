import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {}

    @Post('createPaymentSession')
    async createPaymentSession(@Body() data: any) {
        return this.paymentsService.createPaymentSession(data);
    }

    @Get('paymentDetails')
    async getPaymentDetails(@Query('sessionID') sessionId: string) {
      return this.paymentsService.getPaymentDetails(sessionId);
    }
}
