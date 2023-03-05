export const oktaConfig = {
    clientId: '0oa88e3kmy7qLJdqu5d7',
    issuer: 'https://dev-14420176.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}