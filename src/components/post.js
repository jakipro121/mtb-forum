import style from '@/app/css/post.module.css'

export default function Post({children}) {
    return (
        <div className={style.card}>
            {children}
        </div>
    );
}