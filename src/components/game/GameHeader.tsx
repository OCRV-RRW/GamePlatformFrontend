import game_header_styles from '../../../src/css_modules/style.module.css'

interface GameHeaderProps {
    game_name: string
}

export default function GameHeader(props: GameHeaderProps) {
    return (
        <>
            <div className={game_header_styles.gameHeader}>
                <h1 style={{color: "red"}}>ОЦРВ ИГРЫ</h1>
                <h1>{props.game_name}</h1>
            </div>
        </>
    )
}