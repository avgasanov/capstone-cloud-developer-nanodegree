// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '3jdl0pv5oi'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-s5t1we1y.auth0.com',            // Auth0 domain
  clientId: 'byXR1F4y7Y3RqjnGu2losgbYXPFn9tQK',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
