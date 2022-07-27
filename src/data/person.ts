import { ThirdEye } from "../types";

export interface Person {
  id: string;
  name: string;
  user_id?: string;
  device_trackers?: string[];
  picture?: string;
}

export interface PersonMutableParams {
  name: string;
  user_id: string | null;
  device_trackers: string[];
  picture: string | null;
}

export const fetchPersons = (hass: ThirdEye) =>
  hass.callWS<{
    storage: Person[];
    config: Person[];
  }>({ type: "person/list" });

export const createPerson = (
  hass: ThirdEye,
  values: PersonMutableParams
) =>
  hass.callWS<Person>({
    type: "person/create",
    ...values,
  });

export const updatePerson = (
  hass: ThirdEye,
  personId: string,
  updates: Partial<PersonMutableParams>
) =>
  hass.callWS<Person>({
    type: "person/update",
    person_id: personId,
    ...updates,
  });

export const deletePerson = (hass: ThirdEye, personId: string) =>
  hass.callWS({
    type: "person/delete",
    person_id: personId,
  });
