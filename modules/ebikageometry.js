 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";


Ebk.Geometry = {}
/////// Ebk.Geometry.Geobartrix
Ebk.Geometry.Geobartrix = class EbkGeometryGeobartrix {
    #params;
    #process;
    #isCreate;
    #dataError;
    
 
    constructor(params ={ granularity: 10,
                          geomatrix: {origin:[0,0],  matrix: [[4,2 ], [3,6 ]] }, 
                          axisRythmes:[
                            {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]} ,
                            {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return Math.cos(x); }, messy:[-1,1]} ,
                            {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.01, x); }, messy:[-1,1]} ,
                            {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(0.05, x); }, messy:[-1,1]} ,
                          ]   

           }){

    

            // this.#dataError = `Attribut matrix, origin have to be defined in params this way, {   origin : [0,0],   matrix: [[4,2,0], [3,6,0]]  }`;
          
            // this.#isCreate = false;
            // this.name = `Ebk.Tainsangle`;
            // if (!(Ebk.isObject(params))||(!Ebk.isMatrixOfNumbers(params.matrix))||(!Ebk.isArrayOfNumbers(params.origin))){
         
                 // console.error(this.#dataError);
               // return null; 
         
            // } else { 
         
     
         
              
    
                this.name = `Ebk.Geometry.Geobartrix`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};
        

                this.#params =  Object.assign({},  params );

                this.#process.samples = [
                    [[0],[1]],
                    [[0],[1]],
                    [[0],[-1]],
                    [[0],[-1]],
                ]
                

                this.#assignSubParamsForCreation( );


                this.#isCreate = true;
    
            // }

            

        
    }
    
    _update(params =params ={ granularity: 10,
        geomatrix: {origin:[0,0],  matrix: [[4,2 ], [3,6 ]] }, 
        axisRythmes:[
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return Math.cos(x); }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.01, x); }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(0.05, x); }, messy:[-1,1]} ,
        ]   

     }){
        
       this.#params = Object.assign(this.#params ,Ebk.objectDeepCopy (params));

       this.#assignSubParamsForUpdate( );
    
    }


    #assignSubParamsForCreation( ){

        this.#process.axisRythmes = [];
        this.#params.axisRythmes.forEach((itm, ndx) =>{
            itm.granularity = this.#params.granularity;
            this.#params.axisRythmes[ndx].sample = this.#process.samples[ndx];

            this.#process.axisRythmes.push(new Ebk.Rythm(this.#params.axisRythmes[ndx]));
            
        }); 


        this.#process.geoMatrix = new Ebk.GeoMatrix(this.#params.geomatrix); //this.#params.geomtrix
                
    }

    #assignSubParamsForUpdate( ){

 
        this.#params.axisRythmes.forEach((itm, ndx) =>{
            itm.granularity = this.#params.granularity;
            this.#params.axisRythmes[ndx].sample = this.#process.samples[ndx];

            this.#process.axisRythmes[ndx]._update(this.#params.axisRythmes[ndx]);  
            
        }); 

        this.#process.geoMatrix._update( this.#params.geomatrix);  
                
    }


    #getSectionAxis( section = 0 ){

        if (section == 0) return [0, 1]
        else if (section == 1) return [2, 1]
        else if (section == 2) return [2, 3]
        else if (section == 3) return [0, 3]
        else  return [0, 1];

    }    

    zone(){

            let origin = this.#params.geomatrix.origin;
            let p0 =  Ebk.Matrix.vectAdd({v1:this.#params.geomatrix.origin, v2: this.#params.geomatrix.matrix[0] });
            let p1 =  Ebk.Matrix.vectAdd({v1:this.#params.geomatrix.origin, v2: this.#params.geomatrix.matrix[1] });
            let p2 =  Ebk.Matrix.vectAdd({v1:this.#params.geomatrix.origin, v2:
                      Ebk.Matrix.vectScale({v:this.#params.geomatrix.matrix[0],scalar: -1})
                     });
            let p3 =  Ebk.Matrix.vectAdd({v1:this.#params.geomatrix.origin, v2:
                        Ebk.Matrix.vectScale({v:this.#params.geomatrix.matrix[1],scalar: -1})
                       });         
            

        return [ 
                 [ origin, p0,p1],
                 [ origin, p1,p2],
                 [ origin, p2,p3],
                 [ origin, p3,p0],
            ]


    }

    
    bar(params = { section : 0, index: 0}){

        let axis = this.#getSectionAxis(params.section);

        let ndx0 = params.index ;
        let ndx1 = params.index + 1;
       
        let axis0Scalar0 =   this.#process.axisRythmes[ axis[0] ].locate({step: ndx0})[0];
        let axis0Scalar1 =   this.#process.axisRythmes[ axis[0] ].locate({step: ndx1})[0];
         
        let axis1Scalar1 =   this.#process.axisRythmes[ axis[1] ].locate({step: ndx1})[0];

        let coord0 =   this.#process.geoMatrix.locate(params = { scalars : [axis0Scalar0,0]});
        let coord1 =   this.#process.geoMatrix.locate(params = { scalars : [axis0Scalar1,0]});
         
        let coord2 =   this.#process.geoMatrix.locate(params = { scalars : [axis0Scalar1,axis1Scalar1]});
        let coord3 =   this.#process.geoMatrix.locate(params = { scalars : [axis0Scalar0,axis1Scalar1]});

        
         return [
            [coord0, coord1, coord2],
            [coord0, coord2, coord3]
         ]
    }



    bars(params = { section : 0}){

        let arr = [];

        for(let ndx = 0; ndx < this.#params.granularity; ndx++ ){
            arr = arr.concat(this.bar({ section : params.section, index: ndx}))
        }

        return arr;

    }

    barsMatrix(){

        let arr = [];

         let arr0 = this.bars( { section : 0});
         let arr1 = this.bars( { section : 1});
         let arrA = arr0.concat(arr1);

         let arr2 = this.bars( { section : 2});
         let arrB = arrA.concat(arr2);

         let arr3 = this.bars( { section : 3});
         let arrC = arrB.concat(arr3);

    
        return  arrC;
    }




    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }



}  


Ebk.Geometry.GeobartrixTests = (paramsTestOptions =[
    
    {creation:  { granularity: 10,
        geomatrix: {origin:[0,0],  matrix: [[4,2 ], [3,6 ]] }, 
        axisRythmes:[
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return Math.cos(x); }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.01, x); }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(0.05, x); }, messy:[-1,1]} ,
        ],
        section: 0, index:0


     },   

      update:  { granularity: 10,
        geomatrix: {origin:[0,0],  matrix: [[4,2 ], [3,6 ]] }, 
        axisRythmes:[
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return Math.cos(x); }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.01, x); }, messy:[-1,1]} ,
          {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(0.05, x); }, messy:[-1,1]} ,
        ]   ,
        section: 1, index: 1

}}] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.Geobartrix,paramsTestOptions, exceptions );

}



let EbkGeo = Ebk.Geometry

export {EbkGeo}
export default EbkGeo;