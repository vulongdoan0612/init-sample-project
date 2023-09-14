import { IForgotPassword, ILogin, IRegister, IResetPassword } from "@/interfaces/request/account";
import { setAuthenticate } from "@/redux/reducers/auth";
import { axios } from "@/utils/axios";

export const requestLogin = async (data: ILogin) => {
  const config = {
    method: "POST",
    url: `/login`,
    data: data,
  };

  return axios(config);
};
export const requestForgotPassword = async (data: IForgotPassword) => {
  const config = {
    method: "POST",
    url: `/forgot-password`,
    data: data,
  };

  return axios(config);
};
export const requestForgotPasswordEmployer = async (data: IForgotPassword) => {
  const config = {
    method: "POST",
    url: `/forgot-password-employer`,
    data: data,
  };

  return axios(config);
};
export const requestResetPassword = async (data: IResetPassword) => {
  const config = {
    method: "POST",
    url: `/reset-password`,
    data: data,
  };

  return axios(config);
};
export const requestResetPasswordEmployer = async (data: IResetPassword) => {
  const config = {
    method: "POST",
    url: `/reset-password-employer`,
    data: data,
  };

  return axios(config);
};
export const requestLoginEmployer = async (data: ILogin) => {
  const config = {
    method: "POST",
    url: `/login-employer`,
    data: data,
  };

  return axios(config);
};
export const requestRegister = async (data: IRegister) => {
  const config = {
    method: "POST",
    url: `/register`,
    data: data,
  };

  return axios(config);
};
export const changeProfile = async (data: any,accessToken:string |null) => {
  const config = {
    method: "PUT",
    url: `/change-profile`,
    data: data,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const changeProfileEmployer = async (data: any,accessToken:string |null) => {
  const config = {
    method: "PUT",
    url: `/change-profile-employer`,
    data: data,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const getProfile = async (accessToken: string, refresh_token: string) => {
  const config = {
    method: "GET",
    url: `profile`,
    headers: {
      'Authorization': accessToken
    },
  };

  try {
    const response = await axios(config);
    return response.data; // Trả về dữ liệu từ API
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      try {
        console.log('Token đã hết hạn ')
        await requestNewAccessToken(String(refresh_token))
      } catch (error) {
        console.log(error)
      }
    } else {
      throw error; // Ném lỗi nếu có lỗi khác xảy ra
    }
  }
};

export const getProfileEmployer = async (accessToken: string, refresh_token: string) => {
  const config = {
    method: "GET",
    url: `profile-employer`,
    headers: {
      'Authorization': accessToken
    },
  };

  try {
    const response = await axios(config);
    return response.data; // Trả về dữ liệu từ API
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      try {
        console.log('Token đã hết hạn ')
        await requestNewAccessToken(String(refresh_token))
      } catch (error) {
        console.log(error)
      }
    } else {
      throw error; // Ném lỗi nếu có lỗi khác xảy ra
    }
  }
};
export const requestNewAccessToken = async (refreshToken: string) => {
  console.log(refreshToken)
  try {
    const config = {
      method: "POST",
      url: `/refresh-token`,
      data: {
        "refreshToken": refreshToken
      }
    }

    const response = await axios(config);
    if (response.status === 200) {
      const data = response.data;
      const newAccessToken = data.accessToken;
      // Lưu trữ token mới và cập nhật state
      localStorage.setItem('access_token', newAccessToken);
    } else {
      // Xử lý lỗi, ví dụ: đăng xuất người dùng
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

    }
  } catch (error) {
    console.error('Lỗi khi cập nhật token:', error);
  }
};
// utils.js

export const logout = (dispatch: any) => {
  // Xóa AccessToken và RefreshToken từ Local Storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('role');

  // Gửi dispatch để cập nhật trạng thái đăng nhập
  dispatch(setAuthenticate({ isAuthenticated: false, account: {}, loading: false }));
};
