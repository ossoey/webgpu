 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";
import { EbkCov} from "./ebikacovering.js";
 
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

Ebk.Geometry.CircleTrix2D = class EbkGeometryCircleTrix2D  {
    #params;
    #process;
    #isCreate;
    #dataError;
   
    constructor(params ={   
                           radius: 1., 
                           verticesCount: 8,
                           geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
                           rythms: {
                             angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                             edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
                           }
                            
               }){

                this.name = `Ebk.Geometry.CircleTrix2D`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};

                this.#params =  Object.assign({},  params );

                this.#assignSubParamsForCreation( );

                this.#isCreate = true;
  
    }
    
    _update(params  ={ 
        radius: 1., 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle:   {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
        }
     }){
        
       this.#params = Object.assign(this.#params , Ebk.objectDeepCopy (params));

       this.#assignSubParamsForUpdate( );
    
    }

    #assignSubParamsForCreation( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.angle.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix = new Ebk.GeoMatrix(this.#params.geomatrix);
        this.#process.rythms = {};
        this.#process.rythms.angle = new  Ebk.Rythm(this.#params.rythms.angle);
       // this.#process.rythms.angle.locate({step:0})[0]
               
    }

    #assignSubParamsForUpdate( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.angle.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix._update(this.#params.geomatrix);
        this.#process.rythms.angle._update(this.#params.rythms.angle); 
 
    }

    #getVertexPosition(index) {
       let currentAngle = this.#process.rythms.angle.locate({step:index})[0];
       let location = this.#process.geoMatrix.locate({scalars: [ this.#params.radius*Math.cos(currentAngle), this.#params.radius*Math.sin(currentAngle)]})

      return  [location[0], location[1]];
    }

    getVerticesPosition() {
        let arr = [];

        for(let ndx = 0; ndx <= this.#params.rythms.angle.granularity; ndx++ ){
            arr.push(  this.#getVertexPosition( ndx ) );
        }

        return arr;
    } 

    getCoveredPosition() {
    
        let covering = new EbkCov.OpenPath2D({
            positions: this.getVerticesPosition(),
            thicknessRythm:this.#params.rythms.edge
        });
         
        return   covering.thicknessPath();
    } 


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.Geometry.CircleTrix2DTests = (paramsTestOptions =[
    
    {creation:  { 
        radius: 1., 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [Math.PI]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     },   

      update: { 
        radius: 1., 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [Math.PI]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     }}] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.CircleTrix2D,paramsTestOptions, exceptions );

}

Ebk.Geometry.CircloidTrix2D = class EbkGeometryCircloidTrix2D  {
    #params;
    #process;
    #isCreate;
    #dataError;
   
    constructor(params ={   
                           radius: [1., 0.5 ], 
                           verticesCount: 8,
                           geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
                           rythms: {
                             angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                             edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
                           }
                            
               }){

                this.name = `Ebk.Geometry.Circloid2D`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};

                this.#params =  Object.assign({},  params );

                this.#assignSubParamsForCreation( );

                this.#isCreate = true;
  
    }
    
    _update(params  ={ 
        radius: [1., 0.5 ], 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle:   {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
        }
     }){
        
       this.#params = Object.assign(this.#params , Ebk.objectDeepCopy (params));

       this.#assignSubParamsForUpdate( );
    
    }

    #assignSubParamsForCreation( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.angle.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix = new Ebk.GeoMatrix(this.#params.geomatrix);
        this.#process.rythms = {};
        this.#process.rythms.angle = new  Ebk.Rythm(this.#params.rythms.angle);
       // this.#process.rythms.angle.locate({step:0})[0]
               
    }

    #assignSubParamsForUpdate( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.angle.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix._update(this.#params.geomatrix);
        this.#process.rythms.angle._update(this.#params.rythms.angle); 
 
    }

    #getVertexPosition(index) {
       let currentAngle = this.#process.rythms.angle.locate({step:index})[0];
       let location = this.#process.geoMatrix.locate({scalars: [ this.#params.radius[0]*Math.cos(currentAngle), this.#params.radius[1]*Math.sin(currentAngle)]})

      return  [location[0], location[1]];
    }

    getVerticesPosition() {
        let arr = [];

        for(let ndx = 0; ndx <= this.#params.rythms.angle.granularity; ndx++ ){
            arr.push(  this.#getVertexPosition( ndx ) );
        }

        return arr;
    } 

    getCoveredPosition() {
    
        let covering = new EbkCov.OpenPath2D({
            positions: this.getVerticesPosition(),
            thicknessRythm:this.#params.rythms.edge
        });
         
        return   covering.thicknessPath();
    } 


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.Geometry.Circloid2DTests = (paramsTestOptions =[
    
    {creation:  { 
        radius: [1., 0.5 ], 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [Math.PI]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     },   

      update: { 
        radius: [1., 0.5 ], 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [Math.PI]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     }}] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.CircloidTrix2D,paramsTestOptions, exceptions );

}

