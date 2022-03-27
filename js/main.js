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


// Get all cities from open API and sort them into different arrays by continent and countries : 
async function getCities(url){
    const response = await fetch(url);
     data = await response.json();
     data.forEach(element => {
         let item = element.substring(0,element.indexOf('/'));
         let item1 = element.substring(element.indexOf('/')+1);
         let found = continent.includes(item);
         let found1 = countries.includes(item1);
         console.log(item);
         console.log(item1);
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
      // Call geterateListOfCities after calling get cities method that are not connected with event listener and is needed each page reload .
      geterateListOfCities(countries);
    }

    // Call getCities method that are not connected with event listener and is needed each page reload .
    getCities(openAPI);

    // Render all cities inside all cities list
    async function geterateListOfCities(countries){ 
      // sort the cities by name ASC
      countries.sort();
       var select1 = document.getElementById("my-selector2");
       for (index of countries){
        var opt = index;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select1.appendChild(el);
       }
    }
   
    //Get time from city selected from my cities select box and fetch data using fetchDateFromCity method
  async  function  getTimeFromCity(){
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

    //fetch time from rest api : return date object 
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

      // add city from all cities to Local storage :D 
    async function addCity(){
      let counter = localStorage.length;
      counter++;
      let select = document.getElementById("my-selector2");
      let value = select.options[select.selectedIndex].text;
      let isFound =await checkOptionsValues(value);
      if (isFound) {
        alert("This city has been already added to your list");
        return;
      }
      var opt = value;
      console.log(localStorage.setItem(counter,opt));
      localStorage.setItem(counter,opt);
      location.reload();
    }

     //Read my cities saved in local storage 
    async function readCity(){
      for (let i = 1 ; i<=localStorage.length;i++){
        var select1 = document.getElementById("my-selector1");
        var el = document.createElement("option");
        if(localStorage.getItem(i)!=null){
            el.textContent = localStorage.getItem(i);
            el.value = i;
            select1.appendChild(el);
        }
      }
    }

    // Call readCity method that are not connected with event listener and is needed each page reload .
  readCity();

      //Clear local storage
    async function clearLocalStorage(){
      localStorage.clear();
      location.reload();
    }

     // Remove one item from localStorage
    async function deleteItem(){
      let select = document.getElementById("my-selector1");
      let value = select.options[select.selectedIndex].value;
      console.log(value);
      localStorage.removeItem(value);
      location.reload();
    }
    
    // Check if city has been already added
   async function checkOptionsValues(element){
     let isFound ;
      Array.from(document.getElementById("my-selector1").options).forEach(function(option_element) {
       let option_value = option_element.value;
       if(element===option_value){
         isFound = true;
       }
       else isFound=false;
      });
    return isFound;
    }


  
 
