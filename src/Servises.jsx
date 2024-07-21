import axios from "axios"

export const getQuestion = async (quiz) => {
    try{
        const response = await axios.get(`http://numbersapi.com/random/${quiz}?json`);
        console.log(response.data)
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}