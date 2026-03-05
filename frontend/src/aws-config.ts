// Environment-based configuration
// Values are injected at build time via VITE_* environment variables

const ROUTE_DOMAIN = 'heathrag.people.aws.dev';
const IS_PROD = ROUTE_DOMAIN === 'prod';

const API_URL = import.meta.env.VITE_API_URL || '';
const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID || 'eu-west-1_Y2W4Nq5cV';
const USER_POOL_CLIENT_ID = import.meta.env.VITE_USER_POOL_CLIENT_ID || '631upjij4alek3b8gh76474t9a';

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: USER_POOL_ID,
      userPoolClientId: USER_POOL_CLIENT_ID,
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    REST: {
      InterviewQuestionsAPI: {
        endpoint: API_URL || `https://kgtss21o53.execute-api.eu-west-1.amazonaws.com/${ROUTE_DOMAIN}/`,
        region: 'eu-west-1',
      },
    },
  },
};

export { ROUTE_DOMAIN, IS_PROD };
