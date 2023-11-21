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

Ebk.WEBGPU.Buffer.TYPE = {

    vec2f: {type: `vec2<f32>`, description: `a type with 2 f32s`, size: 2, byteCount: 4, short: `vec2f`}, 
    vec2u: {type: `vec2<u32>`, description: `a type with 2 u32s`, size: 2, byteCount: 4, short: `vec2u`}, 
    vec2i: {type: `vec2<i32>`, description: `a type with 2 i32s`, size: 2, byteCount: 4, short: `vec2i`},  		
    vec2h: {type: `vec2<f16>`, description: `a type with 2 f16s`, size: 2, byteCount: 2, short: `vec2h`},  	
    vec3f: {type: `vec3<f32>`, description: `a type with 3 f32s`, size: 3, byteCount: 4, short: `vec3f`}, 		
    vec3u: {type: `vec3<u32>`, description: `a type with 3 u32s`, size: 3, byteCount: 4, short: `vec3u`},  		
    vec3i: {type: `vec3<i32>`, description: `a type with 3 i32s`, size: 3, byteCount: 4, short: `vec3i`},  	
    vec3h: {type: `vec3<f16>`, description: `a type with 3 f16s`, size: 3, byteCount: 2, short: `vec3h`},  		
    vec4f: {type: `vec4<f32>`, description: `a type with 4 f32s`, size: 4, byteCount: 4, short: `vec4f`},  
    vec4u: {type: `vec4<u32>`, description: `a type with 4 u32s`, size: 4, byteCount: 4, short: `vec4u`}, 
    vec4i: {type: `vec4<i32>`, description: `a type with 4 i32s`, size: 4, byteCount: 4, short: `vec4i`}, 
    vec4h: {type: `vec4<f16>`, description: `a type with 4 f16s`, size: 4, byteCount: 2, short: `vec4h`}, 
    mat2x2f: {type: `mat2x2<f32>`, description: `a matrix of 2 vec2<f32>s`, size: 2*2, byteCount: 4, short: `mat2x2f`}, 
    mat2x2u: {type: `mat2x2<u32>`, description: `a matrix of 2 vec2<u32>s`, size: 2*2, byteCount: 4, short: `mat2x2u`}, 
    mat2x2i: {type: `mat2x2<i32>`, description: `a matrix of 2 vec2<i32>s`, size: 2*2, byteCount: 4, short: `mat2x2i`}, 
    mat2x2h: {type: `mat2x2<f16>`, description: `a matrix of 2 vec2<f16>s`, size: 2*2, byteCount: 2, short: `mat2x2h`}, 
    mat2x3f: {type: `mat2x3<f32>`, description: `a matrix of 2 vec3<f32>s`, size: 2*3, byteCount: 4, short: `mat2x3f`}, 
    mat2x3u: {type: `mat2x3<u32>`, description: `a matrix of 2 vec3<u32>s`, size: 2*3, byteCount: 4, short: `mat2x3u`}, 
    mat2x3i: {type: `mat2x3<i32>`, description: `a matrix of 2 vec3<i32>s`, size: 2*3, byteCount: 4, short: `mat2x3i`}, 
    mat2x3h: {type: `mat2x3<f16>`, description: `a matrix of 2 vec3<f16>s`, size: 2*3, byteCount: 2, short: `mat2x3h`}, 
    mat2x4f: {type: `mat2x4<f32>`, description: `a matrix of 2 vec4<f32>s`, size: 2*4, byteCount: 4, short: `mat2x4f`}, 
    mat2x4u: {type: `mat2x4<u32>`, description: `a matrix of 2 vec4<u32>s`, size: 2*4, byteCount: 4, short: `mat2x4u`}, 
    mat2x4i: {type: `mat2x4<i32>`, description: `a matrix of 2 vec4<i32>s`, size: 2*4, byteCount: 4, short: `mat2x4i`}, 
    mat2x4h: {type: `mat2x4<f16>`, description: `a matrix of 2 vec4<f16>s`, size: 2*4, byteCount: 2, short: `mat2x4h`}, 
    mat3x2f: {type: `mat3x2<f32>`, description: `a matrix of 3 vec2<f32>s`, size: 3*2, byteCount: 4, short: `mat3x2f`}, 
    mat3x2u: {type: `mat3x2<u32>`, description: `a matrix of 3 vec2<u32>s`, size: 3*2, byteCount: 4, short: `mat3x2u`}, 
    mat3x2i: {type: `mat3x2<i32>`, description: `a matrix of 3 vec2<i32>s`, size: 3*2, byteCount: 4, short: `mat3x2i`}, 
    mat3x2h: {type: `mat3x2<f16>`, description: `a matrix of 3 vec2<f16>s`, size: 3*2, byteCount: 2, short: `mat3x2h`}, 
    mat3x3f: {type: `mat3x3<f32>`, description: `a matrix of 3 vec3<f32>s`, size: 3*3, byteCount: 4, short: `mat3x3f`}, 
    mat3x3u: {type: `mat3x3<u32>`, description: `a matrix of 3 vec3<u32>s`, size: 3*3, byteCount: 4, short: `mat3x3u`}, 
    mat3x3i: {type: `mat3x3<i32>`, description: `a matrix of 3 vec3<i32>s`, size: 3*3, byteCount: 4, short: `mat3x3i`},   	
    mat3x3h: {type: `mat3x3<f16>`, description: `a matrix of 3 vec3<f16>s`, size: 3*3, byteCount: 2, short: `mat3x3h`}, 
    mat3x4f: {type: `mat3x4<f32>`, description: `a matrix of 3 vec4<f32>s`, size: 3*4, byteCount: 4, short: `mat3x4f`}, 
    mat3x4u: {type: `mat3x4<u32>`, description: `a matrix of 3 vec4<u32>s`, size: 3*4, byteCount: 4, short: `mat3x4u`}, 
    mat3x4i: {type: `mat3x4<i32>`, description: `a matrix of 3 vec4<i32>s`, size: 3*4, byteCount: 2, short: `mat3x4i`}, 
    mat3x4h: {type: `mat3x4<f16>`, description: `a matrix of 3 vec4<f16>s`, size: 3*4, byteCount: 4, short: `mat3x4h`}, 
    mat4x2f: {type: `mat4x2<f32>`, description: `a matrix of 4 vec2<f32>s`, size: 4*2, byteCount: 4, short: `mat4x2f`}, 
    mat4x2u: {type: `mat4x2<u32>`, description: `a matrix of 4 vec2<u32>s`, size: 4*2, byteCount: 4, short: `mat4x2u`}, 
    mat4x2i: {type: `mat4x2<i32>`, description: `a matrix of 4 vec2<i32>s`, size: 4*2, byteCount: 4, short: `mat4x2i`}, 
    mat4x2h: {type: `mat4x2<f16>`, description: `a matrix of 4 vec2<f16>s`, size: 4*2, byteCount: 2, short: `mat4x2h`}, 
    mat4x3f: {type: `mat4x3<f32>`, description: `a matrix of 4 vec3<f32>s`, size: 4*3, byteCount: 4, short: `mat4x3f`}, 
    mat4x3u: {type: `mat4x3<u32>`, description: `a matrix of 4 vec3<u32>s`, size: 4*3, byteCount: 4, short: `mat4x3u`}, 
    mat4x3i: {type: `mat4x3<i32>`, description: `a matrix of 4 vec3<i32>s`, size: 4*3, byteCount: 4, short: `mat4x3i`}, 
    mat4x3h: {type: `mat4x3<f16>`, description: `a matrix of 4 vec3<f16>s`, size: 4*3, byteCount: 2, short: `mat4x3h`}, 
    mat4x4f: {type: `mat4x4<f32>`, description: `a matrix of 4 vec4<f32>s`, size: 4*4, byteCount: 4, short: `mat4x4f`}, 
    mat4x4u: {type: `mat4x4<u32>`, description: `a matrix of 4 vec4<u32>s`, size: 4*4, byteCount: 4, short: `mat4x4u`}, 
    mat4x4i: {type: `mat4x4<i32>`, description: `a matrix of 4 vec4<i32>s`, size: 4*4, byteCount: 4, short: `mat4x4i`}, 
    mat4x4h: {type: `mat4x4<f16>`, description: `a matrix of 4 vec4<f16>s`, size: 4*4, byteCount: 2, short: `mat4x4h`}, 
     
}
	

