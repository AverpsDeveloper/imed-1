import axios from "axios";
const usePublishedPages = async () => {
  try {
    let {data} = await axios.get("api/pages");
    console.log(data);
    
    return data;
  } catch (error) {
   return false;
  }
};

export default usePublishedPages;
