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

    f32: {type: `float<f32>`, description: `a type with 1 f32`, size: 1, byteCount: 4, short: `f32`}, 
    i32: {type: `integer<i32>`, description: `a type with 1 u32`, size: 1, byteCount: 4, short: `i32`}, 
    u32: {type: `unsigned<u32>`, description: `a type with 1 u32`, size: 1, byteCount: 4, short: `u32`}, 
    h16: {type: `float<h16>`, description: `a type with 1 h16`, size: 1, byteCount: 2, short: `h16`}, 

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
     
    bufferSize: (type, length =1) =>{
        return Ebk.WEBGPU.Buffer.TYPE[type].size * Ebk.WEBGPU.Buffer.TYPE[type].byteCount * length; 
    }, 

    type: (type) => {
        return Ebk.WEBGPU.Buffer.TYPE[type].type;
    },

    description: (type) => {
        return Ebk.WEBGPU.Buffer.TYPE[type].description;
    }, 

    size: (type) => {
        return Ebk.WEBGPU.Buffer.TYPE[type].size;
    }, 

    byteCount: (type) => {
        return Ebk.WEBGPU.Buffer.TYPE[type].byteCount;
    }, 

    bitCount: (type, length) => {
        return Ebk.WEBGPU.Buffer.TYPE.bufferSize(type, length )*8;
    }, 


}
	
