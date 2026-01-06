import { Link } from 'react-router-dom';
import { useDispatch } from '@/store';

import style from './index.module.less';

interface ISceneItem {
  sceneName: string;
  scenePic: string;
}

function SceneItem(props: ISceneItem) {
  const { sceneName, scenePic } = props;
  const dispatch = useDispatch();
  const handleScene = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  };

  return (
    <Link to="/vc" className={style.sceneItem} onClick={(e) => handleScene(e)}>
      <div className={style.imgWrapper}>
        <img src={scenePic} alt="meeting" />
      </div>
      <span>{sceneName}</span>
    </Link>
  );
}

export default SceneItem;
