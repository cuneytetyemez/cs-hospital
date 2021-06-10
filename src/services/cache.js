
let CacheService = {
   
    getItem: (key:String)=>{
        let result = localStorage.getItem(key)?? null
        if (typeof(result) == 'string'){
            result = JSON.parse(result);
        }
        return result;
    },

    setItem: (key:String,payload:Object) =>{
        if (!!!payload)
          throw new Error('Invalid payload');
          
        localStorage.setItem(key,JSON.stringify(payload));
    },

    removeItem: (key:string)=>{
        localStorage.removeItem(key)
    }


};


export {
    CacheService
}

// interface CacheService {
//     getItem:function name(params) {
        
//     }
    
// }