import { NextRequest, NextResponse } from 'next/server';
import { subscribeNewsletterAction, sendContactEmailAction, sendOrderConfirmationAction } from '@/app/actions/send-email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === 'newsletter') {
      const result = await subscribeNewsletterAction(body.email);
      return NextResponse.json(result);
    }

    if (type === 'contact') {
      const result = await sendContactEmailAction({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      });
      return NextResponse.json(result);
    }

    if (type === 'order') {
      const result = await sendOrderConfirmationAction(body.orderData);
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, message: 'Invalid action type.' }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
