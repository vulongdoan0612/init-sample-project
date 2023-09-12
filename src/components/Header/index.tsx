import { Image } from "antd";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push('/login')
    }
    const handleRegister = () => {
        router.push('/register')
    }
    return (
        <div className="wrapper-header">
            <div className="block" ></div>
            <Image src="https://static.careerbuilder.vn/themes/careerbuilder/img/logo.png" preview={false}></Image>
            <div className="right-header">
                <div className="left-header">
                    <span onClick={handleLogin}>Đăng nhập</span>
                    <span onClick={handleRegister}>Đăng ký</span>

                </div>
                <div className="avatar">
                    <Image src="https://gamecenter-v2.saworld.io/_next/image?url=%2Fimages%2Fdefault%2Favatar.png&w=48&q=100" preview={false}></Image>
                </div>
            </div>
        </div>
    )
}
export default Header;