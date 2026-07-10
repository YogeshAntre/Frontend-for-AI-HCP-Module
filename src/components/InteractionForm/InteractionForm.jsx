import { useSelector } from "react-redux";
import "./interactionForm.css";
function InteractionForm(){
    const interaction = useSelector(
        state => state.interaction
    );
console.log("Redux Form Data:",interaction);
return(
    
<div className="form-card">
    <h3 className="name_data">Interaction Details</h3>
    <div className="row">
    <div>
    <label>HCP Name</label>
    <input value={interaction.hcp_name || ""}placeholder="Search or select HCP..."readOnly/>
</div>

<div>
    <label>Interaction Type</label>
    <select value={interaction.interaction_type || "Meeting"}>
    <option>Meeting</option>
    <option>Call</option>
    <option>Email</option>
    </select>
</div>


</div>
<div className="row">
    <div>
    <label>Date</label>
    <input type="date" value={interaction.date || ""} />
</div>


<div>
    <label>Time</label>
    <input type="time" value={interaction.time || ""} />
</div>




</div>

<label>Attendees</label>

 <input placeholder="Enter names or search..." />

<label>Topics Discussed</label>

<textarea value={interaction.topics || ""} placeholder="Enter key discussion points..." readOnly />

 <button className="voice">
 🎤 Summarize from Voice Note (Requires Consent)
 </button>
<label>
Materials Shared / Samples Distributed
</label>


<div className="box">

        <div>
        <b>Materials Shared</b>
        <button>
        🔍 Search/Add
        </button>
        </div>
        <p>No materials added.</p>
    </div>



    <div className="box">

        <div>
        <b>Samples Distributed</b>
        <button>➕ Add Sample</button>
        </div>
        <p>No samples added.</p>
    </div>
    <label>Observed HCP Sentiment</label>


    <div className="sentiment">
        <label>
        <input type="radio" checked={interaction.sentiment==="Positive"} readOnly />
        Positive
        </label>

        <label>
        <input type="radio" checked={interaction.sentiment==="Neutral"} readOnly />
        Neutral
        </label>

        <label>
        <input type="radio" checked={interaction.sentiment==="Negative"} readOnly/>
        Negative
        </label>


    </div>



    <label>Outcomes</label>
    <textarea value={interaction.outcome || ""} placeholder="Key outcomes or agreements..." readOnly/>
    <label>Follow-up Actions</label>

    <textarea value={interaction.follow_up || ""} placeholder="Enter next steps or tasks..." readOnly/>

    <label>
    AI Suggested Follow-ups:
    </label>

    <ul>

    <li>Schedule follow-up meeting in 2 weeks</li>
    <li>Send Product brochure PDF</li>
    <li>Add doctor to advisory board invite list</li>

    </ul>
</div>
)
}
export default InteractionForm;