import axios from "axios";

export const getJobs = async (page, limit, itemQuery) => {
  const options = {
    method: "GET",
    headers: { "accept-company": "900a776e-a060-422e-a5e3-979ef669f16b" },
    url: "https://devapi-indexer.elevatustesting.xyz/api/v1/jobs",
    params: {
      language_profile_uuid: "ee5d991c-cdc6-4e83-b0b3-96f147208549",
      itemQuery: itemQuery || "",
      limit: limit || 1,
      page: page || 1,
    },
  };
  const res = await axios(options);
  return res.data.results;
};

export const getJob = async (uri) => {
  const options = {
    method: "GET",
    headers: { "accept-company": "900a776e-a060-422e-a5e3-979ef669f16b" },
    url: "https://devapi-indexer.elevatustesting.xyz/api/v1/jobs/uri",
    params: {
      language_profile_uuid: "ee5d991c-cdc6-4e83-b0b3-96f147208549",
      uri,
    },
  };
  const res = await axios(options);
  return res.data.results;
};
