import { ThirdEye } from "../types";
import { DataEntryFlowStep } from "./data_entry_flow";

export const createOptionsFlow = (hass: ThirdEye, handler: string) =>
  hass.callApi<DataEntryFlowStep>(
    "POST",
    "config/config_entries/options/flow",
    {
      handler,
      show_advanced_options: Boolean(hass.userData?.showAdvanced),
    }
  );

export const fetchOptionsFlow = (hass: ThirdEye, flowId: string) =>
  hass.callApi<DataEntryFlowStep>(
    "GET",
    `config/config_entries/options/flow/${flowId}`
  );

export const handleOptionsFlowStep = (
  hass: ThirdEye,
  flowId: string,
  data: Record<string, any>
) =>
  hass.callApi<DataEntryFlowStep>(
    "POST",
    `config/config_entries/options/flow/${flowId}`,
    data
  );

export const deleteOptionsFlow = (hass: ThirdEye, flowId: string) =>
  hass.callApi("DELETE", `config/config_entries/options/flow/${flowId}`);
