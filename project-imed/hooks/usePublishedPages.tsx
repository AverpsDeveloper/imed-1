import api from "@/http";
const usePublishedPages = async () => {
  try {
    let {data} = await api.get("/pages");    
    return data;
  } catch (error) {
   return error;
  }
};

export default usePublishedPages;
