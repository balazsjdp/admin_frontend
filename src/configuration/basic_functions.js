import axios from 'axios'
import {BASIC_CONFIG} from './basic_config'
import Swal from 'sweetalert2'


export const BASIC_FUNCTIONS = {

    CallApi : async ({api,method,data,headers,onSuccess,onError}) => {

      if(!api || !method)
        return false;
        let config = {headers}
        axios({
            method: method,
            url: BASIC_CONFIG.API_BASE_URI + api,
            data: data,
            config: config
          })
          .then((data) => {onSuccess(data.data)})
          .catch((data) => {
            let e = {...data}
            if(e.response){
              onError(e.response.data)
              console.error(e.response.data.message)
            }else{
              console.error(data)
              BASIC_FUNCTIONS.TopAlert.fire({
                icon: 'error',
                title: 'Network error. Cannot connect to the database. Please contact the support!'
            })
            onError()
            }
            
          
          })

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

      TopAlert : Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }),
      
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
    },

    SetPreferredLanguage(lang){
      localStorage.setItem(BASIC_CONFIG.LOCALSTORAGE_PREFERRED_LANG_KEY,lang)
    },

    GetPreferredLanguage(){
      const lang = localStorage.getItem(BASIC_CONFIG.LOCALSTORAGE_PREFERRED_LANG_KEY)
      return lang ? lang : null;
    }


}