import { ThirdEye } from "../types";
import { handleFetchPromise } from "../util/hass-call-api";

export interface InstallationType {
  installation_type:
    | "Third Eye Operating System"
    | "Third Eye Container"
    | "Third Eye Supervised"
    | "Third Eye Core"
    | "Unknown";
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingCoreConfigStepResponse {}

export interface OnboardingUserStepResponse {
  auth_code: string;
}

export interface OnboardingIntegrationStepResponse {
  auth_code: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingAnalyticsStepResponse {}

export interface OnboardingResponses {
  user: OnboardingUserStepResponse;
  core_config: OnboardingCoreConfigStepResponse;
  integration: OnboardingIntegrationStepResponse;
  analytics: OnboardingAnalyticsStepResponse;
}

export type ValidOnboardingStep = keyof OnboardingResponses;

export interface OnboardingStep {
  step: ValidOnboardingStep;
  done: boolean;
}

export const fetchOnboardingOverview = () =>
  fetch("/api/onboarding", { credentials: "same-origin" });

export const onboardUserStep = (params: {
  client_id: string;
  name: string;
  username: string;
  password: string;
  language: string;
}) =>
  handleFetchPromise<OnboardingUserStepResponse>(
    fetch("/api/onboarding/users", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );

export const onboardCoreConfigStep = (hass: ThirdEye) =>
  hass.callApi<OnboardingCoreConfigStepResponse>(
    "POST",
    "onboarding/core_config"
  );

export const onboardAnalyticsStep = (hass: ThirdEye) =>
  hass.callApi<OnboardingAnalyticsStepResponse>("POST", "onboarding/analytics");

export const onboardIntegrationStep = (
  hass: ThirdEye,
  params: { client_id: string; redirect_uri: string }
) =>
  hass.callApi<OnboardingIntegrationStepResponse>(
    "POST",
    "onboarding/integration",
    params
  );

export const fetchInstallationType = async (): Promise<InstallationType> => {
  const response = await fetch("/api/onboarding/installation_type", {
    method: "GET",
  });

  if (response.status === 401) {
    throw Error("unauthorized");
  }

  return response.json();
};
