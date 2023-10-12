import { Auth0Provider } from "@auth0/auth0-react";

type Auth0ProviderWrapperProps = {
  children: React.ReactNode;
};

const providerOptions: any = {
  domain: "dev-4qxio4kiocs8hwft.us.auth0.com",
  clientId: "AajztMNTEmw5K1VWon5twtzw0L1pDn0S",
  redirectUri: "http://localhost:5173/callback",
};

const Auth0ProviderWrapper: React.FC<Auth0ProviderWrapperProps> = ({
  children,
}) => {
  return <Auth0Provider {...providerOptions}>{children}</Auth0Provider>;
};

export default Auth0ProviderWrapper;
