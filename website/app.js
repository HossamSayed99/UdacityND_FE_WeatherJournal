/* Global Variables */
const key = '03a969cda6c0211a950219fe9d60b7b6';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// An async function to get the data from the weather api
const getWeatherData = async () => {
    let zipCode = document.getElementById('zip').value;
    const response = await fetch(baseUrl + zipCode +',us&appid='+key);
    try{
        const data = await response.json()
        return data;
    }
    catch(err){
        console.log("error", err);
    }
}
// An async function to post the weather data retrieved from to the api to the server endpoint
const postWeatherData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
        const newData = await response.json();
        return newData
    }catch(error) {
    console.log("error", error);
    }
}


// An asynv function to update the UI after updating the data
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.user_response;
        
    }catch(error){
        console.log("error", error);
    }
}
// The call back function for the click event on the button that chains all promises
function performAction(e){
    getWeatherData().then( // First get data from the API
        (data) =>{
            postWeatherData('/data', { // Afterwards, if data is retrieved succefully, post data to the server
                temperature: data.main.temp,
                date : newDate,
                user_response: document.getElementById('feelings').value
            }).then( // Finally, update the UI
                updateUI()
            )
        }
    )  
}


document.getElementById('generate').addEventListener('click', performAction);