/////// Ebk.WEBGPU.Buffer.Property 
Ebk.WEBGPU.Buffer.Property = class WEBGPUBufferProperty  {
    #params;
    #process;
  
    
    constructor(params ={ name: 'position' ,  size: 4, byteCount: 4 }) {
               
        this.name = `Ebk.WEBGPU.Buffer.Property`;            
                    
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
Ebk.WEBGPU.Buffer.Properties = class WEBGPUBufferProperties {
    #params;
    #process;
  
    constructor(params ={ properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                       {name: 'scale' ,  size: 2, byteCount: 4},
                                       {name: 'offset' ,  size: 2, byteCount: 4},
                                     ],
                                  
                    
                                    }) {
               
        this.name = `Ebk.WEBGPU.Buffer.Properties`;            
                    
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

            this.#process.properties[ndx].offset = offset;
            this.#process.properties[ndx].bufferSize =  this.#process.properties[ndx].getSize();
            this.#process.properties[ndx].name =  this.#process.properties[ndx].getName();

            offset += this.#process.properties[ndx].getSize();
            cumulativeSize += this.#process.properties[ndx].getSize();
            cumulativeByteSize += this.#process.properties[ndx].getByteSize();
        });

        this.#params.bufferSize = cumulativeByteSize;
        this.#params.dataLength = cumulativeSize;

        this.#process.stride = this.#params.dataLength;
  
    }

    getPropertyByIndex(params ={index: 0, subPropertyName: 'name'}){

        return    this.#process.properties[params.index][params.subPropertyName];
   
    }

    getPropertiesByIndex(params ={index: 0, subPropertiesName: ['name', 'offset', `bufferSize`]}){

        let arr = [];

        params.subPropertiesName.forEach(itm =>{
             let obj = {};
             obj[itm] = this.getPropertyByIndex({index: params.index, subPropertyName: itm})
            arr.push(obj);
        })

        return arr; 
   
    }

    getAllPropertiesByIndex(params ={subPropertiesName: ['name', 'offset', `bufferSize`]}){

        let arr = [];
        this.#process.properties.forEach((itm,ndx) =>{
            arr.push( this.getPropertiesByIndex({index: ndx, subPropertiesName: params.subPropertiesName}));

        });

        return arr; 
   
    }

    getStride(){
        return this.#process.stride;
    }




    // getPropertyValueByIndex(params ={index: 0, property: 'name'}){

    //    if  (this.#process.properties[params.index].hasOwnProperty(params.property) )
    //     return    this.#process.properties[params.index]
    //    else return undefined;
    // }

    // getPropertyValuesByIndex(params = {index: 0}){
         
    //     let arr = [];

    //     this.#process.properties.forEach((itm, ndx) =>{

    //         Object.entries(itm).forEach(([key, value]) => {

    //             arr.push(this.getPropertyValueByIndex({index: ndx, property: key}));
    //         // let obj = {};
    //         // obj[key] = value;
    //         // arr.push(obj[key]);
    //         });

    //     })


    //     return  arr;
    // }

    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.WEBGPU.Buffer.PropertiesTests = (paramsTestOptions =[
    
    {
        creation:  {  properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                   {name: 'scale' ,  size: 2, byteCount: 4},
                                   {name: 'offset' ,  size: 2, byteCount: 4},
                    ],
                    index:0,
                    subPropertyName: 'name',
                    subPropertiesName: ['name', 'offset', `bufferSize`]
                },   

        update: {   properties:[ {name: 'color' ,  size: 4, byteCount: 4},
                                 {name: 'scale' ,  size: 2, byteCount: 4},
                                 {name: 'offset' ,  size: 2, byteCount: 4},
                            ],
                        index: 1,
                        subPropertyName: 'name',
                        subPropertiesName: ['name', 'offset', `bufferSize`]

                        }
    
    }
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.WEBGPU.Buffer.Properties, paramsTestOptions, exceptions );

}


let EbkWebGPU = Ebk.WEBGPU

export {EbkWebGPU}
export default EbkWebGPU;