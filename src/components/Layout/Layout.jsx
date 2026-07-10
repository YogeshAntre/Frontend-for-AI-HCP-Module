
import InteractionForm from "../InteractionForm/InteractionForm";
import ChatAssistant from "../ChatAssistant/ChatAssistant";
import "./layout.css";
function Layout(){
    return(
        <div className="container">

            <h2 className="data">Log HCP Interaction</h2>

            <div className="main">
            
                <InteractionForm/>

                <ChatAssistant/>

            </div>

        </div>
    )
}


export default Layout;