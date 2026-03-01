"use server";

// TODO: Implement getSession when backend auth is ready
// import { getSession } from '@/framework/server-actions/common';
// TODO: Implement getTranslationsByLocale when i18n is ready
// import { getTranslationsByLocale } from '@/framework/server-actions/locale';

async function apiClient(url, requestOptions = {}) {
  const {
    isForm = false,
    headers = {},
    addAuthorization = false,
    ...rest
  } = requestOptions;

  // TODO: Uncomment when getSession is implemented
  // if (!url?.includes('auth') || addAuthorization) {
  //   const session = await getSession();
  //   headers['Authorization'] = `Bearer ${session?.accessToken}`;
  // }

  headers["accept-language"] = "en";

  if (!isForm) {
    headers["Content-Type"] = "application/json";
  }

  const updatedRequestOptions = { headers, ...rest };

  const response = await fetch(url, updatedRequestOptions)
    .then(async (response) => {
      const contentType = response?.headers?.get("content-type");

      if (contentType && contentType?.includes("json")) {
        const responseJson = await response.json();
        if (typeof responseJson?.success === "undefined") {
          responseJson.statusCode = response?.ok;
        }
        return responseJson;
      } else if (contentType && contentType?.includes("octet-stream")) {
        return response;
      } else {
        if ([401, 403].includes(response?.status)) {
          return {
            status: response?.status,
            success: response?.ok,
            error: "Session expired. Please log in again.",
          };
        }
        throw new Error("An unexpected error occurred.");
      }
    })
    .catch((error) => {
      throw error;
    });

  return response;
}

export { apiClient };
