import { axios } from "@/utils/axios";
export const uploadJob = async (data: any, accessToken: string) => {
  const config = {
    method: "POST",
    url: `/create-job-employer`,
    data: data,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const applyJob = async (data: any, accessToken: string) => {
  const config = {
    method: "POST",
    url: `/apply-job`,
    data: data,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const getApplied = async (accessToken: string) => {
  const config = {
    method: "GET",
    url: `/applied-job`,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const getUserAppliedJob = async (accessToken: string, id: any | undefined) => {
  const config = {
    method: "GET",
    url: `/get-list-apply-job?jobId=${id}`,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const getListCreateJob = async (token: string, pageSize: number, currentPage: number, filter: string) => {
  const config = {
    method: "GET",
    url: `/get-list-create-job?pageSize=${pageSize}&currentPage=${currentPage}&filter=${filter}`,
    headers: {
      'Authorization': token
    },
  };

  return axios(config);
};
export const getAllJob = async (pageSize: number, currentPage: number, filter: string, type: any) => {
  let typeParam = type;
  if (Array.isArray(type)) {
    typeParam = type.map(encodeURIComponent).join('$');
  }
  const config = {
    method: "GET",
    url: `/get-all-apply-job?pageSize=${pageSize}&currentPage=${currentPage}&filter=${filter}&type=${typeParam}`
  };

  return axios(config);
};
export const getAllTypeJob = async () => {

  const config = {
    method: "GET",
    url: `/get-all-type`
  };

  return axios(config);
};

export const editJob = async (accessToken: string |null, data: any,slug:string|null) => {
  const config = {
    method: "PUT",
    url: `/edit-job-employer?querySlug=${slug}`,
    data:data,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};