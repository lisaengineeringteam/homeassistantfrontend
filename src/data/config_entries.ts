import { ThirdEye } from "../types";

export interface ConfigEntry {
  entry_id: string;
  domain: string;
  title: string;
  source: string;
  state:
    | "loaded"
    | "setup_error"
    | "migration_error"
    | "setup_retry"
    | "not_loaded"
    | "failed_unload";
  supports_options: boolean;
  supports_remove_device: boolean;
  supports_unload: boolean;
  pref_disable_new_entities: boolean;
  pref_disable_polling: boolean;
  disabled_by: "user" | null;
  reason: string | null;
}

export type ConfigEntryMutableParams = Partial<
  Pick<
    ConfigEntry,
    "title" | "pref_disable_new_entities" | "pref_disable_polling"
  >
>;

export const ERROR_STATES: ConfigEntry["state"][] = [
  "migration_error",
  "setup_error",
  "setup_retry",
];

export const getConfigEntries = (
  hass: ThirdEye,
  filters?: { type?: "helper" | "integration"; domain?: string }
): Promise<ConfigEntry[]> => {
  const params: any = {};
  if (filters) {
    if (filters.type) {
      params.type_filter = filters.type;
    }
    if (filters.domain) {
      params.domain = filters.domain;
    }
  }
  return hass.callWS<ConfigEntry[]>({
    type: "config_entries/get",
    ...params,
  });
};

export const updateConfigEntry = (
  hass: ThirdEye,
  configEntryId: string,
  updatedValues: ConfigEntryMutableParams
) =>
  hass.callWS<{ require_restart: boolean; config_entry: ConfigEntry }>({
    type: "config_entries/update",
    entry_id: configEntryId,
    ...updatedValues,
  });

export const deleteConfigEntry = (hass: ThirdEye, configEntryId: string) =>
  hass.callApi<{
    require_restart: boolean;
  }>("DELETE", `config/config_entries/entry/${configEntryId}`);

export const reloadConfigEntry = (hass: ThirdEye, configEntryId: string) =>
  hass.callApi<{
    require_restart: boolean;
  }>("POST", `config/config_entries/entry/${configEntryId}/reload`);

export interface DisableConfigEntryResult {
  require_restart: boolean;
}

export const disableConfigEntry = (
  hass: ThirdEye,
  configEntryId: string
) =>
  hass.callWS<DisableConfigEntryResult>({
    type: "config_entries/disable",
    entry_id: configEntryId,
    disabled_by: "user",
  });

export const enableConfigEntry = (hass: ThirdEye, configEntryId: string) =>
  hass.callWS<{
    require_restart: boolean;
  }>({
    type: "config_entries/disable",
    entry_id: configEntryId,
    disabled_by: null,
  });
