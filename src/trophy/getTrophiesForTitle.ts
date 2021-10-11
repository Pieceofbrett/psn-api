import urlcat from "urlcat";

import type { AuthorizationPayload, TitleTrophiesResponse } from "@/models";

import { call } from "../call";
import { baseUrl } from "./baseUrl";

interface GetTrophiesForTitleOptions {
  /**
   * Not required unless the platform is PS3, PS4, or PS Vita.
   * If one of these platforms, the value __must__ be `"trophy"`.
   *
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: "trophy" | "trophy2";

  /** Limit the number of trophies returned. */
  limit: number;

  /** Returns trophy data from this result onwards. */
  offset: number;
}

/**
 * A request to this URL will retrieve the individual trophy detail of a
 * single - or all - trophy groups for a title. A title can have multiple
 * groups of trophies (a `default` group which all titles have, and additional
 * groups named `"001"` incrementing for each additional group). To retrieve
 * trophies from all groups within a title (ie. the full trophy set) then
 * `trophyGroupId` should be set to all.
 *
 * When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` parameter as `"trophy"`.
 *
 * @param authorization An object containing your access token, typically retrieved with `getAuthenticationToken()`.
 * @param npCommunicationId Unique ID of the title.
 * @param trophyGroupId `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC).
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.limit Limit the number of trophies returned.
 * @param options.offset Returns trophy data from this result onwards.
 */
export const getTrophiesForTitle = async (
  authorization: AuthorizationPayload,
  npCommunicationId: string,
  trophyGroupId: string,
  options?: Partial<GetTrophiesForTitleOptions>
) => {
  const url = buildRequestUrl(npCommunicationId, trophyGroupId, options);

  return await call<TitleTrophiesResponse>({ url }, authorization);
};

const buildRequestUrl = (
  npCommunicationId: string,
  trophyGroupId: string,
  options?: Partial<GetTrophiesForTitleOptions>
) => {
  return urlcat(
    baseUrl,
    "/v1/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    {
      npCommunicationId,
      trophyGroupId,
      ...options
    }
  );
};
