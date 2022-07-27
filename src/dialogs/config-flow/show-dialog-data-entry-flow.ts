import { TemplateResult } from "lit";
import { fireEvent } from "../../common/dom/fire_event";
import type { HaFormSchema } from "../../components/ha-form/types";
import {
  DataEntryFlowStep,
  DataEntryFlowStepAbort,
  DataEntryFlowStepCreateEntry,
  DataEntryFlowStepExternal,
  DataEntryFlowStepForm,
  DataEntryFlowStepMenu,
  DataEntryFlowStepProgress,
} from "../../data/data_entry_flow";
import { IntegrationManifest } from "../../data/integration";
import { ThirdEye } from "../../types";

export interface FlowHandlers {
  integrations: string[];
  helpers: string[];
}
export interface FlowConfig {
  loadDevicesAndAreas: boolean;

  getFlowHandlers?: (hass: ThirdEye) => Promise<FlowHandlers>;

  createFlow(hass: ThirdEye, handler: string): Promise<DataEntryFlowStep>;

  fetchFlow(hass: ThirdEye, flowId: string): Promise<DataEntryFlowStep>;

  handleFlowStep(
    hass: ThirdEye,
    flowId: string,
    data: Record<string, any>
  ): Promise<DataEntryFlowStep>;

  deleteFlow(hass: ThirdEye, flowId: string): Promise<unknown>;

  renderAbortDescription(
    hass: ThirdEye,
    step: DataEntryFlowStepAbort
  ): TemplateResult | "";

  renderShowFormStepHeader(
    hass: ThirdEye,
    step: DataEntryFlowStepForm
  ): string;

  renderShowFormStepDescription(
    hass: ThirdEye,
    step: DataEntryFlowStepForm
  ): TemplateResult | "";

  renderShowFormStepFieldLabel(
    hass: ThirdEye,
    step: DataEntryFlowStepForm,
    field: HaFormSchema
  ): string;

  renderShowFormStepFieldHelper(
    hass: ThirdEye,
    step: DataEntryFlowStepForm,
    field: HaFormSchema
  ): string;

  renderShowFormStepFieldError(
    hass: ThirdEye,
    step: DataEntryFlowStepForm,
    error: string
  ): string;

  renderExternalStepHeader(
    hass: ThirdEye,
    step: DataEntryFlowStepExternal
  ): string;

  renderExternalStepDescription(
    hass: ThirdEye,
    step: DataEntryFlowStepExternal
  ): TemplateResult | "";

  renderCreateEntryDescription(
    hass: ThirdEye,
    step: DataEntryFlowStepCreateEntry
  ): TemplateResult | "";

  renderShowFormProgressHeader(
    hass: ThirdEye,
    step: DataEntryFlowStepProgress
  ): string;

  renderShowFormProgressDescription(
    hass: ThirdEye,
    step: DataEntryFlowStepProgress
  ): TemplateResult | "";

  renderMenuHeader(hass: ThirdEye, step: DataEntryFlowStepMenu): string;

  renderMenuDescription(
    hass: ThirdEye,
    step: DataEntryFlowStepMenu
  ): TemplateResult | "";

  renderMenuOption(
    hass: ThirdEye,
    step: DataEntryFlowStepMenu,
    option: string
  ): string;

  renderLoadingDescription(
    hass: ThirdEye,
    loadingReason: LoadingReason,
    handler?: string,
    step?: DataEntryFlowStep | null
  ): string;
}

export type LoadingReason =
  | "loading_handlers"
  | "loading_flow"
  | "loading_step"
  | "loading_devices_areas";

export interface DataEntryFlowDialogParams {
  startFlowHandler?: string;
  searchQuery?: string;
  continueFlowId?: string;
  manifest?: IntegrationManifest | null;
  domain?: string;
  dialogClosedCallback?: (params: {
    flowFinished: boolean;
    entryId?: string;
  }) => void;
  flowConfig: FlowConfig;
  showAdvanced?: boolean;
  dialogParentElement?: HTMLElement;
}

export const loadDataEntryFlowDialog = () => import("./dialog-data-entry-flow");

export const showFlowDialog = (
  element: HTMLElement,
  dialogParams: Omit<DataEntryFlowDialogParams, "flowConfig">,
  flowConfig: FlowConfig
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-data-entry-flow",
    dialogImport: loadDataEntryFlowDialog,
    dialogParams: {
      ...dialogParams,
      flowConfig,
      dialogParentElement: element,
    },
  });
};
