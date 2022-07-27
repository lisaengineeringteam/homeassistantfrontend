import { ThirdEye } from "../types";

export interface AuthUrlSearchParams {
  client_id?: string;
  redirect_uri?: string;
  state?: string;
}

export interface AuthProvider {
  name: string;
  id: string;
  type: string;
}

export interface Credential {
  type: string;
}

export interface SignedPath {
  path: string;
}

export const hassUrl = `${location.protocol}//${location.host}`;

export const getSignedPath = (
  hass: ThirdEye,
  path: string
): Promise<SignedPath> => hass.callWS({ type: "auth/sign_path", path });

export const fetchAuthProviders = () =>
  fetch("/auth/providers", {
    credentials: "same-origin",
  });

export const createAuthForUser = async (
  hass: ThirdEye,
  userId: string,
  username: string,
  password: string
) =>
  hass.callWS({
    type: "config/auth_provider/thirdeye/create",
    user_id: userId,
    username,
    password,
  });

export const adminChangePassword = async (
  hass: ThirdEye,
  userId: string,
  password: string
) =>
  hass.callWS<void>({
    type: "config/auth_provider/thirdeye/admin_change_password",
    user_id: userId,
    password,
  });
