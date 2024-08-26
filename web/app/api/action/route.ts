import { ActionGetResponse } from '@solana/actions';

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    icon: 'https://cdn-img.panewslab.com/panews/2024/07/02/images/2Mcb6mx14J.jpg',
    description: 'This is heyblancos demo blink.',
    title: 'DO BLINK!',
    label: 'Click me!',
    error: {
      message: 'This blink is not implemented yet!',
    },
  };
  return Response.json(response);
}
