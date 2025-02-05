import styles from '../../../css_modules/style.module.css'

export default function Header() {
    return (
        <>
            <div className={styles.gameHeader}>
                <h1 style={{color: "red"}}>ОЦРВ ИГРЫ</h1>
                <h1>АДМИНКА</h1>
            </div>
        </>
    )
}