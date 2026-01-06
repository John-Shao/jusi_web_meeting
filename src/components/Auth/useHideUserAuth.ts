import { useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Apis from '@/apis/login';
import { useDispatch } from '@/store';
import { setRTSParams } from '@/store/slices/rts';
import { login, setUserVisibility } from '@/store/slices/user';
import { VerifiedStatus } from './types';
import { BASENAME, userConfig } from '@/config';

interface IHideUser {
  name: string | null;
  roomId: string | null;
  visibility: string | null;
  role: string | null;
  code?: string | null;
}

interface IHideUserAuth {
  hideUser: IHideUser;
  onVerify: (status: VerifiedStatus) => void;
}

const useHideUserAuth = (props: IHideUserAuth) => {
  const { hideUser, onVerify } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (hideUser.visibility === 'false') {
      const smsLogin = async () => {
        const phone = hideUser.name;
        const code = hideUser.code;

        if (!phone || !code) {
          message.error('隐藏登录需要在 URL 中提供手机号（username）和验证码（code）');
          onVerify(VerifiedStatus.Failed);
          return;
        }

        const res = await Apis.smsLoginApi({
          phone,
          code,
        });

        if (res.code !== 200) {
          message.error(res.message);
          return;
        }

        const freeUser = res.response;
        const rtsRes = await Apis.setAppInfo({
          login_token: freeUser.login_token,
          app_id: userConfig.appId,
          app_key: userConfig.appKey,
          volc_ak: userConfig.accessKeyId,
          volc_sk: userConfig.accessKeySecret,
          account_id: userConfig.accountId,
        });

        if (rtsRes.code !== 200) {
          message.error(rtsRes.message);
          return;
        }
        dispatch(login(freeUser));

        dispatch(setRTSParams(rtsRes.response));

        dispatch(setUserVisibility(false));
        onVerify(VerifiedStatus.Pass);
        const naviPath = location.pathname.replace(BASENAME, '');
        navigate(`${naviPath}${location.search}`);
      };

      onVerify(VerifiedStatus.Waiting);

      smsLogin();
    }
  }, [hideUser]);
};

export default useHideUserAuth;
