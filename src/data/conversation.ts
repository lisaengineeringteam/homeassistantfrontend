import { ThirdEye } from "../types";

interface ProcessResults {
  card: { [key: string]: Record<string, string> };
  speech: {
    [SpeechType in "plain" | "ssml"]: { extra_data: any; speech: string };
  };
}

export interface AgentInfo {
  attribution?: { name: string; url: string };
  onboarding?: { text: string; url: string };
}

export const processText = (
  hass: ThirdEye,
  text: string,
  // eslint-disable-next-line: variable-name
  conversation_id: string
): Promise<ProcessResults> =>
  hass.callWS({
    type: "conversation/process",
    text,
    conversation_id,
  });

export const getAgentInfo = (hass: ThirdEye): Promise<AgentInfo> =>
  hass.callWS({
    type: "conversation/agent/info",
  });

export const setConversationOnboarding = (
  hass: ThirdEye,
  value: boolean
): Promise<boolean> =>
  hass.callWS({
    type: "conversation/onboarding/set",
    shown: value,
  });
