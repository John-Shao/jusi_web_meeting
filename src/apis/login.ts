import { HOST } from '@/config';
import { RTSState } from '@/store/slices/rts';

const BASEURL = '/api/v1/login';

// 校验验证码成功时后端返回内容
export interface IUserInfo {
  user_id: string; // 校验成功时, 将 map 用户手机号至唯一的 用户 id
  user_name: string; // 用户名称
  login_token: string; // 业务服务器登陆token
  created_at: number; // 创建时间
}

// 校验验证码成功时出参
export interface ILoginReturn {
  code: number; // 成功返回情况下, 将返回 200
  message: string; // 成功返回情况下, 将返回 'ok', 失败情况下将返回失败原因
  response: IUserInfo;
}

// 加入 RTS 房间入参
interface ISetAppInfo {
  login_token: string;
  app_id: string;
  app_key: string;
  volc_ak: string;
  volc_sk: string;
  account_id: string;
  scenes_name: string;
}

/**
 * 发送短信验证码
 */
export const sendSmsCodeApi = (body: {
  phone: string
  }): Promise<{
  code: number;
  message: string;
}> => {
  return fetch(`${HOST}${BASEURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_name: 'sendSmsCode',
      content: JSON.stringify({
        phone: body.phone,
      }),
    }),
  }).then((res) => {
    return res.json();
  });
};

/**
 * 短信登录（使用手机号 + 验证码），返回与免密登录相同的 IUserInfo
 */
export const smsLoginApi = (body: {
  phone: string;
  code: string
  }): Promise<{
  code: number;
  message: string;
  response: IUserInfo;
}> => {
  return fetch(`${HOST}${BASEURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_name: 'smsCodeLogin',
      content: JSON.stringify({
        phone: body.phone,
        code: body.code,
      }),
    }),
  }).then((res) => {
    return res.json();
  });
};

/**
 * 获取加入rts房间必要的参数
 * @param body
 * @returns
 */
export const setAppInfo = (
  body: ISetAppInfo
): Promise<{
  code: number;
  message: string;
  response: RTSState;
}> => {
  return fetch(
    `${HOST}${BASEURL}`,
    {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        event_name: 'setAppInfo',
        content: JSON.stringify(body),
      }),
    }
  ).then((res) => {
    return res.json();
  });
};

/**
 * 更新用户名
 * @param body
 * @returns
 */
export const changeUserName = (body: {
  user_name: string;
  login_token: string;
}): Promise<{
  code: number;
  message: string;
}> => {
  return fetch(`${HOST}${BASEURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_name: 'changeUserName',
      content: JSON.stringify(body),
    }),
  }).then((res) => {
    return res.json();
  });
};
