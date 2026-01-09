import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifiedStatus } from './types';

interface IHideUser {
  name: string | null;
  roomId: string | null;
  visibility: string | null;
  role: string | null;
}

interface IHideUserAuth {
  hideUser: IHideUser;
  scene?: string;
  onVerify: (status: VerifiedStatus) => void;
}

const useHideUserAuth = (props: IHideUserAuth) => {
  const { scene, hideUser, onVerify } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (hideUser.visibility === 'false' && scene) {
      // 当需要隐藏用户且场景存在时，跳转到登录页面
      // 保留原有的查询参数，以便登录后能够返回到正确的页面
      onVerify(VerifiedStatus.Failed);
      navigate(`/login${location.search}`);
    }
  }, [hideUser, scene, navigate, onVerify]);
};

export default useHideUserAuth;
