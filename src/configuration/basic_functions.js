import axios from 'axios'
import {BASIC_CONFIG} from './basic_config'



export const BASIC_FUNCTIONS = {

    CallApi : async ({api,method,data,onSuccess,onError}) => {

      if(!api || !method)
        return false;

        axios({
            method: method,
            url: BASIC_CONFIG.API_BASE_URI + api,
            data: data
          })
          .then((data) => {onSuccess(data.data)})
          .catch((data) => {onError(data)})

    },

    getDatabaseStatus : () => {
        const dbStatusIcon = document.getElementById('connection_status')

      BASIC_FUNCTIONS.CallApi({
        api: "api_frame.php?command=database_connection_check",
        method: "GET",
        data: null,
        onSuccess: (data) => {
          if(data.success){
            try{
              dbStatusIcon.classList.add('connection-success')
            }catch(err){
                console.error(err)
            }
            return true;
          }else{
            try{
                dbStatusIcon.classList.add('connection-error')
              }catch(err){
                  console.error(err)
              }
              return false;
          }
        },
        onError: (error) => {
          console.error(error)
          try{
              dbStatusIcon.classList.add('connection-error')
            }catch(err){
                console.error(err)
            }
          return false;
          }
        })
      },

      Alert: (type,title,text) => {
        document.body.innerHTML += `<h1 id="alert" style="color:red">ALERT</h1>`
        setTimeout(() => {
          document.getElementById("alert").remove()
        }, 2000);
      },
      
      compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }

}