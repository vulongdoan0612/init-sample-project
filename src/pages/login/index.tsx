import { useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { Button, Form, Input } from "antd";
import { requestLogin } from "@/services/account";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/utils/checkToken";
import useDidMountEffect from "@/utils/customHook";
import Link from "next/link";
// import { IconMenuHeader } from "@/components/CustomIcons";

const Login = () => {
  const router = useRouter();
  useDidMountEffect(() => {
    if (isLoggedIn()) {
      router.push("/");
    }
  }, [router]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      const dataLogin = {
        email: values.username,
        password: values.password,
      };
      const response = await requestLogin(dataLogin);
      if (response.status === 200 && response?.data?.token) {
        try {
          localStorage.setItem("access_token", response?.data?.token);
          localStorage.setItem("refresh_token", response?.data?.refreshToken);
          localStorage.setItem("role", response?.data?.role);
        } finally {
          router.push("/");
        }
      } else if (response.status === 404) {
        console.log("Sai mật khẩu hoặc tài khoản không tồn tại cc");
      }
    } catch (error: any) {
      console.log("Sai mật khẩu hoặc tài khoản không tồn tại", error);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Link
              href="/login-employer"
              style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "1.5rem",
              }}
            >
              Bạn là doanh nghiệp ?
            </Link>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="forgot-password">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Link href="/register">Bạn chưa có tài khoản ?</Link>
            </Form.Item>
            <Link className="login-form-forgot" href="/forgot-password">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Page>
  );
};
export default Login;
