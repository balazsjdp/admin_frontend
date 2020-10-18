import axios from 'axios'


const API_BASE_URI = 'http://localhost/admin_api/api/'



export const BASIC_FUNCTIONS = {

    CallApi : (api,method,data,callback,catchBlock) => {

        axios({
            method: method,
            url: API_BASE_URI + api,
            data: data
          })
          .then((data) => {callback(data.data)})
          .catch((data) => {catchBlock(data)})

    },

    getDatabaseStatus : () => {
        const dbStatusIcon = document.getElementById('connection_status')
        BASIC_FUNCTIONS.CallApi("api_frame.php?command=database_connection_check","GET",{number : 1},(data) => {
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
        },(catchData) => {
            console.error(catchData)
            try{
                dbStatusIcon.classList.add('connection-error')
              }catch(err){
                  console.error(err)
              }
            return false;
        })
      }


}