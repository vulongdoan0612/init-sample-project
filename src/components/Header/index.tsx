import { RootState } from "@/redux/store";
import { Drawer, Dropdown, Image, Skeleton, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getProfileEmployer, logout, requestNewAccessToken } from "@/services/account";
import { setAuthenticate } from "@/redux/reducers/auth";
import useDidMountEffect from "@/utils/customHook";
import React, { useEffect, useState } from 'react';
import { HEADER_TITLE } from "@/constants/header";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { IconMenuHeader } from "../CustomIcons";

const Header = () => {
    useDidMountEffect(() => {
        fetchData();
    }, [])

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { account, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const handleLogOut = () => {
        logout(dispatch)
    }
    const items = [
        account?.username || account?.companyName
            ? {
                key: '1',
                label: (
                    <>
                        <span className="username">{account?.username ? account?.username : account?.companyName}</span>
                    </>
                ),
            }
            : null, // Sử dụng `null` khi không muốn hiển thị key '1'
        account?.username || account?.companyName
            ? {
                key: '2',
                label: (
                    <>
                        <span onClick={handleLogOut}>Tài khoản</span>
                    </>
                ),
            }
            : {
                key: '2',
                label: (
                    <Link href="/login">
                        <span >Đăng nhập</span>
                    </Link>
                ),
            },
        account?.username || account?.companyName
            ? {
                key: '3',
                label: (
                    <>
                        <span onClick={handleLogOut}>Đăng xuất</span>
                    </>
                ),
            }
            : {
                key: '3',
                label: (
                    <Link href="/register">
                        <span >Đăng ký</span>
                    </Link>
                ),
            },
    ];


    const widthScreenMobile = useMediaQuery({
        query: '(max-width: 1199px)',
    });
    const handleMenuClick = (e: any) => {
        console.log('click', e);
    };
    const fetchData = async () => {
        const token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')

        const role = localStorage.getItem('role')
        if (role === 'user') {
            try {
                if (token && refresh_token) {
                    dispatch(setAuthenticate({ loading: true }));
                    const response = await getProfile(String(token), String(refresh_token));
                    if (response?.user) {
                        dispatch(setAuthenticate({ isAuthenticated: true, account: response?.user, loading: false }));
                    }
                }
            }
            catch {
                console.log('error')
            }

        }else if(role==='business'){
            try {
                if (token && refresh_token) {
                    dispatch(setAuthenticate({ loading: true }));
                    const response = await getProfileEmployer(String(token), String(refresh_token));
                    if (response?.employer) {
                        dispatch(setAuthenticate({ isAuthenticated: true, account: response?.employer, loading: false }));
                    }
                }
            }
            catch {
                console.log('error')
            }
        }


    }

    const handleRegister = () => {
        router.push('/register')
    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="wrapper-header">
            {widthScreenMobile ? <div className="block"><IconMenuHeader onClick={showDrawer}></IconMenuHeader></div> : <></>}
            <Image src="https://static.careerbuilder.vn/themes/careerbuilder/img/logo.png" preview={false}></Image>
            {isAuthenticated ?
                <>
                    {loading ? <Skeleton active loading={loading} /> : <div className="right-header">
                        <Dropdown
                            menu={menuProps}
                            trigger={['click']}
                        >
                            <div className="avatar">
                                <Image src={account.avatar} preview={false}></Image>
                            </div>

                        </Dropdown>
                    </div>}
                </>
                : <div className="right-header">
                    <Dropdown
                        menu={menuProps}
                        trigger={['click']}
                    >


                        <div className="avatar">
                            <Image src='https://gamecenter-v2.saworld.io/_next/image?url=%2Fimages%2Fdefault%2Favatar.png&w=48&q=100' preview={false}></Image>

                        </div>
                    </Dropdown>

                </div>}
            <Drawer className="drawer-mobile" placement="left" onClose={onClose} open={open}>
                <Link href={'/'}>
                    <p>Trang chủ</p>

                </Link>


                <Link href={'/job'}>
                    <p>Công việc</p>
                </Link>
                <Link href={'/'}>
                    <p>Doanh nghiệp</p>

                </Link>


                <Link href={'/about-us'}>
                    <p>Về chúng tôi</p>
                </Link>
                <Link href={'/contact'}>
                    <p>Liên hệ</p>
                </Link>

            </Drawer>
        </div>
    )
}
export default Header;
