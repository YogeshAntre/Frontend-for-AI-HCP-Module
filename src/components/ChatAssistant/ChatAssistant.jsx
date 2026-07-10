import { useState } from "react";
import axios from "axios";
import "./chat.css";
import { useDispatch } from "react-redux";
import { updateInteraction } from "../../redux/interactionSlice";

function ChatAssistant(){
    const [message,setMessage] = useState("");
    const [chat,setChat] = useState([]);
    const dispatch = useDispatch();

    // Convert API JSON response into sentence
    const formatResponse = (data)=>{
        if(!data){
            return "";
        }
        // Search response
        if(Array.isArray(data)){
            return data.map(item=>
                `${item.hcp} interaction: ${item.notes}`
            ).join("\n\n");
        }

        // Log / Update interaction response
        if(data.hcp_name){

            return `
                    Interaction completed successfully.
                    HCP Name: ${data.hcp_name}
                    Specialty: ${data.specialty || "Unknown"}
                    Notes: ${data.notes || ""}
                    Outcome: ${data.outcome || "Not available"}
                                `;
        }
        // Summary response
        if(data.total_interactions){
            return `
                    CRM Interaction Summary:
                    Total Interactions: ${data.total_interactions}
                                `;
        }
        return JSON.stringify(data);
    }
    const handleLog = async()=>{
        if(!message.trim()) return;
        setChat(prev=>[
            ...prev,
            {
                role:"user",
                text:message
            }
        ]);
        try{
            const response = await axios.post(

                "http://127.0.0.1:8000/agent/chat/",
                {
                    message:message
                }
            );
            console.log(
                "FULL RESPONSE:",
                response.data
            );
            let apiData=response.data.interaction;
            // nested response handle
            if(apiData?.interaction){
                apiData=apiData.interaction;
            }
            console.log(
                "API DATA:",
                apiData
            );
           /*
              Redux update
              Only for log/update response
            */
            if(
                apiData &&
                apiData.hcp_name
            ){
                const payload={
                    hcp_name:
                    apiData.hcp_name,
                    specialty:
                    apiData.specialty || "",
                    topics:
                    apiData.notes || "",
                    outcome:
                    apiData.outcome || ""
                   
                };
                console.log(
                    "PAYLOAD:",
                    payload
                );
                dispatch(
                    updateInteraction(payload)
                );
                console.log(
                    "DISPATCH COMPLETED"
                );
            }
            // Sentence response for Chat UI
            const aiText = formatResponse(apiData);
            setChat(prev=>[
                ...prev,
                {
                    role:"ai",
                    text:aiText
                }
            ]);
        }
        catch(error){
            console.log(
                "API ERROR:",
                error
            );
            setChat(prev=>[
                ...prev,
                {
                    role:"ai",
                    text:"API Error"
                }
            ]);
        }
        setMessage("");
    }
return(
<div className="chat">
    <h3>🤖 AI Assistant
    <h6>Log Interaction via Chat</h6>
    </h3>
    <div className="chat-body">
        {
        chat.map((item,index)=>(
        <div
        key={index} className={item.role==="user"?"user-msg":"ai-msg"}>{item.text}
    </div>
        ))
        }
</div>
    <div className="chat-input">
    <input value={message} onChange={ (e)=>setMessage(e.target.value)} placeholder="Describe interaction..."/>
    <button onClick={handleLog}>Log</button>
    </div>
</div>
)
}
export default ChatAssistant;