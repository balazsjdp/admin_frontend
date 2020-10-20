import axios from 'axios'
import {BASIC_CONFIG} from './basic_config'



export const BASIC_FUNCTIONS = {

    CallApi : async (api,method,data,callback,catchBlock) => {

      if(!api || !method)
        return false;

        axios({
            method: method,
            url: BASIC_CONFIG.API_BASE_URI + api,
            data: data
          })
          .then((data) => {callback(data.data)})
          .catch((data) => {catchBlock(data)})

    },

    getDatabaseStatus : () => {
        const dbStatusIcon = document.getElementById('connection_status')
        BASIC_FUNCTIONS.CallApi("api_frame.php?command=database_connection_check","GET",{},(data) => {
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
      },

      Alert: (type,title,text) => {
        document.body.innerHTML += `<h1 id="alert" style="color:red">ALERT</h1>`
        setTimeout(() => {
          document.getElementById("alert").remove()
        }, 2000);
      }

}