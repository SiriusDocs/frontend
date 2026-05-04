import { Header } from "../components/Header";

export const TitlePage = () => {
    return (
        <div>
            <Header />

            <div className="flex text-accent items-center justify-center ">
                <h1 className="text-3xl font-bold text-center">
                    Добро пожаловать на платформу СириусДокументы!
                </h1>
            </div>
        </div>
    )
}