import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { Button, Form, Input } from "antd";
import { getProfile, requestLogin, requestRegister } from "@/services/account";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticate } from "@/redux/reducers/auth";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/utils/checkToken";
import useDidMountEffect from "@/utils/customHook";

const SignUp = () => {
    const router = useRouter();
    useDidMountEffect(() => {
        if (isLoggedIn()) {
            router.push('/');
        }
    }, [router]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const onFinish = async (values: any) => {
        try {
            const dataLogin = {
                username:values.username,
                email: values.email,
                password: values.password
            }
            const response = await requestRegister(dataLogin);
            console.log(response)
            if (response.status === 201 && response?.data?.message ==='User registered successfully.') {
                // try {
                //     console.log(response?.data?.refreshToken)
                //     localStorage.setItem('access_token', response?.data?.token);
                //     localStorage.setItem('refresh_token', response?.data?.refreshToken);
                // } finally {
                //     const profile = await getProfile(response?.data?.token, response?.data?.refreshToken)
                //     console.log(profile)
                //     if (response.status === 200 && profile?.user) {
                //         console.log(profile.data)
                //         dispatch(setAuthenticate({ isAuthenticated: true, account: profile?.user, loading: false }));
                //     }
                //     router.push('/');
                // }
                router.push('/login');


            }
            else if (response.status === 400) {
                console.log("email already exists.")
            }
        } catch (error: any) {
            console.log('Sai mật khẩu hoặc tài khoản không tồn tại', error)
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <Page title={PAGE_TITLE.LOGIN} loadingData={loading} >
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
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
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
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
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
    )
}
export default SignUp;