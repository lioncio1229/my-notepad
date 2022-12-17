import Provider from "./provider";
import Main from "./routes/main";

export default function MyNotepad()
{
    return(
        <div className="calculator-container">
            <Provider>
                <Main />
            </Provider>
        </div>
    )
}