import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-09-30.acacia',
    });
  }

  async createPaymentSession(data: {
    name: string;
    description: string;
    currency: string;
    unit_amount: number;
    quantity: number;
    mode: string;
    success_url: string;
    cancel_url: string;
  }) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
              price_data: {
                  currency: data.currency,
                  product_data: {name:data.name},
                  unit_amount: data.unit_amount,
              },
              // Required:
              quantity: 1,
      }],
      mode: 'payment',
      success_url: data.success_url,
      cancel_url: data.cancel_url,
    });

    return session;
  }
}

