import { atLeastVersion } from "../../common/config/version";
import { ThirdEye } from "../../types";
import { HassioResponse } from "./common";
import { CreateSessionResponse } from "./supervisor";

function setIngressCookie(session: string): string {
  document.cookie = `ingress_session=${session};path=/api/hassio_ingress/;SameSite=Strict${
    location.protocol === "https:" ? ";Secure" : ""
  }`;
  return session;
}

export const createHassioSession = async (
  hass: ThirdEye
): Promise<string> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    const wsResponse: { session: string } = await hass.callWS({
      type: "supervisor/api",
      endpoint: "/ingress/session",
      method: "post",
    });
    return setIngressCookie(wsResponse.session);
  }

  const restResponse: { data: { session: string } } = await hass.callApi<
    HassioResponse<CreateSessionResponse>
  >("POST", "hassio/ingress/session");
  return setIngressCookie(restResponse.data.session);
};

export const validateHassioSession = async (
  hass: ThirdEye,
  session: string
): Promise<void> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    await hass.callWS({
      type: "supervisor/api",
      endpoint: "/ingress/validate_session",
      method: "post",
      data: { session },
    });
    return;
  }

  await hass.callApi<HassioResponse<void>>(
    "POST",
    "hassio/ingress/validate_session",
    { session }
  );
};
