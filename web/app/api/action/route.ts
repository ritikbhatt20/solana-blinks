import { ActionGetResponse, ActionPostRequest, ActionPostResponse } from '@solana/actions';

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

export async function POST(request: Request) {

  const requestBody: ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const response: ActionPostResponse = {
    transaction: "",
    message: "hello" + userPubkey
  };

  return Response.json(response)
}