///// Ebk.WEBGPU.Buffer.Property 
Ebk.WEBGPU.Buffer.Property = class WEBGPUBufferProperty  {
    #params;
    #process;
  
    
    constructor(params ={ name: 'position' ,  type: `f32`, data: [7.0]  }) {
               
        this.name = `Ebk.WEBGPU.Buffer.Property`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );
        this.#params.length = this.#params.data.length;

    }
    
    _update(params = { name: 'position' ,  type: `f32`, data: [7.0]}){
        
        this.#params =  Object.assign(this.#params,  params );
        this.#params.length = this.#params.data.length;
    }

    getName(){
        return this.getParams().name;
    }   

    getBufferSize(){
      return Ebk.WEBGPU.Buffer.TYPE.bufferSize(this.#params.type, this.#params.length);
    }

    getTypeDescription(){
        return Ebk.WEBGPU.Buffer.TYPE.description(this.#params.type);
    }

    getSize(){
        return Ebk.WEBGPU.Buffer.TYPE.size(this.#params.type);
    }   

    getByteCount(){
        return  Ebk.WEBGPU.Buffer.TYPE.byteCount(this.#params.type);
    }  

    getBitCount(){
        return  Ebk.WEBGPU.Buffer.TYPE.bitCount(this.#params.type, this.#params.length);
    }  

    getData(){
        return this.getParams().data;
    }   

    getflattenData(){
        return  Ebk.Matrix.arrFlatten({arr: this.getParams().data}) ;
    }   

    getdataLength(){
        return  this.getflattenData().length ;
    }   

    getWGSL_StructProperty(){
          
        

        return  (this.#params.length == 1) ? 
                   (`${this.#params.name}: ${this.#params.type}`) :
                   (`${this.#params.name}: array<${this.#params.type}, ${this.#params.length}>`);
    }   

    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  


Ebk.WEBGPU.Buffer.PropertyTests = (paramsTestOptions =[
    
    {
        creation:  {name: 'position',  type: `f32`, data: [7.0, 0.1, 0.2]  },   

        update: {name: 'position',  type: `f32`, data: [7.0, 0.1, 0.2, 7.0, 0.1, 0.2]  }
    
    } ,

    {
        creation:  {  name: 'positions',  type: `vec2f`, data: [[0.1, 0.2], [0.4, 0.3]] },   

        update: {   name: 'positions',  type: `vec2f`, length: [[0.1, 0.2], [0.4, 0.3]] }
    
    } ,
    
    ] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.WEBGPU.Buffer.Property, paramsTestOptions, exceptions );

}



/////// Ebk.WEBGPU.Buffer.Properties 
Ebk.WEBGPU.Buffer.Properties = class WEBGPUBufferProperties {
    #params;
    #process;
  
    constructor(params ={ properties:[ { color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                       { scale: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                       { offset: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                     ],
                                    structName: `VertexColor`,
                                    shaderLabel: `build triangle`,
                                    device: {},
                                    pipeline: {} }) {
                     
                                
        this.name = `Ebk.WEBGPU.Buffer.Properties`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );

        this.#process.properties = [];

        this.#buildProperties(0);
  
     
    }
    
    _update(params ={ properties:[ { color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                    { scale: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                    { offset: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                 ], 
                                 structName: `VertexColor` ,
                                 shaderLabel: `build triangle`,
                                 device: {},
                                 pipeline: {}
                                 }) {

        this.#params =  Object.assign(this.#params,  params );
         this.#buildProperties(1);
  
    }

    #buildProperties(opt){
         
        let bufferSizeOffset = 0;
        let sizeOffset = 0;
        let dataLength = 0;
     
       
        this.#process.wgsl_structure = `struct ${this.#params.structName} { \n`

        if  (opt == 0) this.#process.properties = {}; 

        this.#params.properties.forEach((itm, ndx) =>{

            let paramsIn = {};
            Object.entries(itm).forEach(key =>{
                paramsIn.name = key[0];
                Object.entries(key[1]).forEach((key1, value1) =>{
                    paramsIn[key1[0]] = key1[1];
                });

                 if  (opt == 0) this.#process.properties[key[0]] = new Ebk.WEBGPU.Buffer.Property(paramsIn);
                 else if (opt == 1) this.#process.properties[key[0]]._update(paramsIn);
                 
                                                                    
                this.#process.properties[key[0]].bufferSizeOffset = bufferSizeOffset;
                this.#process.properties[key[0]].sizeOffset = sizeOffset;
                this.#process.properties[key[0]].name = this.#process.properties[key[0]].getName;
                this.#process.properties[key[0]].bufferSize = this.#process.properties[key[0]].getBufferSize();
                this.#process.properties[key[0]].typeDescription = this.#process.properties[key[0]].getTypeDescription();
                this.#process.properties[key[0]].size = this.#process.properties[key[0]].getSize();
                this.#process.properties[key[0]].byCount = this.#process.properties[key[0]].getByteCount();
                this.#process.properties[key[0]].bitCount = this.#process.properties[key[0]].getBitCount();
                this.#process.properties[key[0]].data = this.#process.properties[key[0]].getData();
                this.#process.properties[key[0]].flattenData = this.#process.properties[key[0]].getflattenData();
                this.#process.properties[key[0]].dataLength = this.#process.properties[key[0]].getdataLength();
                
                this.#process.properties[key[0]].wgsl_structProperty = this.#process.properties[key[0]].getWGSL_StructProperty();

                if (ndx < this.#params.properties.length-1)
                 this.#process.wgsl_structure+= `  ` + this.#process.properties[key[0]].wgsl_structProperty+ `, \n`
                else this.#process.wgsl_structure+= `  ` +  this.#process.properties[key[0]].wgsl_structProperty+ `\n};`

                bufferSizeOffset +=  this.#process.properties[key[0]].getBufferSize();
                sizeOffset +=  this.#process.properties[key[0]].getSize();

                dataLength +=  this.#process.properties[key[0]].getdataLength();
                

            });

        });

        this.#process.bufferSize = bufferSizeOffset;
        this.#process.dataLength = dataLength;

    }

    getPropertyInfo(params ={property: 'color'}){

        return    this.#process.properties;
   
    }

    getPropertyValue(params ={property: 'color', value: `data`}){

        return    this.#process.properties[params.property][params.value];
   
    }

    getPropertyValues(params ={property: 'color' }){

        let arr = {};
            Object.entries(this.#process.properties[params.property]).forEach(key =>{
                arr[key[0]] =  key[1]; 

            });

        return arr;    
    }

    getWGSL_structure( ){

        return    this.#process.wgsl_structure;
   
    }

    getbufferSize(){
       return this.#process.bufferSize;
    }

    getdataLength(){
        return this.#process.dataLength
     }

      
    createBuffer_UniformReadOnly( ){

        if (this.#params.device) {
            this.buffer = this.#params.device.createBuffer({
                label: this.#params.shaderLabel +`, Uniform Buffer`,
                size: this.getbufferSize(),
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
              });
    
       
        } else {
            console.error(`device is not defined`);
            this.buffer = null;
        }

    }

    createData_Float32Array(){

        this.data = new Float32Array(this.getdataLength());
    }

    createBindGroup(params = {pipeline: {}}){

        this.bindGroup =  this.#params.device.createBindGroup({
            layout: params.pipeline.getBindGroupLayout(0),
            entries: [
              { binding: 0, resource: { buffer: this.buffer}},
            ],
          });
    } 

    writeBuffer(){

        this.#params.device.queue.writeBuffer(this.buffer, 0, this.data);

    }


    loadData(params ={exeptions : [`scale`]}){

        Object.entries(this.#process.properties).forEach(key =>{
                if (!params.exeptions.includes(key[0])) 
                 this.data.set(this.getPropertyValue({property: key[0], value: `flattenData`}) , this.getPropertyValue({property: key[0], value: `sizeOffset`}) )
           
        });
    }

    loadSpecData(params ={property:`offset`, data : [0.2, 0.3] }){

        this.#process.properties[params.property].data = [params.data];
        this.#process.properties[params.property].flattenData = params.data;
 
        this.data.set(this.getPropertyValue({property: params.property, value: `flattenData`}) , 
                       this.getPropertyValue({property: params.property, value: `sizeOffset`}) );
    }

    bufferLoadBind(params = {pipeline: {}, exeptions : [`scale`] }){
        
        this.createBuffer_UniformReadOnly();   
        this.createData_Float32Array(); 
        this.loadData({exeptions : params.exeptions}); 
        this.createBindGroup( {pipeline: params.pipeline});
    }

    draw(params = {pass: {}, data : {aspect: 0.2 ,scale: 0.5} }){

        this.loadSpecData({property:`scale`, data :[params.data.scale / params.data.aspect, params.data.scale] });  

        this.writeBuffer();

        params.pass.setBindGroup(0, this.bindGroup);

        params.pass.draw(3); 
    }


    getParams(){

        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.WEBGPU.Buffer.PropertiesTests = (paramsTestOptions =[
    
    {
        creation:  {  properties:[ { color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                        { scale: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                        { offset: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                ], 
                       structName: `VertexColor` ,
                       shaderLabel: `build triangle`,
                       device: {},            
                       property: `color`,
                       value: `data`,
                       exeptions: [`scale`],
                       data: [0.1, 0.2 ]
                   },   

        update:  {  properties:[ { color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                    { scale: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                    { offset: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                ],
            structName: `VertexColor` ,
            shaderLabel: `build triangle`,
            device: {},  
            property: `scale`,
            value: `data`,
            exeptions: [`scale`],
            data: [0.1, 0.2 ]


                }
    
}  ,

{
    creation:  {  properties:[ { color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0], [0.1, 0.2, 0.3, 1.0]]}},
                                    { scale: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                    { offset: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                    { index: { type: `i32`, data: [0, 1, 2, 3, 4 ]}}
                            ], 
                   structName: `VertexColor` ,
                   device: {},              
                   property: `color`,
                   value: `data`,
                   exeptions: [`scale`],
                   data: [0.1, 0.2 ]
               },   

    update:  {  properties:[ { color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                { scale: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                                { offset: { type: `vec2f`, data: [[0.1, 0.2 ]]}},
                            ],
        structName: `VertexColor` ,
        device: {},  
        property: `scale`,
        value: `data`,
        exeptions : [`scale`],
        data: [0.1, 0.2 ]
            }

}


    ] ,    exceptions = [`_update`, `createBuffer_UniformReadOnly` , `createData_Float32Array`, `createBindGroup`, `loadData`, `loadSpecData` ]   
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.WEBGPU.Buffer.Properties, paramsTestOptions, exceptions );

}



let buffers = [
    {statics:[
        {color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
        {offset: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
    ]}, 

    {dynamics: [

        {scale: { type: `vec2f`, data: [[0.1, 0.2 ]]} }

    ]}


]




/////// Ebk.WEBGPU.Buffer.PartsProperties 
Ebk.WEBGPU.Buffer.PartsProperties = class WEBGPUBufferProperties {
    #params;
    #process;
  
    constructor(params ={ parts: [

                        {statics:[
                            {color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                            {offset: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                        ]}, 
                    
                        {dynamics: [
                    
                            {scale: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                    
                        ]}
                    
                    
                    ] ,

                    shaderLabel: `Practice multi uniform`,
                    device: {},

                
                }) {
                     
                                
        this.name = `Ebk.WEBGPU.Buffer.PartsProperties`;            
                    
        this.#process = {};
        
        this.#params =  Object.assign({},  params );

        this.#process.parts = {};

        this.#buildProperties(0);
  
     
    }
    
    _update(params ={ parts: [

                        {statics:[
                            {color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                            {offset: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                        ]}, 
                    
                        {dynamics: [
                    
                            {scale: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                    
                        ]}
                    
                     ] ,
                     shaderLabel: `Practice multi uniform`,
                     device: {},

                    
                    }) {

        this.#params =  Object.assign(this.#params,  params );
        this.#buildProperties(1);
  
    }

    #buildProperties(opt){
         
        
        this.#params.parts.forEach((part, part_ndx) =>{

           Object.entries(part).forEach(bufferProperty =>{
                  if (opt==0)   this.#process.parts[bufferProperty[0]] = {};
                 
                  let bufferSizeOffset = 0;
                  let sizeOffset = 0;
                  let dataLength = 0;

                 let structName = bufferProperty[0].charAt(0).toUpperCase() + bufferProperty[0].slice(1);
                 this.#process.parts[bufferProperty[0]].wgsl_structure = `struct ${structName} { \n `
         
                  bufferProperty[1].forEach((property, property_ndx) =>{

                    
                    Object.entries(property).forEach(propertyKeyValue=>{

                        let  paramsIn = {};

                        paramsIn.name = propertyKeyValue[0];


                        Object.entries(propertyKeyValue[1]).forEach(propertyValues=>{
                            paramsIn[propertyValues[0]] = propertyValues[1];

                        })

                        if (opt==0) {
                            this.#process.parts[bufferProperty[0]][propertyKeyValue[0]]  =  new Ebk.WEBGPU.Buffer.Property(paramsIn);
                        }   
                        else {
                            this.#process.parts[bufferProperty[0]][propertyKeyValue[0]]._update(paramsIn)
                        }

                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].bufferSizeOffset = bufferSizeOffset;
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].sizeOffset = sizeOffset;
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].name = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getName();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].bufferSize = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getBufferSize();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].typeDescription = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getTypeDescription();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].size = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getSize();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].byCount = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getByteCount();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].bitCount = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getBitCount();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].data = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getData();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].flattenData = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getflattenData();
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].dataLength = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getdataLength();
                    
                        this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].wgsl_structProperty = this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getWGSL_StructProperty();


                        if (property_ndx <  (bufferProperty[1].length -1)) {

                            this.#process.parts[bufferProperty[0]].wgsl_structure+= ` ` + this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].wgsl_structProperty+ `, \n`
                      
                        } else this.#process.parts[bufferProperty[0]].wgsl_structure+= ` ` +  this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].wgsl_structProperty+ `};\n`
    
                        bufferSizeOffset +=  this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getBufferSize();
                        sizeOffset +=  this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getSize();
    
                        dataLength +=  this.#process.parts[bufferProperty[0]][propertyKeyValue[0]].getdataLength();
                        console.log(this.#process.parts[bufferProperty[0]])

                      

                    });


                   })

         
   
                   //     }

               })
            

           });

        

        // Object.entries(this.#params.parts).forEach(buffer =>{
        //     if (opt==0) 
        //     this.#process.parts[buffer[0]] = {};


        //     let structName = buffer[0].charAt(0).toUpperCase() + buffer[0].slice(1);
        //     this.#process.parts[buffer[0]].wgsl_structure = `struct ${structName} {`


        //     let bufferSizeOffset = 0;
        //     let sizeOffset = 0;
        //     let dataLength = 0;

        //     Object.entries(buffer[1]).forEach(property => {

        //         let paramsIn = {};  // {name: 'position',  type: `f32`, data: [7.0, 0.1, 0.2]  }
        //         paramsIn.name = property[0];

        //         //console.log(property[1])

        //         let propertiesCount = 0;

        //         Object.entries(property[1]).forEach(propertyValues=>{
        //             paramsIn[propertyValues[0]] = propertyValues[1];
        //         });

        //         if (opt==0)
        //           this.#process.parts[buffer[0]][property[0]] = new Ebk.WEBGPU.Buffer.Property(paramsIn);
        //         else if (opt==1)
        //            this.#process.parts[buffer[0]][property[0]]._update(paramsIn);
              

        //            this.#process.parts[buffer[0]][property[0]].bufferSizeOffset = bufferSizeOffset;
        //            this.#process.parts[buffer[0]][property[0]].sizeOffset = sizeOffset;
        //            this.#process.parts[buffer[0]][property[0]].name = this.#process.parts[buffer[0]][property[0]].getName();
        //            this.#process.parts[buffer[0]][property[0]].bufferSize = this.#process.parts[buffer[0]][property[0]].getBufferSize();
        //            this.#process.parts[buffer[0]][property[0]].typeDescription = this.#process.parts[buffer[0]][property[0]].getTypeDescription();
        //            this.#process.parts[buffer[0]][property[0]].size = this.#process.parts[buffer[0]][property[0]].getSize();
        //            this.#process.parts[buffer[0]][property[0]].byCount = this.#process.parts[buffer[0]][property[0]].getByteCount();
        //            this.#process.parts[buffer[0]][property[0]].bitCount = this.#process.parts[buffer[0]][property[0]].getBitCount();
        //            this.#process.parts[buffer[0]][property[0]].data = this.#process.parts[buffer[0]][property[0]].getData();
        //            this.#process.parts[buffer[0]][property[0]].flattenData = this.#process.parts[buffer[0]][property[0]].getflattenData();
        //            this.#process.parts[buffer[0]][property[0]].dataLength = this.#process.parts[buffer[0]][property[0]].getdataLength();
                    
        //            this.#process.parts[buffer[0]][property[0]].wgsl_structProperty = this.#process.parts[buffer[0]][property[0]].getWGSL_StructProperty();

        //              if (propertiesCount < Object.keys(property).length-1)
        //             this.#process.parts[buffer[0]].wgsl_structure+= `  ` + this.#process.parts[buffer[0]][property[0]].wgsl_structProperty+ `,`
        //               else this.#process.wgsl_structure+= `  ` +  this.#process.parts[buffer[0]][property[0]].wgsl_structProperty+ `};`

        //             bufferSizeOffset +=  this.#process.parts[buffer[0]][property[0]].getBufferSize();
        //             sizeOffset +=  this.#process.parts[buffer[0]][property[0]].getSize();

        //             dataLength +=  this.#process.parts[buffer[0]][property[0]].getdataLength();

        //              propertiesCount++;

        //                 console.log(this.#process.parts)

        //         // Object.entries(property).forEach(key =>{
        //         // paramsIn.name = key[0];
        //         // Object.entries(key[1]).forEach((key1) =>{
        //         //     paramsIn[key1[0]] = key1[1];
        //         // });


        //         // if (opt==0)
        //         //  this.#process.parts[buffer[0]][property[0]] = new Ebk.WEBGPU.Buffer.Property(paramsIn);
        //         // else if (opt==1)
        //         //   this.#process.parts[buffer[0]][property[0]]._update(paramsIn);

        //     });

        // });
        // let bufferSizeOffset = 0;
        // let sizeOffset = 0;
        // let dataLength = 0;
     
       
        // this.#process.wgsl_structure = `struct ${part.structName} { \n`

        // if  (opt == 0) this.#process.parts = []; 

        // part.properties.forEach((itm, ndx) =>{

        //     let paramsIn = {};
        //     Object.entries(itm).forEach(key =>{
        //         paramsIn.name = key[0];
        //         Object.entries(key[1]).forEach((key1, value1) =>{
        //             paramsIn[key1[0]] = key1[1];
        //         });

        //          if  (opt == 0) this.#process.parts[key[0]] = new Ebk.WEBGPU.Buffer.Property(paramsIn);
        //          else if (opt == 1) this.#process.properties[key[0]]._update(paramsIn);
                 
                                                                    
        //         this.#process.properties[key[0]].bufferSizeOffset = bufferSizeOffset;
        //         this.#process.properties[key[0]].sizeOffset = sizeOffset;
        //         this.#process.properties[key[0]].name = this.#process.properties[key[0]].getName;
        //         this.#process.properties[key[0]].bufferSize = this.#process.properties[key[0]].getBufferSize();
        //         this.#process.properties[key[0]].typeDescription = this.#process.properties[key[0]].getTypeDescription();
        //         this.#process.properties[key[0]].size = this.#process.properties[key[0]].getSize();
        //         this.#process.properties[key[0]].byCount = this.#process.properties[key[0]].getByteCount();
        //         this.#process.properties[key[0]].bitCount = this.#process.properties[key[0]].getBitCount();
        //         this.#process.properties[key[0]].data = this.#process.properties[key[0]].getData();
        //         this.#process.properties[key[0]].flattenData = this.#process.properties[key[0]].getflattenData();
        //         this.#process.properties[key[0]].dataLength = this.#process.properties[key[0]].getdataLength();
                
        //         this.#process.properties[key[0]].wgsl_structProperty = this.#process.properties[key[0]].getWGSL_StructProperty();

        //         if (ndx < this.#params.properties.length-1)
        //          this.#process.wgsl_structure+= `  ` + this.#process.properties[key[0]].wgsl_structProperty+ `, \n`
        //         else this.#process.wgsl_structure+= `  ` +  this.#process.properties[key[0]].wgsl_structProperty+ `\n};`

        //         bufferSizeOffset +=  this.#process.properties[key[0]].getBufferSize();
        //         sizeOffset +=  this.#process.properties[key[0]].getSize();

        //         dataLength +=  this.#process.properties[key[0]].getdataLength();
                

        //     });

        // });

        // this.#process.bufferSize = bufferSizeOffset;
        // this.#process.dataLength = dataLength;

    }

    getPropertyInfo(params ={property: 'color'}){

       // this.#buildProperties(0);
        //return   /// this.#process.properties;
   
    }

    // getPropertyValue(params ={property: 'color', value: `data`}){

    //     return    this.#process.properties[params.property][params.value];
   
    // }

    // getPropertyValues(params ={property: 'color' }){

    //     let arr = {};
    //         Object.entries(this.#process.properties[params.property]).forEach(key =>{
    //             arr[key[0]] =  key[1]; 

    //         });

    //     return arr;    
    // }

    // getWGSL_structure( ){

    //     return    this.#process.wgsl_structure;
   
    // }

    // getbufferSize(){
    //    return this.#process.bufferSize;
    // }

    // getdataLength(){
    //     return this.#process.dataLength
    //  }

      
    // createBuffer_UniformReadOnly( ){

    //     if (this.#params.device) {
    //         this.buffer = this.#params.device.createBuffer({
    //             label: this.#params.shaderLabel +`, Uniform Buffer`,
    //             size: this.getbufferSize(),
    //             usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    //           });
    
       
    //     } else {
    //         console.error(`device is not defined`);
    //         this.buffer = null;
    //     }

    // }

    // createData_Float32Array(){

    //     this.data = new Float32Array(this.getdataLength());
    // }

    // createBindGroup(params = {pipeline: {}}){

    //     this.bindGroup =  this.#params.device.createBindGroup({
    //         layout: params.pipeline.getBindGroupLayout(0),
    //         entries: [
    //           { binding: 0, resource: { buffer: this.buffer}},
    //         ],
    //       });
    // } 

    // writeBuffer(){

    //     this.#params.device.queue.writeBuffer(this.buffer, 0, this.data);

    // }


    // loadData(params ={exeptions : [`scale`]}){

    //     Object.entries(this.#process.properties).forEach(key =>{
    //             if (!params.exeptions.includes(key[0])) 
    //              this.data.set(this.getPropertyValue({property: key[0], value: `flattenData`}) , this.getPropertyValue({property: key[0], value: `sizeOffset`}) )
           
    //     });
    // }

    // loadSpecData(params ={property:`offset`, data : [0.2, 0.3] }){

    //     this.#process.properties[params.property].data = [params.data];
    //     this.#process.properties[params.property].flattenData = params.data;
 
    //     this.data.set(this.getPropertyValue({property: params.property, value: `flattenData`}) , 
    //                    this.getPropertyValue({property: params.property, value: `sizeOffset`}) );
    // }


    getParams(){

        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }

}  

Ebk.WEBGPU.Buffer.PartsPropertiesTests = (paramsTestOptions =[
    
    {
        creation:  { parts: [

                            {statics:[
                                {color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                {offset: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                            ]}, 
                        
                            {dynamics: [
                        
                                {scale: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                        
                            ]}
                        
                     ] , 

                    shaderLabel: `build triangle`,
                    device: {},            
                    property: `color`,
                    value: `data`,
                    exeptions: [`scale`],
                    data: [0.1, 0.2 ]

            
            },   

        update:  {  parts: [

                            {statics:[
                                {color: { type: `vec4f`, data: [[0.1, 0.2, 0.3, 1.0]]}},
                                {offset: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                            ]}, 
                        
                            {dynamics: [
                        
                                {scale: { type: `vec2f`, data: [[0.1, 0.2 ]]} }
                        
                            ]}
                        
                    ] , 

                        shaderLabel: `build triangle`,
                        device: {},            
                        property: `color`,
                        value: `data`,
                        exeptions: [`scale`],
                        data: [0.1, 0.2 ]

                
                }
    
}  




    ] ,    exceptions = [`_update`, `createBuffer_UniformReadOnly` , `createData_Float32Array`, `createBindGroup`, `loadData`, `loadSpecData` ]   
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.WEBGPU.Buffer.PartsProperties, paramsTestOptions, exceptions );

}


let EbkWebGPU = Ebk.WEBGPU

export {EbkWebGPU}
export default EbkWebGPU;