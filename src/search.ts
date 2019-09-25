import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
import * as Twit from 'twit';
import * as dotenv from 'dotenv';

dotenv.config();

const twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY || '',
  consumer_secret: process.env.CONSUMER_SECRET || '',
  access_token: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  app_only_auth: true,
  timeout_ms: 60 * 1000,
  strictSSL: true,
} as const);

exports.handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const keyword =
    (event.queryStringParameters && event.queryStringParameters.keyword) ||
    '#北海道のここがえーぞ';
  const params = {
    q: keyword,
    count: 100,
  };

  const result = await twitter.get('search/tweets', params);

  if (result.data) {
    callback(undefined, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result: result.data }),
    });
  } else {
    callback(undefined, {
      statusCode: 400,
      body: 'Latest note was already syndicated.',
    });
  }
};
