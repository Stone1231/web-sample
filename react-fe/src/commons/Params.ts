class Params {
    static get UserName():string{  
        var value = localStorage.getItem("username");

        if(value == null){
            return "";
        }
        else{
            return value;
        }
    }  

    static set UserName(value: string) {
         localStorage.setItem('username', value);
    }
} 

export default Params
