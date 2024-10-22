import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {}

    @Post('create-payment-session')
    async createPaymentSession(@Body() data: any) {
        return this.paymentsService.createPaymentSession(data);
    }
}
