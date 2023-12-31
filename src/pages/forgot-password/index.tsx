import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { Button, Form, Input } from "antd";
import {
  getProfile,
  requestForgotPassword,
  requestLogin,
  requestResetPassword,
} from "@/services/account";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticate } from "@/redux/reducers/auth";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/utils/checkToken";
import useDidMountEffect from "@/utils/customHook";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const router = useRouter();
  useDidMountEffect(() => {
    if (isLoggedIn()) {
      router.push("/");
    }
  }, [router]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishGetCode = async (values: any) => {
    try {
      const dataReset = {
        email: values.email,
      };
      const response = await requestForgotPassword(dataReset);
      if (response.status === 200) {
        setEmail(dataReset.email);
      } else {
        console.log("Sai mật khẩu hoặc tài khoản không tồn tại cc");
      }
    } catch (error: any) {
      console.log("Sai mật khẩu hoặc tài khoản không tồn tại", error);
    }
  };
  const onFinishReset = async (values: any) => {
    try {
      const dataReset = {
        email: email,
        confirmationCode: values.confirmationCode,
        newPassword: values.newPassword,
      };
      const response = await requestResetPassword(dataReset);
      if (response.status === 200) {
        router.push("/login");
      } else {
        console.log("Sai mật khẩu hoặc tài khoản không tồn tại cc");
      }
    } catch (error: any) {
      console.log("Sai mật khẩu hoặc tài khoản không tồn tại", error);
    }
  };
  return (
    <Page title={PAGE_TITLE.LOGIN} loadingData={loading}>
      <div className="login-page">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishGetCode}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Get Code
            </Button>
          </Form.Item>
        </Form>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishReset}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Code"
            name="confirmationCode"
            rules={[
              {
                required: true,
                message: "Please input your code!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your New Password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Reset Pass
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Page>
  );
};
export default ForgotPassword;
