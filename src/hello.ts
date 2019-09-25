import { Context, Callback, APIGatewayEvent } from 'aws-lambda';

exports.handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  callback(undefined, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ result: 'Hello World' }),
  });
};
