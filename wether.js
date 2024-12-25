const userLocation=document.querySelector("#userLocation");
const converter=document.querySelector("#converter");
const icon=document.querySelector(".weather-icon");
const temp=document.querySelector(".temprature");
const feelsLike=document.querySelector(".feelsLike");
const discription=document.querySelector(".discription");
const date=document.querySelector(".date");
const city=document.querySelector(".city");
const Hvalue=document.querySelector("#Hvalue");
const Wvalue=document.querySelector("#Wvalue");
const Cvalue=document.querySelector("#Cvalue");
const UVvalue=document.querySelector("#UVvalue");
const Pvalue=document.querySelector("#Pvalue");
const forcast=document.querySelector(".forcast")
const searchLocation=document.querySelector(".searchLocation");
const day=document.querySelectorAll(".forcast .days .day");
const dayIcon=document.querySelectorAll(".day-icon");
const sunRS=document.querySelectorAll(".sunRS");

const content = (data)=>{
    temp.textContent=data.current.temp_c+" °C";
    feelsLike.textContent="FeelsLike "+data.current.feelslike_c;
    Cvalue.textContent=data.current.cloud+" %";
    icon.src=data.current.condition.icon;
    Wvalue.textContent=data.current.wind_mph+" miles/h";
    Hvalue.textContent=data.current.humidity+" %";
    Pvalue.textContent=data.current.pressure_mb+" hPa";
    UVvalue.textContent=data.current.uv;
    date.textContent=data.current.last_updated;
    discription.textContent=data.current.condition.text;
    city.textContent=data.name;

    day.forEach((d, index) => {
        if (data.forecast.forecastday[index]) {
            d.textContent =  data.forecast.forecastday[index].date;
        } else {
            d.textContent = "No data available";
        }
    });

    dayIcon.forEach((d, index) => {
        if (data.forecast.forecastday[index]) {
            d.src = data.forecast.forecastday[index].day.condition.icon;
        } else {
            d.src = "";
        }
    });

    sunRS.forEach((d, index) => {
        if (data.forecast.forecastday[index]) {
            const astro = data.forecast.forecastday[index].astro;
            d.textContent = `Sunrise at ${astro.sunrise} and Sunset at ${astro.sunset}`;
        } else {
            d.textContent = "No data available";
        }
    });
};

async function mainFunction(value){
    let url=`https://api.weatherapi.com/v1/forecast.json?key=6d3f6435050744ca906101347242512&q=${value}&days=7&aqi=yes&alerts=no`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    content(data);
}

searchLocation.addEventListener("click",()=>{
    mainFunction(userLocation.value);
});
