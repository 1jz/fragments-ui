export default {
    Auth: {
        // Amazon Region
        region: "us-east-1",

        // Amazon Cognito User Pool ID
        userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID,

        // Amazon Cognito App Client ID (26-char alphanumeric string)
        userPoolWebClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,

        // Hosted UI configuration
        oauth: {
            // Amazon Hosted UI Domain
            domain: import.meta.env.VITE_AWS_COGNITO_HOSTED_UI_DOMAIN,

            // These scopes must match what you set in the User Pool for this App Client
            scope: ["email", "profile", "openid"],

            // NOTE: these must match what you have specified in the Hosted UI
            // app settings for Callback and Redirect URLs (e.g., no trailing slash).
            redirectSignIn: import.meta.env.VITE_OAUTH_SIGN_IN_REDIRECT_URL,
            redirectSignOut: import.meta.env.VITE_OAUTH_SIGN_OUT_REDIRECT_URL,

            // We're using the Access Code Grant flow (i.e., `code`)
            responseType: "code",
        },
    },
};
