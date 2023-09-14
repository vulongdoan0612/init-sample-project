import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { Button, Form, Input } from "antd";
import { useEffect, useMemo, useRef, useState } from 'react';
import { changeProfile } from "@/services/account";
import { setAuthenticate } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
const { TextArea } = Input;

const ModalEditPlan = ({ isEdit, open, handleCancel, selectedItem }: any) => {
    const [form] = Form.useForm<{ plan: string }>();
    const dispatch = useDispatch();
    const { account } = useSelector((state: RootState) => state.auth);
    const editor = useRef(null);
    const [content, setContent] = useState('');

    console.log(selectedItem)
    useEffect(() => {
        form.setFieldsValue({
            plan: selectedItem?.userInfo ? selectedItem?.userInfo[0].plan : '',


        });
    }, [
        form,
        selectedItem?.userInfo ? selectedItem?.userInfo[0].plan : '',
    ]);
    const onFinish = async (values: any) => {
        try {
            console.log(values)
            const token = localStorage.getItem('access_token')
            const valuesEdit = {
                ...account?.userInfo[0], // Giữ nguyên các thuộc tính khác
                plan: values.plan, // Thay đổi thuộc tính "plan"
            };
            console.log(valuesEdit)
            const response = await changeProfile({ userInfo: valuesEdit, username: values.username }, token)
            if (response.status === 200) {
                dispatch(setAuthenticate({ isAuthenticated: true, account: response?.data.user, loading: false }));
            }
        } catch (error) {
            console.log(error)
        }
    };
    console.log(selectedItem?.userInfo ? selectedItem?.userInfo[0]?.plan : '')
    return (
        <CustomModal
            title={'Edit Plan'}
            open={open}
            onCancel={handleCancel}
            className="modal-banner"

            width={'50vw'}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    plan: selectedItem?.userInfo ? selectedItem?.userInfo[0]?.plan : '',
                }}
            >
                <Form.Item name="plan" label="Plan" rules={[{ required: true, message: 'Name is required' }]}>
                    <TextArea
                    
                        placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>


                <div className="column-buttons flex justify-end" style={{ marginTop: '24px' }}>
                    <Button htmlType="submit" type="primary">
                        Edit
                    </Button>

                </div>
            </Form>
        </CustomModal>
    )
}
export default ModalEditPlan;