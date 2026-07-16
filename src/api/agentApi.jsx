// import axios from "axios";

// const API="http://127.0.0.1:8000";


// export const sendMessage=async(message)=>{


//     const response=await axios.post(
//         `${API}/agent/chat`,
//         {
//             message:message
//         }
//     );


//     return response.data;

// }
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const sendMessage = async (message) => {
  const response = await axios.post(
    `${API}/agent/chat`,
    {
      message: message,
    }
  );

  return response.data;
};