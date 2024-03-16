import axios from "axios";

export const getPlaceData = async (formData: any) => {
    try {
        const response = await axios.post('/api/place-data', JSON.stringify(formData))
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getCoordinate = async (pname: string) => {
    const options = {
        method: 'GET',
        url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
        params: {
          address: pname,
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key':'be4a3a6a00msh877c451edd2567ap1d2adajsn469ee7f3c86d',
          'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data.results[0].geometry.location
    } catch (error) {
        console.error(error);
    }
}


export const getSuggestion=async (pname:string)=>{
    
    try {

        const response = await axios.get(`/api/autocomplete?pname=${pname}`)
        return response.data;
    } catch (e:any) {
        console.log(e)
    }
}




