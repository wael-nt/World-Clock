let data = [];
let continent = [];
let America = [];
let Asia = [];
let Africa = [];
let  Australia =[];
let  Europe =[];
let  Indian =[];
let  Pacific =[];
let  Antarctica =[];
let  Atlantic =[];
let  Etc =[];
let  notSorted =[];
const openAPI = "http://worldtimeapi.org/api/timezone/";
let countries =[];

async function getCities(url){
    const response = await fetch(url);
     data = await response.json();
     data.forEach(element => {
         let item = element.substring(0,element.indexOf('/'));
         let item1 = element.substring(element.indexOf('/')+1);
         let found = continent.includes(item);
         let found1 = countries.includes(item1);
         if(!found1){
            countries.push(item1) ;
         }
         if(!found){
            continent.push(item) ;
         }
         switch(item) {
            case "America":
              America.push(item1);
              break;
            case "Asia":
                Asia.push(item1);
              break;
              case "Africa":
                Africa.push(item1);
              break;
              case "Australia":
                Australia.push(item1);
              break;
              case "Europe":
                Europe.push(item1);
              break;
              case "Indian":
                Indian.push(item1);
              break;
              case "Pacific":
                Pacific.push(item1);
              break;
              case "Antarctica":
                Antarctica.push(item1);
              break;
              case "Atlantic":
                Atlantic.push(item1);
              break;
              case "Etc":
                Etc.push(item1);
              break;
              default:
                notSorted.push(item1);
                break;
          }
         
     });
    
     geterateListOfCities(countries);
    
    }

    function geterateListOfCities(countries){ 
      countries.sort();
     /*  var select = document.getElementById("my-selector");
       for (index of countries){
        var opt = index;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
       } */
       var select1 = document.getElementById("my-selector2");
       for (index of countries){
        var opt = index;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select1.appendChild(el);
       }
       console.log("array long");
       console.log(countries.length);
    }
    
  async  function  getTimeFromCity(){
       /*  let select = document.getElementById("my-selector");
        let value = select.options[select.selectedIndex].text; */
        let select1 = document.getElementById("my-selector1");
        let value1 = select1.options[select1.selectedIndex].text;
        document.body.style.backgroundImage = "url(/wwwroot/images/"+value1+".jpg)";
        let date = new Date();
        if(America.includes(value1)){
           date =  await fetchDateFromCity("America",value1.toString());
        }else if (Africa.includes(value1)){
          date = await fetchDateFromCity("Africa",value1.toString());
        }else if (Asia.includes(value1)){
          date =await fetchDateFromCity("Asia",value1.toString());
        }else if (Europe.includes(value1)){
          date =await  fetchDateFromCity("Europe",value1.toString());
        }else if (Etc.includes(value1)){
          date =await  fetchDateFromCity("Etc",value1.toString());
        }else if (Australia.includes(value1)){
          date =await fetchDateFromCity("Australia",value1.toString());
        }else if (Antarctica.includes(value1)){
          date =await fetchDateFromCity("Antarctica",value1.toString());
        }else if (Atlantic.includes(value1)){
          date =await  fetchDateFromCity("Atlantic",value1.toString());
        }else if (Indian.includes(value1)){
          date = await fetchDateFromCity("Indian",value1.toString());
        }else if (Pacific.includes(value1)){
          date = await fetchDateFromCity("Pacific",value1.toString());
        }else {
            console.log("NOT FOUND");
        }
         return date ;
    }
   
    async function addCity(){
      let select = document.getElementById("my-selector2");
      let value = select.options[select.selectedIndex].text;
      console.log(value);
      var select1 = document.getElementById("my-selector1");
      var opt = value;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select1.appendChild(el);

    }
 async function fetchDateFromCity(continent,city){
    const response = await fetch(openAPI+continent+"/"+city);
    let cityInfo = await response.json();
    let values = Object.values(cityInfo);
    let dateTimeFromCity = values[2];
    let year = dateTimeFromCity.substring(0,4);
    let month = dateTimeFromCity.substring(5,7);
    let day = dateTimeFromCity.substring(8,10);
    let hour = dateTimeFromCity.substring(11,13);
    let minute = dateTimeFromCity.substring(14,16);
    let second =  dateTimeFromCity.substring(17,19);
    const finalDate = 
    new Date(parseInt(year)
    ,parseInt(month)
    ,parseInt(day),parseInt(hour)
    ,parseInt(minute),parseInt(second)
    );
    return finalDate;
 }

 getCities(openAPI);





