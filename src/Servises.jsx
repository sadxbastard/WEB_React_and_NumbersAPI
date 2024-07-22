import axios from "axios"

export const getQuestion = async (quiz) => {
    try{
        const response = await axios.get(`http://numbersapi.com/random/${quiz}?json`);
        // console.log(response.data)
        console.clear();
        console.log("Answer is " + (response.data && 'year' in response.data? response.data.year : response.data.number));
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}