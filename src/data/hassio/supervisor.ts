import { atLeastVersion } from "../../common/config/version";
import { ThirdEye, PanelInfo } from "../../types";
import { SupervisorArch } from "../supervisor/supervisor";
import { hassioApiResultExtractor, HassioResponse } from "./common";

export type HassioThirdEyeInfo = {
  arch: SupervisorArch;
  audio_input: string | null;
  audio_output: string | null;
  boot: boolean;
  image: string;
  ip_address: string;
  machine: string;
  port: number;
  ssl: boolean;
  update_available: boolean;
  version_latest: string;
  version: string;
  wait_boot: number;
  watchdog: boolean;
};

export type HassioSupervisorInfo = {
  addons: string[];
  addons_repositories: string[];
  arch: SupervisorArch;
  channel: string;
  debug: boolean;
  debug_block: boolean;
  diagnostics: boolean | null;
  healthy: boolean;
  ip_address: string;
  logging: string;
  supported: boolean;
  timezone: string;
  update_available: boolean;
  version: string;
  version_latest: string;
  wait_boot: number;
};

export type HassioInfo = {
  arch: SupervisorArch;
  channel: string;
  docker: string;
  features: string[];
  hassos: null;
  thirdeye: string;
  hostname: string;
  logging: string;
  machine: string;
  state:
    | "initialize"
    | "setup"
    | "startup"
    | "running"
    | "freeze"
    | "shutdown"
    | "stopping"
    | "close";
  operating_system: string;
  supervisor: string;
  supported: boolean;
  supported_arch: SupervisorArch[];
  timezone: string;
};

export type HassioPanelInfo = PanelInfo<
  | undefined
  | {
      ingress?: string;
    }
>;

export interface CreateSessionResponse {
  session: string;
}

export interface SupervisorOptions {
  channel?: "beta" | "dev" | "stable";
  diagnostics?: boolean;
  addons_repositories?: string[];
}

export const reloadSupervisor = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    await hass.callWS({
      type: "supervisor/api",
      endpoint: "/supervisor/reload",
      method: "post",
    });
    return;
  }

  await hass.callApi<HassioResponse<void>>("POST", `hassio/supervisor/reload`);
};

export const restartSupervisor = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    await hass.callWS({
      type: "supervisor/api",
      endpoint: "/supervisor/restart",
      method: "post",
      timeout: null,
    });
    return;
  }

  await hass.callApi<HassioResponse<void>>("POST", `hassio/supervisor/restart`);
};

export const updateSupervisor = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    await hass.callWS({
      type: "supervisor/api",
      endpoint: "/supervisor/update",
      method: "post",
      timeout: null,
    });
    return;
  }

  await hass.callApi<HassioResponse<void>>("POST", `hassio/supervisor/update`);
};

export const fetchHassioThirdEyeInfo = async (
  hass: ThirdEye
): Promise<HassioThirdEyeInfo> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/core/info",
      method: "get",
    });
  }

  return hassioApiResultExtractor(
    await hass.callApi<HassioResponse<HassioThirdEyeInfo>>(
      "GET",
      "hassio/core/info"
    )
  );
};

export const fetchHassioSupervisorInfo = async (
  hass: ThirdEye
): Promise<HassioSupervisorInfo> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/supervisor/info",
      method: "get",
    });
  }

  return hassioApiResultExtractor(
    await hass.callApi<HassioResponse<HassioSupervisorInfo>>(
      "GET",
      "hassio/supervisor/info"
    )
  );
};

export const fetchHassioInfo = async (
  hass: ThirdEye
): Promise<HassioInfo> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/info",
      method: "get",
    });
  }

  return hassioApiResultExtractor(
    await hass.callApi<HassioResponse<HassioInfo>>("GET", "hassio/info")
  );
};

export const fetchHassioLogs = async (hass: ThirdEye, provider: string) =>
  hass.callApi<string>(
    "GET",
    `hassio/${provider.includes("_") ? `addons/${provider}` : provider}/logs`
  );

export const setSupervisorOption = async (
  hass: ThirdEye,
  data: SupervisorOptions
) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    await hass.callWS({
      type: "supervisor/api",
      endpoint: "/supervisor/options",
      method: "post",
      data,
    });
    return;
  }

  await hass.callApi<HassioResponse<void>>(
    "POST",
    "hassio/supervisor/options",
    data
  );
};
