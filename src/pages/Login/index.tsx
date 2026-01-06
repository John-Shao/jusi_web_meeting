import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import SceneLogo from '@/assets/images/SceneLogo.png';
import * as Apis from '@/apis/login';
import { useDispatch } from '@/store';
import { login } from '@/store/slices/user';
import Footer from './Footer';
import styles from './index.module.less';

const PHONE_REGEX = /^1\d{10}$/; // 简单校验，仅适用于中国手机号

export default function () {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleSendCode = async () => {
    try {
      const values = await form.validateFields(['phone']);
      const phone: string = values.phone;
      const res = await Apis.sendSmsCodeApi({ phone });
      if (res.code !== 200) {
        message.error(res.message);
        return;
      }
      message.success('验证码已发送');
      setCountdown(60);
      timerRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      // 验证未通过或发送失败
    }
  };

  const handleLogin = async () => {
    const formValue = await form.validateFields();
    const res = await Apis.smsLoginApi({ phone: formValue.phone, code: formValue.code });
    if (res.code !== 200) {
      message.error(res.message);
      return;
    }
    dispatch(login(res.response));
    navigate(`/${location.search}`);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.mainWrapper}>
        <div className={styles.main}>
          <div className={styles.mainTitle}>
            <img width={400} src={SceneLogo} alt="logo" />
          </div>
          <Form form={form} onFinish={handleLogin} initialValues={{}}>
            <Form.Item
              name="phone"
              validateTrigger="onChange"
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.reject(new Error('请输入手机号'));
                    if (!PHONE_REGEX.test(value)) return Promise.reject(new Error('手机号格式不正确'));
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input autoComplete="off" placeholder="手机号" className={styles['phone-input']} />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: '请输入验证码' },
                { len: 6, message: '请输入6位验证码' },
              ]}
            >
              <Input
                autoComplete="off"
                placeholder="短信验证码"
                className={styles['phone-input']}
                suffix={
                  <button type="button" onClick={handleSendCode} disabled={countdown > 0}>
                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </button>
                }
              />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              wrapperCol={{ span: 24 }}
              className={styles['login-agree']}
              rules={[{ required: true, message: '请先阅读并同意' }]}
            >
              <Checkbox>
                已阅读并同意
                <a href="https://www.volcengine.com/docs/6348/128955" target="_blank" rel="noreferrer">
                  《用户协议》
                </a>
                和
                <a href="https://www.volcengine.com/docs/6348/68918" target="_blank" rel="noreferrer">
                  《隐私权政策》
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.agree !== curValues.agree}>
              {({ getFieldValue }) => {
                return (
                  <Form.Item>
                    <Button disabled={!getFieldValue('agree')} htmlType="submit" type="primary" className={styles['login-check']}>
                      登录
                    </Button>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}