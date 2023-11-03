 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";


Ebk.Geometry = {}

/////// Ebk.Navigation
Ebk.Geometry.ClassModel = class EbkClassModel {
    #params;
    #process;
    #isCreate;
    #dataError;
    
 
    constructor(params ={ 
           }){

    

            this.#dataError = `Attribut matrix, origin have to be defined in params this way, {   origin : [0,0],   matrix: [[4,2,0], [3,6,0]]  }`;
          
            this.#isCreate = false;
            this.name = `Ebk.GeoMatrix`;
            if (!(Ebk.isObject(params))||(!Ebk.isMatrixOfNumbers(params.matrix))||(!Ebk.isArrayOfNumbers(params.origin))){
         
                console.error(this.#dataError);
                return null; 
         
            } else { 
         
     
         
              
    
                this.name = `Ebk.Sequence.Creation`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};
        
                this.#params =  Object.assign({},  params );
          
                
                this.#isCreate = true;
    
            }

            

        
    }
    
    _update(params ={ 

     }){
        
    
        this.#params =  Object.assign(this.#params,  params );
   
    }


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }



}  

let EbkGeom = Ebk.Geometry

export {EbkGeom}
export default EbkGeom;