Ebk.Geometry.SpiralTrix2D = class EbkGeometryCircleTrix2D  {
    #params;
    #process;
    #isCreate;
    #dataError;
   
    constructor(params ={   
                            
                           verticesCount: 18,
                           geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
                           rythms: {
                             angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                             edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
                             radius: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.1], [0.6]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                           }
                            
               }){

                this.name = `Ebk.Geometry.SpiralTrix2D`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};

                this.#params =  Object.assign({},  params );

                this.#assignSubParamsForCreation( );

                this.#isCreate = true;
  
    }
    
    _update(params  ={ 
      
        verticesCount: 18,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle:   {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
          radius: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.1], [0.6]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     }){
        
       this.#params = Object.assign(this.#params , Ebk.objectDeepCopy (params));

       this.#assignSubParamsForUpdate( );
    
    }

    #assignSubParamsForCreation( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.angle.granularity = this.#params.verticesCount+1;
        this.#params.rythms.radius.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix = new Ebk.GeoMatrix(this.#params.geomatrix);
        this.#process.rythms = {};
        this.#process.rythms.angle = new  Ebk.Rythm(this.#params.rythms.angle);
        this.#process.rythms.radius = new  Ebk.Rythm(this.#params.rythms.radius);
       // this.#process.rythms.angle.locate({step:0})[0]
               
    }

    #assignSubParamsForUpdate( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.angle.granularity = this.#params.verticesCount+1;
        this.#params.rythms.radius.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix._update(this.#params.geomatrix);
        this.#process.rythms.angle._update(this.#params.rythms.angle); 
        this.#process.rythms.radius._update(this.#params.rythms.radius); 
    }

    #getVertexPosition(index) {
       let currentAngle = this.#process.rythms.angle.locate({step:index})[0];
       let currentRadius = this.#process.rythms.radius.locate({step:index})[0];

       let location = this.#process.geoMatrix.locate({scalars: [ currentRadius*Math.cos(currentAngle), currentRadius*Math.sin(currentAngle)]})

      return  [location[0], location[1]];
    }

    getVerticesPosition() {
        let arr = [];

        for(let ndx = 0; ndx <= this.#params.rythms.angle.granularity; ndx++ ){
            arr.push(  this.#getVertexPosition( ndx ) );
        } 

        return arr;
    } 

    getCoveredPosition() {
    
        let covering = new EbkCov.OpenPath2D({
            positions: this.getVerticesPosition(),
            thicknessRythm:this.#params.rythms.edge
        });
         
        return   covering.thicknessPath();
    } 


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.Geometry.SpiralTrix2DTests = (paramsTestOptions =[
    
    {creation:  { 
     
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [Math.PI]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          radius: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.1], [0.6]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     },   

      update: { 
        radius: 1., 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [Math.PI]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
          radius: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.1], [0.6]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
        }
     }}] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.SpiralTrix2D, paramsTestOptions, exceptions );

}

