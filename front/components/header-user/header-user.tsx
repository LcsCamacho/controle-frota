import { logOffReducer } from 'features/redux/user-slice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import avatar from '/public/avatar.png';


export default function HeaderUser() {
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = () => {
        dispatch(logOffReducer());
        router.push('/');
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.user}>
                    <Image src={avatar}
                        alt="User" width={30}
                        height={30} />
                    <span>{user.name}</span>
                    <small onClick={logout}>Sair</small>
                </div>
            </div>
        </div>
    );
}