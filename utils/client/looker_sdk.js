import {
  AuthSession,
  BrowserTransport,
  AuthToken,
  DefaultSettings
} from "@looker/sdk-rtl";
import { Looker40SDK } from "@looker/sdk";

class PblSession extends AuthSession {
  /**
   * first function called when using the sdk
   * calls get token
   */
  async authenticate(props) {
    const token = await this.getToken();
    if (token && token.access_token) {
      props.mode = "cors";
      delete props.credentials;
      props.headers = {
        ...props.headers,
        Authorization: `Bearer ${this.activeToken.access_token}`
      };
    }
    return props;
  }
  /**
   * abstract method of AuthSession class, i.e. needs to be overridden
   * if there's not an authenticated token, call endpoint to get one
   */
  async getToken() {
    if (!this.isAuthenticated()) {
      const token = await fetch(this.token_endpoint);
      this.activeToken.setToken(await token.json());
    }
    return this.activeToken;
  }

  activeToken = new AuthToken();
  constructor(settings, transport) {
    super(settings, transport || new BrowserTransport(settings));

    this.token_endpoint = settings.token_endpoint;
  }
  /**
   * returns true only if you have token and not expired
   */
  isAuthenticated() {
    const token = this.activeToken;
    if (!(token && token.access_token)) return false;
    return token.isActive();
  }
}

const getClientSdk = () => {
  const pblsession = new PblSession({
    ...DefaultSettings(),
    base_url: process.env.LOOKERSDK_BASE_URL,
    token_endpoint: "/api/tokenRest"
  });

  return new Looker40SDK(pblsession);
};

const sdk = getClientSdk();
export default sdk;