Ebk.Geometry.DyniPathTrix2D = class EbkGeometryDyniPathTrix2D  {
    #params;
    #process;
    #isCreate;
    #dataError;
   
    constructor(params ={   
                            
                           verticesCount: 18,
                           geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
                           rythms: {
                             abs: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                             ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x;}, messy:[-1,1]},
                             edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                             
                           }
                            
               }){

                this.name = `Ebk.Geometry.DyniPathTrix2D`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};

                this.#params =  Object.assign({},  params );

                this.#assignSubParamsForCreation( );

                this.#isCreate = true;
  
    }
    
    _update(params  ={ 
      
        verticesCount: 18,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
            abs: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
            ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x;}, messy:[-1,1]},
            edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
}
     }){
        
       this.#params = Object.assign(this.#params , Ebk.objectDeepCopy (params));

       this.#assignSubParamsForUpdate( );
    
    }

    #assignSubParamsForCreation( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.abs.granularity = this.#params.verticesCount+1;
        this.#params.rythms.ord.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix = new Ebk.GeoMatrix(this.#params.geomatrix);
        this.#process.rythms = {};
        this.#process.rythms.abs = new  Ebk.Rythm(this.#params.rythms.abs);
        this.#process.rythms.ord = new  Ebk.Rythm(this.#params.rythms.ord);
       // this.#process.rythms.angle.locate({step:0})[0]
               
    }

    #assignSubParamsForUpdate( ){

        this.#params.rythms.edge.granularity = this.#params.verticesCount+1;
        this.#params.rythms.abs.granularity = this.#params.verticesCount+1;
        this.#params.rythms.ord.granularity = this.#params.verticesCount+1;

        this.#process.geoMatrix._update(this.#params.geomatrix);
        this.#process.rythms.abs._update(this.#params.rythms.abs); 
        this.#process.rythms.ord._update(this.#params.rythms.ord); 
    }

    #getVertexPosition(index) {
       let abs = this.#process.rythms.abs.locate({step:index})[0];
       let ord = this.#process.rythms.ord.locate({step:index})[0];

       let location = this.#process.geoMatrix.locate({scalars: [ abs, ord]})

      return  [location[0], location[1]];
    }

    getVerticesPosition() {
        let arr = [];

        for(let ndx = 0; ndx <= this.#params.rythms.abs.granularity; ndx++ ){
            arr.push(  this.#getVertexPosition( ndx ) );
        } 

        return arr;
    } 

    getCoveredPosition() {
    
        let covering = new EbkCov.OpenPath2D({
            positions: this.getVerticesPosition(),
            thicknessRythm:this.#params.rythms.edge
        });
         
        return   covering.thicknessPath();
    } 


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.Geometry.DyniPathTrix2DTests = (paramsTestOptions =[
    
    {creation:  { 
     
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
            abs: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
            ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x;}, messy:[-1,1]},
            edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},        }
     },   

      update: { 
        radius: 1., 
        verticesCount: 8,
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
            abs: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
            ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x;}, messy:[-1,1]},
            edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},        }
     }}] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.DyniPathTrix2D, paramsTestOptions, exceptions );

}


