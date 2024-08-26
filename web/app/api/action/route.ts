import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS } from '@solana/actions';
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { use } from 'react';

export async function GET(request: Request) {
  const responseBody: ActionGetResponse = {
    icon: 'https://cdn-img.panewslab.com/panews/2024/07/02/images/2Mcb6mx14J.jpg',
    description: 'This is heyblancos demo blink.',
    title: 'DO BLINK!',
    label: 'Click me!',
    links: {
      actions: [
        {
          href: request.url,
          label: "same action"
        },
        {
          href: request.url + "?action=another",
          label: "another action"
        }
      ]
    }
    // error: {
    //   message: 'This blink is not implemented yet!',
    // },
  };

  const response = Response.json(responseBody, {headers: ACTIONS_CORS_HEADERS});
  return response;
}

export async function POST(request: Request) {

  const requestBody: ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  const user = new PublicKey(userPubkey);

  const connection = new Connection(clusterApiUrl("devnet"));
  const ix = SystemProgram.transfer({
    fromPubkey: user,
    toPubkey: new PublicKey('G2k6ShTNEyJo84Gu6Dey6ubKagaFQzjBxffncNtPJuqR'),
    lamports: 1
  })
  const tx = new Transaction();
  if (action == "another"){
    tx.add(ix);
  }
  tx.feePayer = new PublicKey(userPubkey);
  tx.recentBlockhash = (await connection.getLatestBlockhash({commitment: "finalized"})).blockhash;
  const serialTX = tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString("base64");

  const response: ActionPostResponse = {
    transaction: serialTX,
    message: "hello" + userPubkey
  };

  return Response.json(response, {headers: ACTIONS_CORS_HEADERS});
}

export async function OPTIONS(request: Request) {
  return new Response(null, {headers: ACTIONS_CORS_HEADERS});
}