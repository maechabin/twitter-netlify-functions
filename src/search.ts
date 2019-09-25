import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
// import * as Cors from 'cors';
import * as Twitter from 'twitter';
import * as dotenv from 'dotenv';

dotenv.config();

// const cors = Cors();

const twitter = new Twitter({
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`,
  access_token_key: `${process.env.ACCESS_TOKEN_KEY}`,
  access_token_secret: `${process.env.ACCESS_TOKEN_SECRET}`,
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

  twitter.get('search/tweets', params, (error, tweets) => {
    if (!error) {
      callback(undefined, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result: tweets }),
      });
    }
  });
};