Ebk.Geometry.GridTrix2D = class EbkGeometryGridTrix2D  {
    #params;
    #inputs;
    #process;
    #isCreate;
    #dataError;

    constructor(params ={   
                            
                    width: 10,
                    height: 9, 
                    geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
                    rythms: {
                    edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},   
                    abs:    [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                                {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                            ]   ,

                    ord:  [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                                    {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                            ]  
                                    
                    }
     
                        
               }){

                this.name = `Ebk.Geometry.GridTrix2D`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#inputs = {};

                this.#inputs.rythms = {};

                this.#process = {};
                this.#process.rythms = {};

                this.#params =   Object.assign(this.#params , Ebk.objectDeepCopy (params));
                this.#process.geoMatrix = new Ebk.GeoMatrix(this.#params.geomatrix);

                this.#inputs.width = this.#params.width -2;
                this.#inputs.height = this.#params.height -2;
                this.#inputs.gridLength = this.#inputs.width*this.#inputs.height;

                this.#params.rythms.edge = params.rythms.edge;
                this.#isCreate = true;
  
    }
    
    _update(params  ={ 
      
        width: 10,
        height: 9, 
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},   
          abs:    [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                      {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                  ]   ,

          ord:  [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                           {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                ]  
                           
        }
     
     }){
        
         this.#params = Object.assign(this.#params , Ebk.objectDeepCopy (params));
         this.#process.geoMatrix._update(this.#params.geomatrix);
  
         this.#inputs.width = this.#params.width -2;
         this.#inputs.height = this.#params.height -2;
         this.#inputs.gridLength = this.#inputs.width*this.#inputs.height;
         this.#params.rythms.edge = params.rythms.edge;

    }

    #getCoord(index, rythmAttribut,sizeAttribut ) {

        let randIndex = Ebk.Rand.iRange ( {range:[0, this.#params.rythms[rythmAttribut].length-1], clamp:[0,1]})

        this.#inputs.rythms[rythmAttribut] = this.#params.rythms[rythmAttribut][randIndex];
        this.#inputs.rythms[rythmAttribut].sample = [[0], [1]];
        this.#inputs.rythms[rythmAttribut].granularity = this.#params[sizeAttribut] -2;

        this.#process.rythms[rythmAttribut] = new Ebk.Rythm(this.#inputs.rythms[rythmAttribut]);
        let coord;

        if ((index == 0)||(index == this.#params[sizeAttribut])) {
            coord =  this.#process.rythms[rythmAttribut].locate({step: index})[0];
            
        }   else {

            let bound0 = (this.#process.rythms[rythmAttribut].locate({step: index-1})[0]+ this.#process.rythms[rythmAttribut].locate({step: index})[0])/2;
            let bound1 = (this.#process.rythms[rythmAttribut].locate({step: index})[0]+ this.#process.rythms[rythmAttribut].locate({step: index+1})[0])/2; 
           
            coord =    this.#process.rythms[rythmAttribut].locate({step: index})[0]
        }

        return coord;

     }

     #getRowCol(row, col ) { 
         let result = this.#process.geoMatrix.locate({scalars: [  this.#getCoord(row, `abs`, `width` ) , this.#getCoord(col, `ord`, `height` ) ]}) ;
         return  [result[0], result[1]];
     }

     #getRow(row) { 
        let arr = [];

        for(let ndx = 0; ndx <  this.#inputs.height; ndx++ ){
            arr.push(   this.#getRowCol(row, ndx ) );
        } 

        return arr; //[ this.#getRowCol(row, 0 ), this.#getRowCol(row, 1 ), this.#getRowCol(row, 2 ), this.#getRowCol(row, 3) ];
    }

    #getCol(col) { 
        let arr = [];

        for(let ndx = 0; ndx <= this.#params.width; ndx++ ){
            arr.push(   this.#getRowCol(ndx, col ) );
        } 

        return arr;
    }

    coords(){
         
        let arr = [];
        for(let row = 0; row<this.#params.width; row++ ) {
            for(let col = 0; col <this.#params.height; col ++ ) {

                arr.push([this.#getRowCol(row, col )]);
                //arr.push([this.#getCoord(row, `abs`, `width` ) ,this.#getCoord(col, `ord`, `height` ) ]);
            }
        }
  
        return arr;

    }

    getRows() { 
        
        let arr = [];

        for(let ndx = 0; ndx <=  this.#inputs.height ; ndx++ ){
            arr = arr.concat(this.#getRow(ndx));
        } 

        //return [];
   
        return arr; // this.#getRow(0)
    }

    getCols() { 
        
        let arr = [];

        for(let ndx = 0; ndx <  this.#inputs.height ; ndx++ ){
            arr = arr.concat(this.#getCol(ndx));
        } 

        return [];
    }

    getVerticesPosition() {

        let rows = this.getRows();
        let cols = this.getCols();
        let positions = rows.concat(cols);
     
        return this.getRows();
    } 

    getCoveredPosition() {

        let vertices = this.getRows();
        this.#params.rythms.edge.granularity =   vertices.length ;
        let covering = new EbkCov.OpenPath2D({
            positions: vertices ,
            thicknessRythm:this.#params.rythms.edge
        });
         
        return   covering.thicknessPath();
    } 

    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.Geometry.GridTrix2DTests = (paramsTestOptions =[
    
    {creation:  { 
     
        width: 10,
        height: 9, 
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},   
          abs:    [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                      {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                  ]   ,

          ord:  [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                           {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                ]  
                           
        }
     
     },   

      update: { 

         width: 10,
        height: 9, 
        geomatrix: {origin:[0,0],  matrix: [[0.5, 0 ], [0, 0.3 ]] }, 
        rythms: {
          edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.04]], flow:(x)=>{return 2*x; }, messy:[-1,1]},   
          abs:    [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                      {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                  ]   ,

          ord:  [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                           {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.3, x); }, messy:[-1,1]},
                ]  
                           
        }
     

     }
    
    }] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Geometry.GridTrix2D, paramsTestOptions, exceptions );

}


let EbkGeo = Ebk.Geometry

export {EbkGeo}
export default EbkGeo;