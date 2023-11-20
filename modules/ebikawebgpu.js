 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";

/////// Ebk.WEBGPU

Ebk.WEBGPU = {};
  
Ebk.WEBGPU.name = `Ebk.WEBGPU`;

Ebk.WEBGPU.shaderAddTrianglesString = (params= {triangles: [
         [ [0, 0], [0.5, 0], [0, 0.5]] ,
         [ [0, 0], [0, 0.5], [-0.5, 0]] , 
         [ [0, 0], [-0.5, 0], [0, -0.5]] , 
         [ [0, 0], [0, -0.5], [0.5, 0]] , 

        ]} ) =>{

        let result = `array( `
        
        params.triangles.forEach((triangle,tndx) =>{

           triangle.forEach((coords, cndx) =>{
               if (tndx < params.triangles.length-1)
                   result = result +  `vec2f( ${coords[0]}, ${coords[1]} ), ` 
               else if  (cndx<2)  result = result +  `vec2f( ${coords[0]}, ${coords[1]} ), ` 
               else    result = result +  `vec2f( ${coords[0]}, ${coords[1]} )` 

           }) ;

        });

        result = result + `);`;

        return result;
};

Ebk.WEBGPU.shaderAddColorsString = (params= {colors: [
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] ,
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] , 
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] , 
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] , 

  ]} ) =>{

  let result = `array<vec4f, ${params.colors.length*3}>( `
  
  params.colors.forEach((color,tndx) =>{

     color.forEach((coords, cndx) =>{
         if (tndx < params.colors.length-1)
             result = result +  `vec4f( ${coords[0]}, ${coords[1]}, ${coords[2]} ,${coords[3]} ), ` 
         else if  (cndx<2)  result = result + `vec4f( ${coords[0]}, ${coords[1]}, ${coords[2]} ,${coords[3]} ), ` 
         else    result = result +  `vec4f( ${coords[0]}, ${coords[1]}, ${coords[2]} ,${coords[3]} ) ` 

     }) ;

  });

  result = result + `);`;

  return result;
};

Ebk.WEBGPU.tests = (paramsTestOptions =[
  {triangles: [
   [ [0, 0], [0.5, 0], [0, 0.5]] ,
   [ [0, 0], [0, 0.5], [-0.5, 0]] , 
   [ [0, 0], [-0.5, 0], [0, -0.5]] , 
   [ [0, 0], [0, -0.5], [0.5, 0]] , 

  ],
  colors: [
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] ,
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] , 
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] , 
   [ [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]] , 

  ]

},


])=>{
   Ebk.ObjectName.tests(Ebk.WEBGPU,paramsTestOptions ); 
}


Ebk.WEBGPU.Buffer =  {};

/////// Ebk.WEBGPU.Buffer.Property 
Ebk.WEBGPU.Buffer.Property = class EbkClassModel {
    #params;
    #process;
  
    
    constructor(params ={ name: 'position' ,  size: 4, byteCount: 4 }) {
               
        this.name = `Ebk.Sequence.Creation`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );
  
        this.#params.byteSize = this.#params.size*this.#params.byteCount;

        this.#params.bitCount = 8*this.#params.byteCount*this.#params.size;

     
    }
    
    _update(params = { name: 'position' ,  size: 4, byteCount: 4 }){
        
        this.#params =  Object.assign(this.#params,  params );
  
        this.#params.byteSize = this.#params.size*this.#params.byteCount;

        this.#params.bitCount = 8*this.#params.byteCount*this.#params.size;
        
    }


    getName(){
        return this.getParams().name;
    }   

    getSize(){
        return this.getParams().size;
    }   

    getByteSize(){
        return this.getParams().byteSize;
    }  

    getByteCount(){
        return this.getParams().byteCount;
    }  

    getBitCount(){
        return this.getParams().bitCount;
    }  

    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.WEBGPU.Buffer.PropertyTests = (paramsTestOptions =[
    
    {
        creation:  { name: 'position' ,  size: 4, byteCount: 4 },   

        update: {  name: 'scale' ,  size: 2, byteCount: 4 }
    
    }
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.WEBGPU.Buffer.Property, paramsTestOptions, exceptions );

}

/////// Ebk.WEBGPU.Buffer.Properties 
Ebk.WEBGPU.Buffer.Properties = class EbkClassModel {
    #params;
    #process;
  
    constructor(params ={ properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                       {name: 'scale' ,  size: 2, byteCount: 4},
                                       {name: 'offset' ,  size: 2, byteCount: 4},
                                     ] }) {
               
        this.name = `Ebk.Sequence.Properties`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );

        this.#process.properties = [];
        this.#buildProperties(0);
  
     
    }
    
    _update(params ={ properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                   {name: 'scale' ,  size: 2, byteCount: 4},
                                   {name: 'offset' ,  size: 2, byteCount: 4},
                                ] }) {
                                        
        this.#params =  Object.assign(this.#params,  params );
        this.#buildProperties(1);
  
    }

    #buildProperties(opt){
         
        let offset = 0;
        let cumulativeSize = 0;
        let cumulativeByteSize = 0;

        this.#params.properties.forEach((itm, ndx) =>{

            if  (opt == 0) this.#process.properties.push(new Ebk.WEBGPU.Buffer.Property(itm));
            else if (opt == 1) this.#process.properties[ndx]._update(itm);

            this.#process[ndx].offset = offset;
            this.#process[ndx].bufferSize = this.#process[ndx].getSize();
            this.#process[ndx].name = this.#process[ndx].getName();

            offset += this.#process[ndx].getSize();
            cumulativeSize += this.#process[ndx].getSize();
            cumulativeByteSize += this.#process[ndx].getByteSize();
        });

        this.#params.bufferSize = cumulativeByteSize;
        this.#params.dataLength = cumulativeSize;
  
    }

    getPropertyValueByIndex(params ={index: 0, valueName: 'offset'}){

        return  this.#process([params.index])[params.valueName];
    }

    getPropertyValuesByIndex(params = {index: 0}){
         
        arr = [];

        Object.entries(this.#process[params.index]).forEach(([key, value]) => {
            arr.push({ key: value});
        });

        return  arr 
    }

    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.WEBGPU.Buffer.PropertiesTests = (paramsTestOptions =[
    
    {
        creation:  {  properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                   {name: 'scale' ,  size: 2, byteCount: 4},
                                   {name: 'offset' ,  size: 2, byteCount: 4},
                    ]},   

        update: {   properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                 {name: 'scale' ,  size: 2, byteCount: 4},
                                 {name: 'offset' ,  size: 2, byteCount: 4},
                            ] }
    
    }
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.WEBGPU.Buffer.Properties, paramsTestOptions, exceptions );

}


let EbkWebGPU = Ebk.WEBGPU

export {EbkWebGPU}
export default EbkWebGPU;