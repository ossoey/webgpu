 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
import { Ebk} from "./ebika.js";
import { EbkCov} from "./ebikacovering.js";
import { EbkGeo} from "./ebikageometry.js";
import { EbkWebGPU} from "./ebikawebgpu.js";
import { EbkMIDI} from "./ebikaMIDI.js";

let  hexToRgba = (hexColor)=> {
  const hex = hexColor.substring(1); // Remove the leading '#'
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return {r,g,b}; 
}

let  hexToRgbaNormal = ( hexColor )=> {
  let {r,g,b} = hexToRgba( hexColor);
  r = (r/255).toFixed(2);
  g = (g/255).toFixed(2);
  b = (b/255).toFixed(2);
  return {r,g,b};
}





let  rgbToHex = (red, green, blue) => {
  // Ensure that the input values are within the valid range (0 to 255)
  red = Math.min(255, Math.max(0, red));
  green = Math.min(255, Math.max(0, green));
  blue = Math.min(255, Math.max(0, blue));

  // Convert each component to hexadecimal and concatenate
  const hexRed = red.toString(16).padStart(2, '0');
  const hexGreen = green.toString(16).padStart(2, '0');
  const hexBlue = blue.toString(16).padStart(2, '0');

  // Combine the components to form the hexadecimal color code
  const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

  return hexColor.toUpperCase(); // Convert to uppercase for consistency
}



let projects = {};
    projects.funcs = {};
    projects.ui = {};
    projects.ui.elts = {};
    projects.gpu = {};
  
  
  projects.gpu.VERTEX_FORMAT = {

    "uint8x2":{ format:"uint8x2"  , type:"unsigned int" ,components:	2, bytesize:	2, wgsltype:"vec2<u32>"},
    "uint8x4":{format:"uint8x4"  ,  type:"unsigned int" ,components:	4, bytesize:	4	, wgsltype:"vec4<u32>"},
    "sint8x2":{format:"sint8x2"  ,  type:"signed int" ,components:	2, bytesize:	2	, wgsltype:"vec2<i32>"},
    "sint8x4":{format:"sint8x4"  ,  type:"signed int" ,components:	4, bytesize:	4	, wgsltype:"vec4<i32>"},
    "unorm8x2":{format:"unorm8x2"  ,  type:"unsigned normalized" ,components:	2, bytesize:	2	, wgsltype:"vec2<f32>"},
    "unorm8x4":{format:"unorm8x4"  ,  type:"unsigned normalized" ,components:	4, bytesize:	4	, wgsltype:"vec4<f32>"},
    "snorm8x2":{format:"snorm8x2"  ,  type:"signed normalized" ,components:	2, bytesize:	2	, wgsltype:"vec2<f32>"},
    "snorm8x4":{format:"snorm8x4"  ,  type:"signed normalized" ,components:	4, bytesize:	4	, wgsltype:"vec4<f32>"},
    "uint16x2":{format:"uint16x2"  ,  type:"unsigned int" ,components:	2, bytesize:	4	, wgsltype:"vec2<u32>"},
    "uint16x4":{format:"uint16x4"  ,  type:"unsigned int" ,components:	4, bytesize:	8	, wgsltype:"vec4<u32>"},
    "sint16x2":{format:"sint16x2"  ,  type:"signed int" ,components:	2, bytesize:	4	, wgsltype:"vec2<i32>"},
    "sint16x4":{format:"sint16x4"  ,  type:"signed int" ,components:	4	, bytesize:8	, wgsltype:"vec4<i32>"},
    "unorm16x2":{format:"unorm16x2"  , type:"unsigned normalized" ,components:	2, bytesize:	4	, wgsltype:"vec2<f32>"},
    "unorm16x4":{format:"unorm16x4"  ,  type:"unsigned normalized" ,components:	4, bytesize:	8	, wgsltype:"vec4<f32>"},
    "snorm16x2":{format:"snorm16x2"  ,  type:"signed normalized" ,components:	2, bytesize:	4	, wgsltype:"vec2<f32>"},
    "snorm16x4":{format:"snorm16x4"  ,  type:"signed normalized" ,components:	4, bytesize:	8	, wgsltype:"vec4<f32>"},
    "float16x2":{format:"float16x2"  ,  type:"float" ,components:	2, bytesize:	4	, wgsltype:"vec2<f16>"},
    "float16x4":{format:"float16x4"  ,  type:"float" ,components:	4, bytesize:	8	, wgsltype:"vec4<f16>"},
    "float32":{format:"float32"  , 	 type:"float" ,components:	1, bytesize:	4	, wgsltype:"f32"},
    "float32x2":{format:"float32x2"  , type:"float" ,components:	2, bytesize:	8	, wgsltype:"vec2<f32>"},
    "float32x3":{format:"float32x3"  ,  type:"float" ,components:	3, bytesize:	12	, wgsltype:"vec3<f32>"},
    "float32x4":{format:"float32x4"  ,  	type:"float" ,components:	4, bytesize:	16	, wgsltype:"vec4<f32>"},
    "uint32":{format:"uint32"  ,  	type:"unsigned int" ,components:	1, bytesize:	4	, wgsltype:"u32"},
    "uint32x2":{format:"uint32x2"  , type:"unsigned int" ,components:	2, bytesize:	8	, wgsltype:"vec2<u32>"},
    "uint32x3":{format:"uint32x3"  ,  type:"unsigned int" ,components:	3, bytesize:	12	, wgsltype:"vec3<u32>"},
    "uint32x4":{format:"uint32x4"  ,  type:"unsigned int" ,components:	4, bytesize:	16	, wgsltype:"vec4<u32>"},
    "sint32":{format:"sint32"  ,  type:"signed int" ,components:	1, bytesize:	4	, wgsltype:"i32"},
    "sint32x2":{format:"sint32x2"  , type:"signed int" ,components:	2, bytesize:	8	, wgsltype:"vec2<i32>"},
    "sint32x3":{format:"sint32x3"  ,  type:"signed int" ,components:	3, bytesize:	12	, wgsltype:"vec3<i32>"},
    "sint32x4":{format:"sint32x4"  ,  type:"signed int" ,components:	4, bytesize:	16	, wgsltype:"vec4<i32>"},
    "unorm10-10-10-2":{format:"unorm10-10-10-2"  , type:"unsigned normalized" ,components:	4, bytesize:	4	, wgsltype:"vec4<f32>"}

  }  


  projects.gpu.vertexFormatValue = (format,attr) => {
  
    return projects.gpu.VERTEX_FORMAT[format][attr];

  }




  projects.funcs.createAndAppendElement = (params={container: {}, properties: {}, elementType: "div"  }    ) => {
  // Parameter checks
  // if (!params || !params.container || !params.properties || typeof params.properties !== 'object' || typeof params.elementType !== 'string') {
  //   console.error('Invalid parameters. Expected an object with container and properties.');
  //   return null;
  // }   

  //= {container:{}, properties: {},  }
  // Create a new element based on the specified type
  let newElement = document.createElement(params.elementType);

  // Set properties for the new element
  for (var key in params.properties) {
    if (params.properties.hasOwnProperty(key)) {
      newElement[key] = params.properties[key];


      if (params.properties.style) {
        let styleString = Object.entries(params.properties.style)
          .map(([key1, value1]) => `${key1}: ${value1}`)
          .join(';');
          newElement.setAttribute('style', styleString);
      } 

    }
  }

  // Append the new element to the specified container
  params.container.appendChild(newElement);

  // Return the created element
  return newElement;
};



// Function to create a labeled <input> element with a container and properties
projects.funcs.createElement_LabeledInput = (params= {
 
  container: {},
  // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
  labelProperties: { style: { color: 'blue' }, text: 'Select Label' },
  inputProperties: { id: 'mySelect', style: { width: '150px' } }
}) =>{


  // Create a container div with specified properties
  // let containerDiv = createAndAppendElement({container: params.container, properties : params.divProperties, elementType: "div" });

  // Create a <label> element with specified properties
  let labelElement= projects.funcs.createAndAppendElement({container:  params.container, properties : params.labelProperties, elementType: 'label'});
  labelElement.textContent = params.labelProperties.text || '';

  // Create a <select> element with specified properties

  let inputElement= projects.funcs.createAndAppendElement({container: labelElement, properties : params.inputProperties, elementType: 'input'});


  // Return the created container div
  return {inputElement, labelElement};
}



// Function to create a labeled <select> element with a container and properties
projects.funcs.createElement_LabeledSelect = (params= {
 
  options: [
    { value: 'option1', textContent: 'Option 1' },
    { value: 'option2', textContent: 'Option 2' },
    { value: 'option3', textContent: 'Option 3' },
    { value: 'option4', textContent: 'Option 4' }
  ],
  container: {},
  // divProperties: { id: 'myContainer', style: { border: '1px solid #ccc', padding: '10px' } },
  labelProperties: { style: { color: 'blue' }, text: 'Select Label' },
  selectProperties: { id: 'mySelect', style: { width: '150px' } }
}) =>{


  // Create a container div with specified properties
  // let containerDiv = createAndAppendElement({container: params.container, properties : params.divProperties, elementType: "div" });

  // Create a <label> element with specified properties
  let labelElement= projects.funcs.createAndAppendElement({container:  params.container, properties : params.labelProperties, elementType: 'label'});
  labelElement.textContent = params.labelProperties.text || '';

  // Create a <select> element with specified properties

  let selectElement= projects.funcs.createAndAppendElement({container: labelElement, properties : params.selectProperties, elementType: 'select'});

  // Append the <select> element to the <label>
  // labelElement.appendChild(selectElement);

  // Iterate over the options and create <option> elements
  params.options.forEach(function (option) {
    projects.funcs.createAndAppendElement({container: selectElement, properties : option, elementType: 'option'});
  });

  // Return the created container div
  return {selectElement, labelElement};
}



projects.funcs.reloadCanvas = () =>{
  document.querySelector(`canvas`).remove();
  document.querySelector(`body`).append( document.createElement(`canvas`));
}

projects.funcs.createUIInputsContainer = () =>{

  let uiInputsContainer = document.createElement(`div`);

  uiInputsContainer.setAttribute(`id`,`uiInputsContainer`);
  uiInputsContainer.style.display = "flex";
  uiInputsContainer.style.flexDirection ="row";
  uiInputsContainer.style.flexWrap = "nowrap";
  uiInputsContainer.style.justifyContent = "flex-start";
  uiInputsContainer.style.alignItems = "center";
  
  document.querySelector(`#menu`).appendChild(uiInputsContainer);
}


projects.funcs.removeUIInputsContainer = () =>{

 let elt = document.querySelector(`#uiInputsContainer`);
 if (elt) elt.remove();
 
}



///**Old  */

let reloadCanvas = () =>{
    document.querySelector(`canvas`).remove();
    document.querySelector(`body`).append( document.createElement(`canvas`));
}

let createUIInputsContainer = () =>{

  let uiInputsContainer = document.createElement(`div`);
  
    uiInputsContainer.setAttribute(`id`,`uiInputsContainer`);
    uiInputsContainer.style.display = "flex";
    uiInputsContainer.style.flexDirection ="row";
    uiInputsContainer.style.flexWrap = "nowrap";
    uiInputsContainer.style.justifyContent = "flex-start";
    uiInputsContainer.style.alignItems = "center";
    
    document.querySelector(`#menu`).appendChild(uiInputsContainer);
}



let removeUIInputsContainer = () =>{

   let elt = document.querySelector(`#uiInputsContainer`);
   if (elt) elt.remove();
   
}

///*End Old  */


projects.funcs.createUIFunctionList = () =>{


  let selectContainer = document.createElement(`div`);


  projects.funcs.createUIInputsContainer();

   let projectOptions =[];

     projects.entries.forEach((elt,index)=>{


      projectOptions.push({  functionId: index,  textContent: elt.entry().desc }) 


  });


  projects.ui.elts.list =  projects.funcs.createElement_LabeledSelect (  {
 
    options: projectOptions,
      container: document.querySelector(`#menu`),
     
      labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Projects    ' },
      selectProperties: { id: 'projectList', style: { width: '300px', padding: '3px' } }
  });
  

  projects.ui.elts.list.selectElement.addEventListener(`change`,(event)=>{
      projects.funcs.removeUIInputsContainer();
      let select = event.target.options[event.target.selectedIndex];
      projects.entries[select.functionId].entry().func();           
      
  });

  projects.funcs.removeUIInputsContainer(); 
  projects.entries[0].entry().func();

}


 projects.entries = [


  {
       
    entry : ()=>{
         
        let ops = {};
        ops.desc = `--Colored Triangle and background with picker-MIDI 1`
        
        ops.ui = {};
       
        ops.data = {};

        ops.data.shaderSource = `

          @group(0) @binding(0) var<uniform> color: vec3f; 

          @vertex fn vs(@location(0) coords: vec2f)->@builtin(position) vec4f {
            return vec4f(coords[0], coords[1], 0.0, 1.0);
          }

          @fragment fn fs()->@location(0) vec4f {
            return vec4f(color[0], color[1], color[2], 1.0);
          }

        `;
        
        ops.data.triCoords  = new Float32Array([
          -0.8, -0.6,  0.8, -0.6, 0.0, 0.6
        ]);


        ops.data.colors  = [
          new Float32Array([1.0, 0.0, 0.0]), 
          new Float32Array([0.0, 1.0, 0.0]), 
          new Float32Array([0.0, 0.0, 1.0]), 
          new Float32Array([0.1, 0.1, 0.1]), 
        ];

        ops.data.bgColors  = [
           [0.7, 0.0, 0.0], 
           [0.0, 0.7, 0.0], 
           [0.0, 0.0, 0.7], 
           [0.3, 0.3, 0.3], 
        ];

        ops.data.device; 
        ops.data.context;
        ops.data.shaderModule;
        ops.data.vertexFormat = "float32x2";
        ops.data.pipeline; 
        ops.data.vertexBuffer; 
        ops.data.uniformBuffer; 
        ops.data.uniformBindGroup; 


        ops.funcs = {};  
        
        
        ops.funcs.load = ()=>{

            projects.funcs.createUIInputsContainer(); 

            projects.funcs.reloadCanvas();   

            let  container = document.querySelector(`#uiInputsContainer`);  

            ops.ui.dyniColor =  projects.funcs.createElement_LabeledInput( 
              {   
               container: container,   
              labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Triangle dyni color    ' },
               inputProperties: { type:"color",  style: { width: '50px' } }
            }).inputElement;

            ops.ui.dyniBgColor =  projects.funcs.createElement_LabeledInput( 
              {   
               container: container,   
              labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Dyni backgroup color    ' },
               inputProperties: { type:"color",  style: { width: '50px' } }
            }).inputElement;

            ops.ui.colors = projects.funcs.createElement_LabeledSelect (  {
  
              options: [
                { value: '0', textContent: 'Red' },
                { value: '1', textContent: 'Green' },
                { value: '2', textContent: 'Blue' },
                { value: '3', textContent: 'Grey' }
              ],
                container: container ,
              
                labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' , display: "none" }, text: 'Triangle color '  },
                selectProperties: { id: 'colorsList', style: { width: '100px' , display: "none" } }
            }).selectElement;

            ops.ui.bgColors = projects.funcs.createElement_LabeledSelect (  {
  
              options: [
                { value: '0', textContent: 'Red' },
                { value: '1', textContent: 'Green' },
                { value: '2', textContent: 'Blue' },
                { value: '3', textContent: 'Grey' }
              ],
                container: container ,
              
                labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' , display: "none" }, text: 'BackGroundColor   ' },
                selectProperties: { id: 'bgColorsList', style: { width: '100px' , display: "none" } }
            }).selectElement;

        }


         ops.funcs.modulateDyniColor =(status, data1,data2)=>{


          ops.ui.dyniColorComps =  hexToRgba(ops.ui.dyniColor.value); 
                  
    
          Ebk.MIDI.ctrlAKAILPD8_PROG1_K1 ( {  
  
               flow: {chanel: status, key: data1, value: data2} , 
               operation: {function: (params) =>{ 
  
                
                 ops.ui.dyniColorComps.r = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                 ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
                
          }} });
  
          Ebk.MIDI.ctrlAKAILPD8_PROG1_K2 ( {  
  
           flow: {chanel: status, key: data1, value: data2} , 
           operation: {function: (params) =>{ 
  
             ops.ui.dyniColorComps.g = Ebk.MIDI.keyValueToRGBvalue(data2);
             ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
         
         }} });
  
         Ebk.MIDI.ctrlAKAILPD8_PROG1_K3 ( {  
  
           flow: {chanel: status, key: data1, value: data2} , 
           operation: {function: (params) =>{ 
             ops.ui.dyniColorComps.b = Ebk.MIDI.keyValueToRGBvalue(data2);
             ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
         
         }} });
  
  
         }
       
  
         ops.funcs.modulateDyniBgColor =(status, data1,data2)=>{
  
  
          ops.ui.dyniBgColorComps =  hexToRgba(ops.ui.dyniBgColor.value); 
                  
    
            Ebk.MIDI.ctrlAKAILPD8_PROG1_K5 ( {  
  
                flow: {chanel: status, key: data1, value: data2} , 
                operation: {function: (params) =>{ 
  
                  
                  ops.ui.dyniBgColorComps.r = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                  ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                  
            }} });
  
            Ebk.MIDI.ctrlAKAILPD8_PROG1_K6 ( {  
  
              flow: {chanel: status, key: data1, value: data2} , 
              operation: {function: (params) =>{ 
  
                
                ops.ui.dyniBgColorComps.g = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                
          }} });
  
  
          Ebk.MIDI.ctrlAKAILPD8_PROG1_K7 ( {  
  
              flow: {chanel: status, key: data1, value: data2} , 
              operation: {function: (params) =>{ 
  
                
                ops.ui.dyniBgColorComps.b = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                
            }} });
  
  
  
         }
       


         ops.funcs.modulateDyniColor_hit =(status, data1,data2)=>{


          ops.ui.dyniColorComps =  hexToRgba(ops.ui.dyniColor.value); 
                  
    
          Ebk.MIDI.ctrlAKAILPD8_CC_PAD5 ( {  
  
               flow: {chanel: status, key: data1, value: data2} , 
               operation: {function: (params) =>{ 
  
                
                 ops.ui.dyniColorComps.r = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                 ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
                
          }} });
  
          Ebk.MIDI.ctrlAKAILPD8_CC_PAD6 ( {  
  
           flow: {chanel: status, key: data1, value: data2} , 
           operation: {function: (params) =>{ 
  
             ops.ui.dyniColorComps.g = Ebk.MIDI.keyValueToRGBvalue(data2);
             ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
         
         }} });
  
         Ebk.MIDI.ctrlAKAILPD8_CC_PAD7 ( {  
  
           flow: {chanel: status, key: data1, value: data2} , 
           operation: {function: (params) =>{ 
             ops.ui.dyniColorComps.b = Ebk.MIDI.keyValueToRGBvalue(data2);
             ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
         
         }} });
  
  
         }
       

         ops.funcs.modulateDyniBgColor_hit =(status, data1,data2)=>{
  
  
          ops.ui.dyniBgColorComps =  hexToRgba(ops.ui.dyniBgColor.value); 
                  
    
            Ebk.MIDI.ctrlAKAILPD8_CC_PAD1 ( {  
  
                flow: {chanel: status, key: data1, value: data2} , 
                operation: {function: (params) =>{ 
  
                  
                  ops.ui.dyniBgColorComps.r = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                  ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                  
            }} });
  
            Ebk.MIDI.ctrlAKAILPD8_CC_PAD2 ( {  
  
              flow: {chanel: status, key: data1, value: data2} , 
              operation: {function: (params) =>{ 
  
                
                ops.ui.dyniBgColorComps.g = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                
          }} });
  
  
          Ebk.MIDI.ctrlAKAILPD8_CC_PAD3 ( {  
  
              flow: {chanel: status, key: data1, value: data2} , 
              operation: {function: (params) =>{ 
  
                
                ops.ui.dyniBgColorComps.b = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                
            }} });
  
  
  
         }
        


        ops.funcs.iniWEBGPU = async ()=>{

            if(!navigator.gpu){
              throw new error("This navigator does not support webgpu"); 
            }

            let adapter = await navigator.gpu.requestAdapter(); 

            if(!adapter) {
              throw new error("The navigator support webgpu but there is no adapter found");
            }

            ops.data.device = await adapter.requestDevice(); 

            ops.data.context = document.querySelector("canvas").getContext("webgpu"); 

            ops.data.context.configure({
               device: ops.data.device, 
               format: navigator.gpu.getPreferredCanvasFormat(), 
               alphaMode: "premultiplied"

            });

            ops.data.shaderModule = ops.data.device.createShaderModule({
              label: `Shader module ${ops.desc}`, 
              code: ops.data.shaderSource, 
            });

        }
        

        ops.funcs.doPipelineConfig = ()=>{

          let vertexBufferLayout = [
              {
                attributes: [{shaderLocation: 0, offset: 0, format: ops.data.vertexFormat }], 
                stepMode: "vertex", 
                arrayStride: projects.gpu.vertexFormatValue( ops.data.vertexFormat ,"bytesize") 
              }

          ];



          let uniformBindGroupLayout = ops.data.device.createBindGroupLayout({
            label: `uniformBindGoupLayout,   ${ops.desc}`,
            entries : [
               {
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT, 
                buffer: {type: "uniform"}
               }
            ]
          });

          let pipelineDescriptor = {
            
            label: `pipeline,   ${ops.desc}`,

            layout: ops.data.device.createPipelineLayout({
              bindGroupLayouts: [uniformBindGroupLayout]
            }), 

            vertex: {
              module : ops.data.shaderModule, 
              entryPoint: "vs", 
              buffers: vertexBufferLayout
            } , 

            fragment: {
              module: ops.data.shaderModule, 
              entryPoint: "fs", 
              targets: [{
                format: navigator.gpu.getPreferredCanvasFormat()
              }]
            } , 

            primitive: {
              topology: "triangle-list"
            }

          }


          ops.data.pipeline = ops.data.device.createRenderPipeline(pipelineDescriptor);

          ops.data.vertexBuffer = ops.data.device.createBuffer({
              label: `vertexBuffer,   ${ops.desc}`,
              size: ops.data.triCoords.byteLength, 
              usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
          }); 

          ops.data.device.queue.writeBuffer(ops.data.vertexBuffer, 0, ops.data.triCoords);

          ops.data.uniformBuffer = ops.data.device.createBuffer({
              label: `uniformBuffer,   ${ops.desc}`,
              size: ops.data.colors[0].byteLength, 
              usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
          }); 

          ops.data.device.queue.writeBuffer(ops.data.uniformBuffer, 0, ops.data.colors[0]);
 
          
          ops.data.uniformBindGroup  =  ops.data.device.createBindGroup({
            label: `uniformBindGroup,   ${ops.desc}`,
            layout: uniformBindGroupLayout,
            
            entries : [
              {
               binding: 0, 
               resource: {buffer: ops.data.uniformBuffer, offset: 0, size: 3*4} 
              }
           ]

          }); 

              
        }  


        ops.funcs.dyniColorOnChange = ()=> {

          let colorComp =   hexToRgba(ops.ui.dyniColor.value);
          let colorArr = new Float32Array([colorComp.r/255, colorComp.g/255, colorComp.b/255]);
          ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  colorArr);
          ops.funcs.draw()
       }


       ops.funcs.dyniColorWriteNDraw = (uiDyniColor, uiDyniColorComps)=> {
         uiDyniColor.value = rgbToHex(uiDyniColorComps.r, uiDyniColorComps.g, uiDyniColorComps.b) 
                        
        let colorArr = new Float32Array([uiDyniColorComps.r/255, uiDyniColorComps.g/255, uiDyniColorComps.b/255]);
        ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  colorArr);
        ops.funcs.draw()

        }

        ops.funcs.dyniBgColorWriteNDraw = (uiBgDyniColor, uiDyniBgColorComps)=> {
          uiBgDyniColor.value = rgbToHex(uiDyniBgColorComps.r, uiDyniBgColorComps.g, uiDyniBgColorComps.b) 
                         
           ops.funcs.draw()
 
         }



        ops.funcs.doColorChange = ()=> {
          let colorNum = Number(ops.ui.colors.value);
          ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  ops.data.colors[colorNum]);
          ops.funcs.draw()
       }


        ops.funcs.draw = ()=>{

          let bgColorComp =   hexToRgba(ops.ui.dyniBgColor.value);
 
          let commandEncoder = ops.data.device.createCommandEncoder();

          let renderPassDescriptor = {
             colorAttachments: [{

                 clearValue: { r: bgColorComp.r/255, g: bgColorComp.g/255, b: bgColorComp.b/255, a: 1 },

                 loadOp: "clear", 
                 storeOp: "store",  
                 view: ops.data.context.getCurrentTexture().createView() 

             }]
          };
          let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
   
          passEncoder.setPipeline(ops.data.pipeline);  
          passEncoder.setVertexBuffer(0,ops.data.vertexBuffer);

          passEncoder.setBindGroup(0,ops.data.uniformBindGroup);

          passEncoder.draw(3);
          passEncoder.end();
          let commandBuffer = commandEncoder.finish(); 
          ops.data.device.queue.submit([commandBuffer]); 
         

        }  

        ops.funcs.observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            const canvas = entry.target;
            const width = entry.contentBoxSize[0].inlineSize;
            const height = entry.contentBoxSize[0].blockSize;
            canvas.width = Math.max(1, Math.min(width, ops.data.device.limits.maxTextureDimension2D));
            canvas.height = Math.max(1, Math.min(height, ops.data.device.limits.maxTextureDimension2D));
            ops.funcs.draw();
          }
        });



        ops.funcs.ini = async () =>{

          ops.funcs.load(); 

          try {
            await ops.funcs.iniWEBGPU();
             ops.funcs.doPipelineConfig();

             

          }
          catch (e) {
            alert( "<span style='color:#AA0000; font-size:110%'><b>Error: Could not initialize WebGPU: </b>" + 
            e.message + "</span>")
           
            return;
        }


          ops.ui.colors.value = 0;
          ops.ui.colors.onchange = ops.funcs.doColorChange;
          ops.ui.bgColors.value = 2;
          ops.ui.bgColors.onchange =  ops.funcs.draw;



          ops.ui.dyniColor.value = "#e66465";
          ops.ui.dyniColor.oninput =  ops.funcs.dyniColorOnChange;
  

          ops.ui.dyniBgColor.value = "#7EA96b";
          ops.ui.dyniBgColor.oninput =  ops.funcs.draw;


          
          ops.funcs.observer.observe(ops.data.context.canvas); //ops.funcs.draw();

          
          Ebk.MIDI.initMIDI({   onMIDIMessage : (event) => {
            // Extract MIDI data from the event
                 const [status, data1, data2] = event.data;

                 console.log(status, data1, data2)

                 ops.funcs.modulateDyniColor(status, data1,data2);
                 ops.funcs.modulateDyniBgColor(status, data1,data2);

                 ops.funcs.modulateDyniColor_hit(status, data1,data2);
                 ops.funcs.modulateDyniBgColor_hit(status, data1,data2);
              
           
      
              }
          });
          

          
        }

        return {desc:ops.desc, func: ops.funcs.ini};
    }

  } ,

  {
       
    entry : ()=>{
         
        let ops = {};
        ops.desc = `--Colored Triangle and background with picker-MIDI`
        
        ops.ui = {};
       
        ops.data = {};

        ops.data.shaderSource = `

          @group(0) @binding(0) var<uniform> color: vec3f; 

          @vertex fn vs(@location(0) coords: vec2f)->@builtin(position) vec4f {
            return vec4f(coords[0], coords[1], 0.0, 1.0);
          }

          @fragment fn fs()->@location(0) vec4f {
            return vec4f(color[0], color[1], color[2], 1.0);
          }

        `;
        
        ops.data.triCoords  = new Float32Array([
          -0.8, -0.6,  0.8, -0.6, 0.0, 0.6
        ]);


        ops.data.colors  = [
          new Float32Array([1.0, 0.0, 0.0]), 
          new Float32Array([0.0, 1.0, 0.0]), 
          new Float32Array([0.0, 0.0, 1.0]), 
          new Float32Array([0.1, 0.1, 0.1]), 
        ];

        ops.data.bgColors  = [
           [0.7, 0.0, 0.0], 
           [0.0, 0.7, 0.0], 
           [0.0, 0.0, 0.7], 
           [0.3, 0.3, 0.3], 
        ];

        ops.data.device; 
        ops.data.context;
        ops.data.shaderModule;
        ops.data.vertexFormat = "float32x2";
        ops.data.pipeline; 
        ops.data.vertexBuffer; 
        ops.data.uniformBuffer; 
        ops.data.uniformBindGroup; 


        ops.funcs = {};  
        
        
        ops.funcs.load = ()=>{

            projects.funcs.createUIInputsContainer(); 

            projects.funcs.reloadCanvas();   

            let  container = document.querySelector(`#uiInputsContainer`);  

            ops.ui.dyniColor =  projects.funcs.createElement_LabeledInput( 
              {   
               container: container,   
              labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Triangle dyni color    ' },
               inputProperties: { type:"color",  style: { width: '50px' } }
            }).inputElement;

            ops.ui.dyniBgColor =  projects.funcs.createElement_LabeledInput( 
              {   
               container: container,   
              labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Dyni backgroup color    ' },
               inputProperties: { type:"color",  style: { width: '50px' } }
            }).inputElement;

            ops.ui.colors = projects.funcs.createElement_LabeledSelect (  {
  
              options: [
                { value: '0', textContent: 'Red' },
                { value: '1', textContent: 'Green' },
                { value: '2', textContent: 'Blue' },
                { value: '3', textContent: 'Grey' }
              ],
                container: container ,
              
                labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' , display: "none" }, text: 'Triangle color '  },
                selectProperties: { id: 'colorsList', style: { width: '100px' , display: "none" } }
            }).selectElement;

            ops.ui.bgColors = projects.funcs.createElement_LabeledSelect (  {
  
              options: [
                { value: '0', textContent: 'Red' },
                { value: '1', textContent: 'Green' },
                { value: '2', textContent: 'Blue' },
                { value: '3', textContent: 'Grey' }
              ],
                container: container ,
              
                labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' , display: "none" }, text: 'BackGroundColor   ' },
                selectProperties: { id: 'bgColorsList', style: { width: '100px' , display: "none" } }
            }).selectElement;

        }


         ops.funcs.modulateDynyColor =(status, data1,data2)=>{


          ops.ui.dyniColorComps =  hexToRgba(ops.ui.dyniColor.value); 
                  
    
          Ebk.MIDI.ctrlAKAILPD8_PROG1_K1 ( {  
  
               flow: {chanel: status, key: data1, value: data2} , 
               operation: {function: (params) =>{ 
  
                
                 ops.ui.dyniColorComps.r = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                 ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
                
          }} });
  
          Ebk.MIDI.ctrlAKAILPD8_PROG1_K2 ( {  
  
           flow: {chanel: status, key: data1, value: data2} , 
           operation: {function: (params) =>{ 
  
             ops.ui.dyniColorComps.g = Ebk.MIDI.keyValueToRGBvalue(data2);
             ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
         
         }} });
  
         Ebk.MIDI.ctrlAKAILPD8_PROG1_K3 ( {  
  
           flow: {chanel: status, key: data1, value: data2} , 
           operation: {function: (params) =>{ 
             ops.ui.dyniColorComps.b = Ebk.MIDI.keyValueToRGBvalue(data2);
             ops.funcs.dyniColorWriteNDraw(ops.ui.dyniColor, ops.ui.dyniColorComps);
         
         }} });
  
  
         }
       
  
         ops.funcs.modulateDyniBgColor =(status, data1,data2)=>{
  
  
          ops.ui.dyniBgColorComps =  hexToRgba(ops.ui.dyniBgColor.value); 
                  
    
            Ebk.MIDI.ctrlAKAILPD8_PROG1_K5 ( {  
  
                flow: {chanel: status, key: data1, value: data2} , 
                operation: {function: (params) =>{ 
  
                  
                  ops.ui.dyniBgColorComps.r = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                  ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                  
            }} });
  
            Ebk.MIDI.ctrlAKAILPD8_PROG1_K6 ( {  
  
              flow: {chanel: status, key: data1, value: data2} , 
              operation: {function: (params) =>{ 
  
                
                ops.ui.dyniBgColorComps.g = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                
          }} });
  
  
          Ebk.MIDI.ctrlAKAILPD8_PROG1_K7 ( {  
  
              flow: {chanel: status, key: data1, value: data2} , 
              operation: {function: (params) =>{ 
  
                
                ops.ui.dyniBgColorComps.b = Ebk.MIDI.keyValueToRGBvalue(data2);
  
                ops.funcs.dyniBgColorWriteNDraw(ops.ui.dyniBgColor, ops.ui.dyniBgColorComps);
                
            }} });
  
  
  
         }
       

        ops.funcs.iniWEBGPU = async ()=>{

            if(!navigator.gpu){
              throw new error("This navigator does not support webgpu"); 
            }

            let adapter = await navigator.gpu.requestAdapter(); 

            if(!adapter) {
              throw new error("The navigator support webgpu but there is no adapter found");
            }

            ops.data.device = await adapter.requestDevice(); 

            ops.data.context = document.querySelector("canvas").getContext("webgpu"); 

            ops.data.context.configure({
               device: ops.data.device, 
               format: navigator.gpu.getPreferredCanvasFormat(), 
               alphaMode: "premultiplied"

            });

            ops.data.shaderModule = ops.data.device.createShaderModule({
              label: `Shader module ${ops.desc}`, 
              code: ops.data.shaderSource, 
            });

        }
        

        ops.funcs.doPipelineConfig = ()=>{

          let vertexBufferLayout = [
              {
                attributes: [{shaderLocation: 0, offset: 0, format: ops.data.vertexFormat }], 
                stepMode: "vertex", 
                arrayStride: projects.gpu.vertexFormatValue( ops.data.vertexFormat ,"bytesize") 
              }

          ];



          let uniformBindGroupLayout = ops.data.device.createBindGroupLayout({
            label: `uniformBindGoupLayout,   ${ops.desc}`,
            entries : [
               {
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT, 
                buffer: {type: "uniform"}
               }
            ]
          });

          let pipelineDescriptor = {
            
            label: `pipeline,   ${ops.desc}`,

            layout: ops.data.device.createPipelineLayout({
              bindGroupLayouts: [uniformBindGroupLayout]
            }), 

            vertex: {
              module : ops.data.shaderModule, 
              entryPoint: "vs", 
              buffers: vertexBufferLayout
            } , 

            fragment: {
              module: ops.data.shaderModule, 
              entryPoint: "fs", 
              targets: [{
                format: navigator.gpu.getPreferredCanvasFormat()
              }]
            } , 

            primitive: {
              topology: "triangle-list"
            }

          }


          ops.data.pipeline = ops.data.device.createRenderPipeline(pipelineDescriptor);

          ops.data.vertexBuffer = ops.data.device.createBuffer({
              label: `vertexBuffer,   ${ops.desc}`,
              size: ops.data.triCoords.byteLength, 
              usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
          }); 

          ops.data.device.queue.writeBuffer(ops.data.vertexBuffer, 0, ops.data.triCoords);

          ops.data.uniformBuffer = ops.data.device.createBuffer({
              label: `uniformBuffer,   ${ops.desc}`,
              size: ops.data.colors[0].byteLength, 
              usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
          }); 

          ops.data.device.queue.writeBuffer(ops.data.uniformBuffer, 0, ops.data.colors[0]);
 
          
          ops.data.uniformBindGroup  =  ops.data.device.createBindGroup({
            label: `uniformBindGroup,   ${ops.desc}`,
            layout: uniformBindGroupLayout,
            
            entries : [
              {
               binding: 0, 
               resource: {buffer: ops.data.uniformBuffer, offset: 0, size: 3*4} 
              }
           ]

          }); 

              
        }  


        ops.funcs.dyniColorOnChange = ()=> {

          let colorComp =   hexToRgba(ops.ui.dyniColor.value);
          let colorArr = new Float32Array([colorComp.r/255, colorComp.g/255, colorComp.b/255]);
          ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  colorArr);
          ops.funcs.draw()
       }


       ops.funcs.dyniColorWriteNDraw = (uiDyniColor, uiDyniColorComps)=> {
         uiDyniColor.value = rgbToHex(uiDyniColorComps.r, uiDyniColorComps.g, uiDyniColorComps.b) 
                        
        let colorArr = new Float32Array([uiDyniColorComps.r/255, uiDyniColorComps.g/255, uiDyniColorComps.b/255]);
        ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  colorArr);
        ops.funcs.draw()

        }

        ops.funcs.dyniBgColorWriteNDraw = (uiBgDyniColor, uiDyniBgColorComps)=> {
          uiBgDyniColor.value = rgbToHex(uiDyniBgColorComps.r, uiDyniBgColorComps.g, uiDyniBgColorComps.b) 
                         
           ops.funcs.draw()
 
         }



        ops.funcs.doColorChange = ()=> {
          let colorNum = Number(ops.ui.colors.value);
          ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  ops.data.colors[colorNum]);
          ops.funcs.draw()
       }


        ops.funcs.draw = ()=>{

          let bgColorComp =   hexToRgba(ops.ui.dyniBgColor.value);
 
          let commandEncoder = ops.data.device.createCommandEncoder();

          let renderPassDescriptor = {
             colorAttachments: [{

                 clearValue: { r: bgColorComp.r/255, g: bgColorComp.g/255, b: bgColorComp.b/255, a: 1 },

                 loadOp: "clear", 
                 storeOp: "store",  
                 view: ops.data.context.getCurrentTexture().createView() 

             }]
          };
          let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
   
          passEncoder.setPipeline(ops.data.pipeline);  
          passEncoder.setVertexBuffer(0,ops.data.vertexBuffer);

          passEncoder.setBindGroup(0,ops.data.uniformBindGroup);

          passEncoder.draw(3);
          passEncoder.end();
          let commandBuffer = commandEncoder.finish(); 
          ops.data.device.queue.submit([commandBuffer]); 
         

        }  

        ops.funcs.observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            const canvas = entry.target;
            const width = entry.contentBoxSize[0].inlineSize;
            const height = entry.contentBoxSize[0].blockSize;
            canvas.width = Math.max(1, Math.min(width, ops.data.device.limits.maxTextureDimension2D));
            canvas.height = Math.max(1, Math.min(height, ops.data.device.limits.maxTextureDimension2D));
            ops.funcs.draw();
          }
        });



        ops.funcs.ini = async () =>{

          ops.funcs.load(); 

          try {
            await ops.funcs.iniWEBGPU();
             ops.funcs.doPipelineConfig();

             

          }
          catch (e) {
            alert( "<span style='color:#AA0000; font-size:110%'><b>Error: Could not initialize WebGPU: </b>" + 
            e.message + "</span>")
           
            return;
        }


          ops.ui.colors.value = 0;
          ops.ui.colors.onchange = ops.funcs.doColorChange;
          ops.ui.bgColors.value = 2;
          ops.ui.bgColors.onchange =  ops.funcs.draw;



          ops.ui.dyniColor.value = "#e66465";
          ops.ui.dyniColor.oninput =  ops.funcs.dyniColorOnChange;
  

          ops.ui.dyniBgColor.value = "#7EA96b";
          ops.ui.dyniBgColor.oninput =  ops.funcs.draw;


          
          ops.funcs.observer.observe(ops.data.context.canvas); //ops.funcs.draw();

          
          Ebk.MIDI.initMIDI({   onMIDIMessage : (event) => {
            // Extract MIDI data from the event
                 const [status, data1, data2] = event.data;

                 ops.funcs.modulateDynyColor(status, data1,data2);
                 ops.funcs.modulateDyniBgColor(status, data1,data2)
           
      
              }
          });
          

          
        }

        return {desc:ops.desc, func: ops.funcs.ini};
    }

  } ,

  {
       
    entry : ()=>{
         
        let ops = {};
        ops.desc = `--Colored Triangle and background `
        
        ops.ui = {};
       
        ops.data = {};

        ops.data.shaderSource = `

            @group(0) @binding(0) var<uniform> color : vec3f; 
            

            @vertex fn vs( @location(0) coords : vec2f ) -> @builtin(position) vec4f {
               return vec4f( coords, 0, 1 );

            }
            
          
             @fragment fn fs() -> @location(0) vec4f {
               return vec4f( color, 1 ); 

            }
        
        `;
        
        ops.data.triCoords  = new Float32Array([
          -0.8, -0.6,  0.0, -0.6, 0.0, 0.6
        ]);


        ops.data.colors  = [
          new Float32Array([1.0, 0.0, 0.0]), 
          new Float32Array([0.0, 1.0, 0.0]), 
          new Float32Array([0.0, 0.0, 1.0]), 
          new Float32Array([0.1, 0.1, 0.1]), 
        ];

        ops.data.bgColors  = [
           [0.7, 0.0, 0.0], 
           [0.0, 0.7, 0.0], 
           [0.0, 0.0, 0.7], 
           [0.3, 0.3, 0.3], 
        ];

        ops.data.device; 
        ops.data.context;
        ops.data.shaderModule;
        ops.data.vertexFormat = "float32x2";
        ops.data.pipeline; 
        ops.data.vertexBuffer; 
        ops.data.uniformBuffer; 
        ops.data.uniformBindGroup; 


        ops.funcs = {};  
        
        
        ops.funcs.load = ()=>{

            projects.funcs.createUIInputsContainer(); 

            projects.funcs.reloadCanvas();   

            let  container = document.querySelector(`#uiInputsContainer`);  



            
            ops.ui.colors = projects.funcs.createElement_LabeledSelect (  {
  
              options: [
                { value: '0', textContent: 'Red' },
                { value: '1', textContent: 'Green' },
                { value: '2', textContent: 'Blue' },
                { value: '3', textContent: 'Grey' }
              ],
                container: container ,
              
                labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'Triangle color    ' },
                selectProperties: { id: 'colorsList', style: { width: '100px' } }
            }).selectElement;

            ops.ui.bgColors = projects.funcs.createElement_LabeledSelect (  {
  
              options: [
                { value: '0', textContent: 'Red' },
                { value: '1', textContent: 'Green' },
                { value: '2', textContent: 'Blue' },
                { value: '3', textContent: 'Grey' }
              ],
                container: container ,
              
                labelProperties: { style: {  border: '1px solid #ccc', padding: '12px', margin: '12px' }, text: 'BackGroundColor   ' },
                selectProperties: { id: 'bgColorsList', style: { width: '100px' } }
            }).selectElement;

        }


        ops.funcs.iniWEBGPU = async ()=>{

            if (!navigator.gpu) {
              throw  Error(`this navigator doest not support WEBGPU`);
              
            }

            let adapter = await navigator.gpu.requestAdapter(); 

            if (!adapter){
              throw Error(`Navigator support WEBGPU but there no adapter found`);
            }

            ops.data.device = await adapter.requestDevice(); 

            ops.data.context = document.querySelector(`canvas`).getContext("webgpu");

            ops.data.context.configure({
              device: ops.data.device, 
              format: navigator.gpu.getPreferredCanvasFormat(), 
              alphaMode: "premultiplied" 
            });

            ops.data.shaderModule = ops.data.device.createShaderModule({
              label: `shaderModule,   ${ops.desc}`,
              code : ops.data.shaderSource
            });

        }
        

        ops.funcs.doPipelineConfig = ()=>{

          let vertexBufferLayout = [
              {
                attributes: [{shaderLocation: 0, offset: 0, format: ops.data.vertexFormat }], 
                stepMode: "vertex", 
                arrayStride: projects.gpu.vertexFormatValue( ops.data.vertexFormat ,"bytesize") 
              }

          ];



  
          let uniformBindGroupLayout = ops.data.device.createBindGroupLayout({
            label: `uniformBindGoupLayout,   ${ops.desc}`,
            entries : [
               {
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT, 
                buffer: {type: "uniform"}
               }
            ]
          });

          let pipelineDescriptor = {
            
            label: `pipeline,   ${ops.desc}`,

            layout: ops.data.device.createPipelineLayout({
              bindGroupLayouts: [uniformBindGroupLayout]
            }), 

            vertex: {
              module : ops.data.shaderModule, 
              entryPoint: "vs", 
              buffers: vertexBufferLayout
            } , 

            fragment: {
              module: ops.data.shaderModule, 
              entryPoint: "fs", 
              targets: [{
                format: navigator.gpu.getPreferredCanvasFormat()
              }]
            } , 

            primitive: {
              topology: "triangle-list"
            }

          }


          ops.data.pipeline = ops.data.device.createRenderPipeline(pipelineDescriptor);

          ops.data.vertexBuffer = ops.data.device.createBuffer({
              label: `vertexBuffer,   ${ops.desc}`,
              size: ops.data.triCoords.byteLength, 
              usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
          }); 

          ops.data.device.queue.writeBuffer(ops.data.vertexBuffer, 0, ops.data.triCoords);

          ops.data.uniformBuffer = ops.data.device.createBuffer({
              label: `uniformBuffer,   ${ops.desc}`,
              size: ops.data.colors[0].byteLength, 
              usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
          }); 

          ops.data.device.queue.writeBuffer(ops.data.uniformBuffer, 0, ops.data.colors[0]);
 
          
          ops.data.uniformBindGroup  =  ops.data.device.createBindGroup({
            label: `uniformBindGroup,   ${ops.desc}`,
            layout: uniformBindGroupLayout,
            
            entries : [
              {
               binding: 0, 
               resource: {buffer: ops.data.uniformBuffer, offset: 0, size: 3*4} 
              }
           ]

          }); 

              

  

        }  


        ops.funcs.doColorChange = ()=> {
          let colorNum = Number(ops.ui.colors.value);
          ops.data.device.queue.writeBuffer( ops.data.uniformBuffer, 0,  ops.data.colors[colorNum]);
          ops.funcs.draw()
       }


        ops.funcs.draw = ()=>{
          let bgColor = ops.data.bgColors[ Number(ops.ui.bgColors.value) ];
          let commandEncoder = ops.data.device.createCommandEncoder();

          let renderPassDescriptor = {
             colorAttachments: [{

                 clearValue: { r: bgColor[0], g: bgColor[1], b: bgColor[2], a: 1 },

                 loadOp: "clear", 
                 storeOp: "store",  
                 view: ops.data.context.getCurrentTexture().createView() 

             }]
          };
          let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
   
          passEncoder.setPipeline(ops.data.pipeline);  
          passEncoder.setVertexBuffer(0,ops.data.vertexBuffer);

          passEncoder.setBindGroup(0,ops.data.uniformBindGroup);

          passEncoder.draw(3);
          passEncoder.end();
          let commandBuffer = commandEncoder.finish(); 
          ops.data.device.queue.submit([commandBuffer]); 
         

        }  

        ops.funcs.observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            const canvas = entry.target;
            const width = entry.contentBoxSize[0].inlineSize;
            const height = entry.contentBoxSize[0].blockSize;
            canvas.width = Math.max(1, Math.min(width, ops.data.device.limits.maxTextureDimension2D));
            canvas.height = Math.max(1, Math.min(height, ops.data.device.limits.maxTextureDimension2D));
            ops.funcs.draw();
          }
        });

       



        ops.funcs.ini = async () =>{

          ops.funcs.load(); 

          try {
            await ops.funcs.iniWEBGPU();
             ops.funcs.doPipelineConfig();

             

          }
          catch (e) {
            alert( "<span style='color:#AA0000; font-size:110%'><b>Error: Could not initialize WebGPU: </b>" + 
            e.message + "</span>")
           
            return;
        }


          ops.ui.colors.value = 0;
          ops.ui.colors.onchange = ops.funcs.doColorChange;
          ops.ui.bgColors.value = 2;
          ops.ui.bgColors.onchange =  ops.funcs.draw;

          ops.funcs.observer.observe(ops.data.context.canvas)
          //ops.funcs.draw();

          
          


  
          
        }

        return {desc:ops.desc, func: ops.funcs.ini};
    }

  } ,


  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Practice multiple Uniforms B`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

     
        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{


          // run uiload
          obj.uiLoad();
       

          // function initializeWebGPU
          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {

                  // run initializewebGPU
                  obj.initializeWebGPU();
                }
            });


            //run onWebGPUInitialized
            obj.onWebGPUInitialized();
        
            return true;
          }

          // onWebGPUInitialized 
          obj.onWebGPUInitialized = () => {
            
            // reload canvas
            reloadCanvas();

            //canvas assigment
            const canvas = document.querySelector('canvas');

            //context assignment
            const context = canvas.getContext('webgpu');

           

           Ebk.WEBGPU.Buffer.PartsPropertiesTests();

            //  let properties = new Ebk.WEBGPU.Buffer.Properties({ properties:[ { color: { type: `vec4f`, data: [[0.8, 0.2, 0.9, 1.0]]}},
            //                                                                 { scale: { type: `vec2f`, data: [[0.1, 0.9 ]]}},
            //                                                                 { offset: { type: `vec2f`, data: [[ 0.5, -0.25 ]]}},
            //                                                               ],
            //                               structName: `OurStruct`,
            //                               shaderLabel: `build triangle`,
            //                               device: gpuDevice
                                        
            //                             });
                                        

            // preferredCanvasFormat assignment
            const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: canvasFormat,
            });
          

      
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `

                  struct OurStruct {
                    color: vec4f,
                    scale: vec2f,
                    offset: vec2f,
                  };
                      
            
                  @group(0) @binding(0) var<uniform> ourStruct: OurStruct;
            
                  @vertex fn vs(
                    @builtin(vertex_index) vertexIndex : u32
                  ) -> @builtin(position) vec4f {
                    let pos = array(
                      vec2f( 0.0,  0.5),  // top center
                      vec2f(-0.5, -0.5),  // bottom left
                      vec2f( 0.5, -0.5)   // bottom right
                    );
            
                    return vec4f(
                      pos[vertexIndex] * ourStruct.scale + ourStruct.offset, 0.0, 1.0);
                  }
            
                  @fragment fn fs() -> @location(0) vec4f {
                    return ourStruct.color;
                  }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: canvasFormat }],
              },
            });


            let objCount = 5000;
            let objs = []             
            
            
            
            
             let randXY = () =>{

              return {
                x: Ebk.Rand.fRanges({ranges:[[-1, 1]], clamps:[[0,1]]}), 
                y: Ebk.Rand.fRanges({ranges:[[-1, 1]], clamps:[[0,1]]})
              }

             }


             let randVect = () =>{

              return [ Ebk.Rand.fRanges({ranges:[[-0.3, 0.3]], clamps:[[0,1]]}), Ebk.Rand.fRanges({ranges:[[-0.3, 0.3]], clamps:[[0,1]]})];

             }



            let circlesCount = 15;

            let circles = [];


            for (let circleNDX = 0; circleNDX<circlesCount; circleNDX++){
              circles.push(
                new  Ebk.Geometry.CircleTrix2D ({   
                  radius: 1., 
                  verticesCount: 108,
                  geomatrix: {origin:[randXY().x, randXY().y],  matrix: [randVect(), randVect()] }, 
                  rythms: {
                    angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                    edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.01], [0.04]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]},
                  }
                   
                  }  )
              )
            }



            
            let randCircleVertex = ()=>{
                let randCircleNDX = Ebk.Rand.iRanges({ranges:[[0.,circles.length-1]], clamps:[[0,1] ]});
                let randCircle = circles[randCircleNDX].getVerticesPosition();
                let randVertex = Ebk.Rand.iRanges({ranges:[[0.,randCircle.length-1]], clamps:[[0,1] ]});
                return randCircle[randVertex]

            }

 
           
            for(let objndx =0; objndx<objCount; objndx++){


                let r = Ebk.Rand.fRanges({ranges:[[0.,0.1],[0.1, 0.2]], clamps:[[0,1],[0.2,0.3]]});
                let g = Ebk.Rand.fRanges({ranges:[[1.,0.01],[0.05, 0.09]], clamps:[[0,1],[0.2,0.3]]});
                let b = Ebk.Rand.fRanges({ranges:[[0.1,0.3],[0.05, 0.09]], clamps:[[0,1],[0.2,0.3]]});
                
             

                let offsetx = Ebk.Rand.fRanges({ranges:[[-0.5, -0.1], [0, 0.3]], clamps:[[0,1],[0,1]]});
                let offsety = Ebk.Rand.fRanges({ranges:[[-0.9, -0.4], [-0.1, 0.5], [0.7, 0.98]], clamps:[[0,1], [0,1], [0,1]]});

                 objs.push( new Ebk.WEBGPU.Buffer.Properties({ properties:[ { color: { type: `vec4f`, data: [[r, g, b, 1.0]]}},
                             { scale: { type: `vec2f`, data: [[0.5, 0.5 ]]}},
                             { offset: { type: `vec2f`, data: [randCircleVertex()]}},
                    ],
                     structName: `OurStruct`,
                     shaderLabel: `build triangle`,
                     device: gpuDevice   }));


                     objs[objndx].bufferLoadBind( {pipeline: pipeline, exeptions : [`scale`] });

            }
                                    


            // renderPassDescriptor
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          

             let count = 0.5
            //function render   
            function render() {
  
              const aspect = canvas.width / canvas.height;
              
       
          
              // Get the current texture from the canvas context and
              // set it as the texture to render to.
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          

              const encoder = gpuDevice.createCommandEncoder();
              const pass = encoder.beginRenderPass(renderPassDescriptor);



              pass.setPipeline(pipeline);



              for(let objndx =0; objndx<objCount; objndx++){

             
                  let scale = Ebk.Rand.fRanges({ranges:[[0.002, 0.093], [0.0008, 0.0193]], clamps:[[0.2, 1.0], [1.0, 1.0]]});

                  objs[objndx].draw({pass: pass, data : {aspect: aspect ,scale: scale} });
  
              }
              pass.end();





            
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              //requestAnimationFrame(render)
              requestAnimationFrame(render);
              //count+=0.01;

              //count%=4;
            
            }

            //requestAnimationFrame(render)
            requestAnimationFrame(render);
         
            //object oberver  
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
           }
        
          //Initialize WebGPU
          obj.initializeWebGPU();

          

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Practice multiple Uniforms`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

     
        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{


          // run uiload
          obj.uiLoad();
       

          // function initializeWebGPU
          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {

                  // run initializewebGPU
                  obj.initializeWebGPU();
                }
            });


            //run onWebGPUInitialized
            obj.onWebGPUInitialized();
        
            return true;
          }

          // onWebGPUInitialized 
          obj.onWebGPUInitialized = () => {
            
            // reload canvas
            reloadCanvas();

            //canvas assigment
            const canvas = document.querySelector('canvas');

            //context assignment
            const context = canvas.getContext('webgpu');

           



            //  let properties = new Ebk.WEBGPU.Buffer.Properties({ properties:[ { color: { type: `vec4f`, data: [[0.8, 0.2, 0.9, 1.0]]}},
            //                                                                 { scale: { type: `vec2f`, data: [[0.1, 0.9 ]]}},
            //                                                                 { offset: { type: `vec2f`, data: [[ 0.5, -0.25 ]]}},
            //                                                               ],
            //                               structName: `OurStruct`,
            //                               shaderLabel: `build triangle`,
            //                               device: gpuDevice
                                        
            //                             });
                                        

            // preferredCanvasFormat assignment
            const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: canvasFormat,
            });
          

      
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `

                  struct OurStruct {
                    color: vec4f,
                    scale: vec2f,
                    offset: vec2f,
                  };
                      
            
                  @group(0) @binding(0) var<uniform> ourStruct: OurStruct;
            
                  @vertex fn vs(
                    @builtin(vertex_index) vertexIndex : u32
                  ) -> @builtin(position) vec4f {
                    let pos = array(
                      vec2f( 0.0,  0.5),  // top center
                      vec2f(-0.5, -0.5),  // bottom left
                      vec2f( 0.5, -0.5)   // bottom right
                    );
            
                    return vec4f(
                      pos[vertexIndex] * ourStruct.scale + ourStruct.offset, 0.0, 1.0);
                  }
            
                  @fragment fn fs() -> @location(0) vec4f {
                    return ourStruct.color;
                  }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: canvasFormat }],
              },
            });


            let objCount = 2000;
            let objs = []                           
           
            for(let objndx =0; objndx<objCount; objndx++){


                let r = Ebk.Rand.fRanges({ranges:[[1.,1.],[0.5, 0.9]], clamps:[[0,1],[0.2,0.3]]});
                let g = Ebk.Rand.fRanges({ranges:[[0.,0.01],[0.05, 0.09]], clamps:[[0,1],[0.2,0.3]]});
                let b = Ebk.Rand.fRanges({ranges:[[1.,1.],[0.5, 0.9]], clamps:[[0,1],[0.2,0.3]]});
                

                let offsetx = Ebk.Rand.fRanges({ranges:[[-0.5, -0.1], [0, 0.3]], clamps:[[0,1],[0,1]]});
                let offsety = Ebk.Rand.fRanges({ranges:[[-0.9, -0.4], [-0.1, 0.5], [0.7, 0.98]], clamps:[[0,1], [0,1], [0,1]]});

                 objs.push( new Ebk.WEBGPU.Buffer.Properties({ properties:[ { color: { type: `vec4f`, data: [[r, g, b, 1.0]]}},
                             { scale: { type: `vec2f`, data: [[0.5, 0.5 ]]}},
                             { offset: { type: `vec2f`, data: [[ offsetx, offsety ]]}},
                    ],
                     structName: `OurStruct`,
                     shaderLabel: `build triangle`,
                     device: gpuDevice   }));


                     objs[objndx].bufferLoadBind( {pipeline: pipeline, exeptions : [`scale`] });

            }
                                    


            // renderPassDescriptor
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          

             let count = 0.5
            //function render   
            function render() {
  
              const aspect = canvas.width / canvas.height;
              
       
          
              // Get the current texture from the canvas context and
              // set it as the texture to render to.
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          

              const encoder = gpuDevice.createCommandEncoder();
              const pass = encoder.beginRenderPass(renderPassDescriptor);



              pass.setPipeline(pipeline);



              for(let objndx =0; objndx<objCount; objndx++){

             
                  let scale = Ebk.Rand.fRanges({ranges:[[0.002, 0.093], [0.0008, 0.0193]], clamps:[[0.2, 1.0], [1.0, 1.0]]});

                  objs[objndx].draw({pass: pass, data : {aspect: aspect ,scale: scale} });
  
              }
              pass.end();





            
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              //requestAnimationFrame(render)
              requestAnimationFrame(render);
              //count+=0.01;

              //count%=4;
            
            }

            //requestAnimationFrame(render)
            requestAnimationFrame(render);
         
            //object oberver  
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
           }
        
          //Initialize WebGPU
          obj.initializeWebGPU();

          

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Practice Uniform`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        //Ebk.WEBGPU.Buffer.PropertyTests();

        // Ebk.WEBGPU.Buffer.PropertiesTests();
        // Ebk.WEBGPU.Buffer.PropertyTests();
      
  
        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{


          // run uiload
          obj.uiLoad();
       

          // function initializeWebGPU
          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {

                  // run initializewebGPU
                  obj.initializeWebGPU();
                }
            });


            //run onWebGPUInitialized
            obj.onWebGPUInitialized();
        
            return true;
          }

          // onWebGPUInitialized 
          obj.onWebGPUInitialized = () => {
            
            // reload canvas
            reloadCanvas();

            //canvas assigment
            const canvas = document.querySelector('canvas');

            //context assignment
            const context = canvas.getContext('webgpu');




             let properties = new Ebk.WEBGPU.Buffer.Properties({ properties:[ { color: { type: `vec4f`, data: [[0.8, 0.2, 0.9, 1.0]]}},
                                                                            { scale: { type: `vec2f`, data: [[0.1, 0.9 ]]}},
                                                                            { offset: { type: `vec2f`, data: [[ 0.5, -0.25 ]]}},
                                                                          ],
                                          structName: `OurStruct`,
                                          shaderLabel: `build triangle`,
                                          device: gpuDevice
                                        
                                        });


                                                                  

            // preferredCanvasFormat assignment
            const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: canvasFormat,
            });
          

      
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `

                  ${properties.getWGSL_structure()}
                  
            
                  @group(0) @binding(0) var<uniform> ourStruct: OurStruct;
            
                  @vertex fn vs(
                    @builtin(vertex_index) vertexIndex : u32
                  ) -> @builtin(position) vec4f {
                    let pos = array(
                      vec2f( 0.0,  0.5),  // top center
                      vec2f(-0.5, -0.5),  // bottom left
                      vec2f( 0.5, -0.5)   // bottom right
                    );
            
                    return vec4f(
                      pos[vertexIndex] * ourStruct.scale + ourStruct.offset, 0.0, 1.0);
                  }
            
                  @fragment fn fs() -> @location(0) vec4f {
                    return ourStruct.color;
                  }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: canvasFormat }],
              },
            });


           //Create Buffer   
           properties.createBuffer_UniformReadOnly()   
            
            
           //Create data 
           properties.createData_Float32Array(); 


           //load data
           properties.loadData({exeptions : [`scale`]});

           console.log(properties.data);

           

          //Bindgroup statement 
           properties.createBindGroup( {pipeline});

            // const bindGroup = gpuDevice.createBindGroup({
            //   layout: pipeline.getBindGroupLayout(0),
            //   entries: [
            //     { binding: 0, resource: { buffer: properties.buffer }},
            //   ],
            // });


            // renderPassDescriptor
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          

             let count = 0.5
            //function render   
            function render() {
  
              const aspect = canvas.width / canvas.height;
              
              //load changing data
              properties.loadSpecData({property:`scale`, data :[count / aspect, count] });

              // copy the values from JavaScript to the GPU
              gpuDevice.queue.writeBuffer(properties.buffer, 0, properties.data);
          
              // Get the current texture from the canvas context and
              // set it as the texture to render to.
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          

              const encoder = gpuDevice.createCommandEncoder();
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              pass.setBindGroup(0, properties.bindGroup);
              pass.draw(3);  // call our vertex shader 3 times
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              //requestAnimationFrame(render)
              requestAnimationFrame(render);
              //count+=0.01;

              //count%=4;
            
            }

            //requestAnimationFrame(render)
            requestAnimationFrame(render);
         
            //object oberver  
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
           }
        
          //Initialize WebGPU
          obj.initializeWebGPU();

          

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Simple triangle Interstage`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        Ebk.Geometry.GridTrix2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{


          // run uiload
          obj.uiLoad();
       

          // function initializeWebGPU
          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {

                  // run initializewebGPU
                  obj.initializeWebGPU();
                }
            });
        
            //run onWebGPUInitialized
            obj.onWebGPUInitialized();
        
            return true;
          }

          // onWebGPUInitialized 
          obj.onWebGPUInitialized = () => {
            
            // reload canvas
            reloadCanvas();

            //canvas assigment
            const canvas = document.querySelector('canvas');

            //context assignment
            const context = canvas.getContext('webgpu');

            // preferredCanvasFormat assignment
            const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: canvasFormat,
            });
          

      
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `

                struct Transfer {
                  @builtin(position) position : vec4f,
                  @location(0) color : vec4f
                }

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =   array(
                    vec2f( 0.0,  0.5),  // top center
                    vec2f(-0.5, -0.5),  // bottom left
                    vec2f( 0.5, -0.5)   // bottom right
                  );

                  let color = array<vec4f, 3>(
                     vec4f(1.0, 0.0, 0.0, 1.0),
                     vec4f(1.0, 0.6, 0.0, 1.0),
                     vec4f(1.0, 0.0, 0.7, 1.0),

                  );

                  var transfer : Transfer;

                  transfer.position = vec4f(pos[vi], 0.0, 1.0);

                  transfer.color = color[vi];
                  
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer ) -> @location(0) vec4f {
                  return transfer.color;
                }

              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: canvasFormat }],
              },
            });


           //Data statement 


           //Data statement 
         

           //Buffer statement 
      

            //Bindgroup statement 
  


            // renderPassDescriptor
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          


            //function render   
            function render() {
  
              //assign renderDescriptor.colorAttachments[0].view

              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              // commandEncoder  statement    
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });

              // renderPass statement
              const pass = encoder.beginRenderPass(renderPassDescriptor);

              // pipeline setup
              pass.setPipeline(pipeline);

              //assign changing data


              // write on buffer
              

              // setup bindgroup
          
              // draw or compute
              pass.draw(3);   

              
              //end
              pass.end();
          

              //finish encoder with command buffer
              const commandBuffer = encoder.finish();

              //submit command
              gpuDevice.queue.submit([commandBuffer]);

              //requestAnimationFrame(render)
              requestAnimationFrame(render);
            
            
            }

            //requestAnimationFrame(render)
            requestAnimationFrame(render);
         
            //object oberver  
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
           }
        
          //Initialize WebGPU
          obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,


  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Simple triangle`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        Ebk.Geometry.GridTrix2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{


          // run uiload
          obj.uiLoad();
       

          // function initializeWebGPU
          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {

                  // run initializewebGPU
                  obj.initializeWebGPU();
                }
            });
        
            //run onWebGPUInitialized
            obj.onWebGPUInitialized();
        
            return true;
          }

          // onWebGPUInitialized 
          obj.onWebGPUInitialized = () => {
            
            // reload canvas
            reloadCanvas();

            //canvas assigment
            const canvas = document.querySelector('canvas');

            //context assignment
            const context = canvas.getContext('webgpu');

            // preferredCanvasFormat assignment
            const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: canvasFormat,
            });
          

      
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  @builtin(position) vec4f {
                  let pos =   array(
                    vec2f( 0.0,  0.5),  // top center
                    vec2f(-0.5, -0.5),  // bottom left
                    vec2f( 0.5, -0.5)   // bottom right
                  );
                  
                  return vec4f(pos[vi], 0.0, 1.0);
                }
          
                @fragment fn fs() -> @location(0) vec4f {
                  return vec4f(1.0, 1.0, 0.0, 1.0);
                }

              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: canvasFormat }],
              },
            });


           //Data statement 


           //Data statement 
         

           //Buffer statement 
      

            //Bindgroup statement 
  


            // renderPassDescriptor
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          


            //function render   
            function render() {
  
              //assign renderDescriptor.colorAttachments[0].view

              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              // commandEncoder  statement    
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });

              // renderPass statement
              const pass = encoder.beginRenderPass(renderPassDescriptor);

              // pipeline setup
              pass.setPipeline(pipeline);

              //assign changing data


              // write on buffer
              

              // setup bindgroup
          
              // draw or compute
              pass.draw(3);   

              
              //end
              pass.end();
          

              //finish encoder with command buffer
              const commandBuffer = encoder.finish();

              //submit command
              gpuDevice.queue.submit([commandBuffer]);

              //requestAnimationFrame(render)
              requestAnimationFrame(render);
            
            
            }

            //requestAnimationFrame(render)
            requestAnimationFrame(render);
         
            //object oberver  
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
           }
        
          //Initialize WebGPU
          obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Ebk.Geometry.DyniPathTrix2d`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        Ebk.Geometry.DyniPathTrix2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       
         let scalar = 1.95; 

          let input = [

            {   
              verticesCount: 150,
              geomatrix: {origin:[-0.8,0.4],  matrix: [[0, -1.0 ], [1.7, 0 ]] }, 
              rythms: {
                abs: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0], [1]], flow:(x)=>{return    x*Math.cos(4*x);}, messy:[-1,1]},
                ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return  Math.pow(1.2, x); }, messy:[-1,1]},
                edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.003], [0.003001]], flow:(x)=>{return 2*x; }, messy:[0,0]},               }
          }  ,

              {   
                verticesCount: 50,
                geomatrix: {origin:[-0.8,0.4],  matrix: [[0, -1.0 ], [1.7, 0 ]] }, 
                rythms: {
                  abs: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0], [1]], flow:(x)=>{return   x*Math.cos(10*x);}, messy:[-1,1]},
                  ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 1/Math.pow(1.2, x); }, messy:[-1,1]},
                  edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.003], [0.003001]], flow:(x)=>{return 2*x; }, messy:[0,0]},               }
            }  ,

            {   
              verticesCount: 50,
              geomatrix: {origin:[-0.8,0.4],  matrix: [[0, -2.0 ], [0.4, 0 ]] }, 
              rythms: {
                abs: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0], [1]], flow:(x)=>{return    Math.sin( (1/2)*x);}, messy:[0, 0]},
                ord: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0], [1]], flow:(x)=>{return 2*x; }, messy:[-1,1]},
                edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.003], [0.003001]], flow:(x)=>{return 2*x; }, messy:[0,0]},               }
          }  ,
          

          ]
                

           let dyniPathTrix2D = new  Ebk.Geometry.DyniPathTrix2D( 

               Ebk.Rand.pullFromMix({arr: input})
               

           )


            let matrixSelector =  dyniPathTrix2D.getCoveredPosition();

            let colorsOBJ = new Ebk.Rythm({type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2,0.1,0.5,1], [0.7,0.05,0.8,1], [0.8,0.98,0.95,1]], flow:(x)=>{return 2*x; }, granularity:2,messy:[-1,1]});

            let colors = [];

            matrixSelector.forEach(itm =>{

              let r = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let g = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let b = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              colorsOBJ._update({type:Ebk.ERythm.TYPE.LINEAR, sample:[[r, g, b,1], [0.7,0.05,0.8,1], [r, g, b, 1]], flow:(x)=>{return Math.pow(3,x); }, granularity:2,messy:[-1,1]});

              colors.push(colorsOBJ.locateCollection());
            })

          
            
            
         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }

        obj.dyniTriangles = ({triangles}) => {

        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =  ${EbkWebGPU.shaderAddTrianglesString({triangles: matrixSelector})}
                  var colorrr =  ${EbkWebGPU.shaderAddColorsString({colors: colors})}

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                  transfer.color = colorrr[vi];       
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(matrixSelector.length*3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Ebk.Geometry.SpiralTrix2D`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        Ebk.Geometry.SpiralTrix2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       
         let scalar = 1.95; 

   
           let spiralTrix2D = new Ebk.Geometry.SpiralTrix2D({   
              verticesCount: 150,
               geomatrix: {origin:[0,0],  matrix: [[0.18, 0 ], [0, 0.26 ]] }, 
              rythms: {
                angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[ 5.1*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[0,0]},
                edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.0191],   [0.03]], flow:(x)=>{return  Math.sin(  170*x ); }, messy:[-1,0]},
                radius: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.1], [1.9]], flow:(x)=>{return Math.pow(1.3,x) }, messy:[0,0]},
              }
          })


            let matrixSelector =  spiralTrix2D.getCoveredPosition();

            let colorsOBJ = new Ebk.Rythm({type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2,0.1,0.5,1], [0.7,0.05,0.8,1], [0.8,0.98,0.95,1]], flow:(x)=>{return 2*x; }, granularity:2,messy:[-1,1]});

            let colors = [];

            matrixSelector.forEach(itm =>{

              let r = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let g = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let b = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              colorsOBJ._update({type:Ebk.ERythm.TYPE.LINEAR, sample:[[r, g, b,1], [0.7,0.05,0.8,1], [r, g, b, 1]], flow:(x)=>{return Math.pow(3,x); }, granularity:2,messy:[-1,1]});

              colors.push(colorsOBJ.locateCollection());
            })

          
            
            
         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }

        obj.dyniTriangles = ({triangles}) => {

        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =  ${EbkWebGPU.shaderAddTrianglesString({triangles: matrixSelector})}
                  var colorrr =  ${EbkWebGPU.shaderAddColorsString({colors: colors})}

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                  transfer.color = colorrr[vi];       
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(matrixSelector.length*3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Ebk.Geometry.Circloid2D`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        Ebk.Geometry.Circloid2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       
         let scalar = 1.95; 

   



           let circloidTrix2D = new Ebk.Geometry.CircloidTrix2D({   
            radius: [0.2, 0.5 ], 
            verticesCount: 50,
            geomatrix: {origin:[0,0],  matrix: [[1, 1.3 ], [ 0.3, 1 ]] }, 
            rythms: {
              angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
              edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.03], [-0.09], [0.03]], flow:(x)=>{return Math.sin(x); }, messy:[ 0,0]},
            }
             
          })


            let matrixSelector =  circloidTrix2D.getCoveredPosition();

            let colorsOBJ = new Ebk.Rythm({type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2,0.1,0.5,1], [0.7,0.05,0.8,1], [0.8,0.98,0.95,1]], flow:(x)=>{return 2*x; }, granularity:2,messy:[-1,1]});

            let colors = [];

            matrixSelector.forEach(itm =>{

              let r = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let g = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let b = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              colorsOBJ._update({type:Ebk.ERythm.TYPE.LINEAR, sample:[[r, g, b,1], [0.7,0.05,0.8,1], [r, g, b, 1]], flow:(x)=>{return Math.pow(3,x); }, granularity:2,messy:[-1,1]});

              colors.push(colorsOBJ.locateCollection());
            })

          
            
            
         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }

        obj.dyniTriangles = ({triangles}) => {

        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =  ${EbkWebGPU.shaderAddTrianglesString({triangles: matrixSelector})}
                  var colorrr =  ${EbkWebGPU.shaderAddColorsString({colors: colors})}

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                  transfer.color = colorrr[vi];       
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(matrixSelector.length*3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Ebk.Geometry.CircleTrix2D`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        Ebk.Geometry.CircleTrix2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       
         let scalar = 1.95; 

   



           let circleTrix2D = new Ebk.Geometry.CircleTrix2D({   
            radius: 0.5, 
            verticesCount: 50,
            geomatrix: {origin:[0,0],  matrix: [[1, 1.3 ], [ 0.3, 1 ]] }, 
            rythms: {
              angle: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0],[2*Math.PI] ], flow:(x)=>{return 2*x; }, messy:[-1,1]},
              edge: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0.03], [-0.09], [0.03]], flow:(x)=>{return Math.sin(x); }, messy:[ 0,0]},
            }
             
          })


            let matrixSelector =  circleTrix2D.getCoveredPosition();

            let colorsOBJ = new Ebk.Rythm({type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2,0.1,0.5,1], [0.7,0.05,0.8,1], [0.8,0.98,0.95,1]], flow:(x)=>{return 2*x; }, granularity:2,messy:[-1,1]});

            let colors = [];

            matrixSelector.forEach(itm =>{

              let r = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let g = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let b = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              colorsOBJ._update({type:Ebk.ERythm.TYPE.LINEAR, sample:[[r, g, b,1], [0.7,0.05,0.8,1], [r, g, b, 1]], flow:(x)=>{return Math.pow(3,x); }, granularity:2,messy:[-1,1]});

              colors.push(colorsOBJ.locateCollection());
            })

          
            
            
         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }

        obj.dyniTriangles = ({triangles}) => {

        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =  ${EbkWebGPU.shaderAddTrianglesString({triangles: matrixSelector})}
                  var colorrr =  ${EbkWebGPU.shaderAddColorsString({colors: colors})}

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                  transfer.color = colorrr[vi];       
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(matrixSelector.length*3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `OpenPath2D`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        EbkCov.OpenPath2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       
         let scalar = 1.95; 

  
            let openPath2D = new EbkCov.OpenPath2D({ 
              positions: [ [-0.5, 0.1],  [-0.3, -0.2], [-0.1,0], [0,0], [0.1, 0], [0.3, 0], [0.5, 0], [0.7, 0] , [0.8, 0]], // [[0,0], [0.1, 0.2], [0.3, 0], [0.2, -0.3], [0.7, -0.2] , [0.5, 0.2]],
              thicknessRythm:{type:Ebk.ERythm.TYPE.WAVY, sample:[[0.02], [0.08]], flow:(x)=>{return Math.sin(x); }, messy:[0,0]}
           });
            


            let matrixSelector = openPath2D.thickPath();

            let colorsOBJ = new Ebk.Rythm({type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2,0.1,0.5,1], [0.7,0.05,0.8,1], [0.8,0.98,0.95,1]], flow:(x)=>{return 2*x; }, granularity:2,messy:[-1,1]});

            let colors = [];

            matrixSelector.forEach(itm =>{

              let r = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let g = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let b = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              colorsOBJ._update({type:Ebk.ERythm.TYPE.LINEAR, sample:[[r, g, b,1], [0.7,0.05,0.8,1], [r, g, b, 1]], flow:(x)=>{return Math.pow(3,x); }, granularity:2,messy:[-1,1]});

              colors.push(colorsOBJ.locateCollection());
            })

          
            
            
         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }

        obj.dyniTriangles = ({triangles}) => {

        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =  ${EbkWebGPU.shaderAddTrianglesString({triangles: matrixSelector})}
                  var colorrr =  ${EbkWebGPU.shaderAddColorsString({colors: colors})}

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                  transfer.color = colorrr[vi];       
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(matrixSelector.length*3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Bars dynyTriangle`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

       // EbkCov.OpenPath2DTests();


        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       
         let scalar = 1.95; 

            let barre = new EbkGeo.Geobartrix({ granularity: 20,
              geomatrix: {origin:[0,0],  matrix:  [[scalar*0.4,0*scalar ], [0.1*scalar, 1*scalar*0.3 ]] }, 
              axisRythmes:[
                {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(3.8, 1/6*x+1); }, messy:[0,0]} ,
                {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return  Math.cos( x); }, messy:[-1,0]} ,
                {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(1.8,  x+1) }, messy:[0,0]} ,
                {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return  1/2*x+1 }, messy:[0 , 0]} ,
              ]   

          });

          //------ glasses
          //   let barre = new EbkGeo.Geobartrix({ granularity: 20,
          //     geomatrix: {origin:[0,0],  matrix:  [[scalar*0.3,0*scalar ], [0*scalar,-1*scalar*0.3 ]] }, 
          //     axisRythmes:[
          //       {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return Math.pow(3.8, 1/6*x+1); }, messy:[0,1]} ,
          //       {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return  Math.cos( x); }, messy:[-1,0]} ,
          //       {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x }, messy:[0,0]} ,
          //       {type:Ebk.ERythm.TYPE.WAVY, flow:(x)=>{return  Math.atan(x) }, messy:[-1,1]} ,
          //     ]   

          // });


            let barrr = barre.barsMatrix();
        
            let openPath2D = new EbkCov.OpenPath2D({ 
              positions: [[0,0], [0.1, 0], [0.3, 0], [0.5, 0], [0.7, 0] , [-0.8, 0]], // [[0,0], [0.1, 0.2], [0.3, 0], [0.2, -0.3], [0.7, -0.2] , [0.5, 0.2]],
              thicknessRythm:{type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.08]], flow:(x)=>{return Math.pow(1.3, x); }, messy:[0,0]}
           });
            


            let matrixSelector = barrr;

            let colorsOBJ = new Ebk.Rythm({type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2,0.1,0.5,1], [0.7,0.05,0.8,1], [0.8,0.98,0.95,1]], flow:(x)=>{return 2*x; }, granularity:2,messy:[-1,1]});

            let colors = [];

            matrixSelector.forEach(itm =>{

              let r = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let g = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              let b = Ebk.Rand.fRanges({ranges:[[0.,1.],[0.3, 0.6], [0.2, 0.5]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]});
              colorsOBJ._update({type:Ebk.ERythm.TYPE.LINEAR, sample:[[r, g, b,1], [0.7,0.05,0.8,1], [r, g, b, 1]], flow:(x)=>{return Math.pow(3,x); }, granularity:2,messy:[-1,1]});

              colors.push(colorsOBJ.locateCollection());
            })

          
            
            
         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }

        obj.dyniTriangles = ({triangles}) => {

        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos =  ${EbkWebGPU.shaderAddTrianglesString({triangles: matrixSelector})}
                  var colorrr =  ${EbkWebGPU.shaderAddColorsString({colors: colors})}

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                  transfer.color = colorrr[vi];       
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(matrixSelector.length*3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Functions background`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5



        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            //console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{

       

 

         obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos = array(
                    vec2f( 0.0,  0.5),   
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)   
                  );

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                                  
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `enhance ui gradient triangle`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5



        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  

        obj.uiLoadObjectsCount = ()=>{


          obj.objectsCountLabel = document.createElement(`div`);
        
          obj.objectsCountLabel.innerHTML =`objectsCount`;
          obj.objectsCountLabel.style.margin = `4px`;
     
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCountLabel);

          obj.objectsCount = document.createElement(`input`);
          obj.objectsCount.setAttribute(`type`,`text`);
          obj.objectsCount.setAttribute(`size`,`1`);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.objectsCount);

          obj.objectsCount.addEventListener(`change`, ()=>{
            obj.objectsCountValue =  obj.objectsCount.value;
      
            obj.onWebGPUInitialized();
         
            console.log(obj.objectsCountValue);
            
          })
        }  
        
        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 

          obj.uiLoadObjectsCount()

          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,345);
          obj.uiLoadColorContainer(1,35,445);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{
          
          obj.uiLoad();

         

          obj.initializeWebGPU = async() => {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                  obj.initializeWebGPU();
                }
            });
        
            obj.onWebGPUInitialized();
        
            return true;
        }
        
        obj.onWebGPUInitialized = () => {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `


                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos = array(
                    vec2f( 0.0,  0.5),   
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)   
                  );

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                                  
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
                     
        }
        
        obj.initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{

        let obj = {};
        obj.desc = `enhance ui gradient triangle`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5



        obj.uiLoadColorPickers = (instance_ndx,index,color)=>{
          
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.innerHTML = ``+index;
          obj.colorPickers[instance_ndx][index].htmlInputColorLabel.style.padding = "0 5px"
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColorLabel);

          obj.colorPickers[instance_ndx][index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[instance_ndx][index].htmlInputColor.setAttribute(`value`,color);
          obj.colorsContainer[instance_ndx].appendChild(obj.colorPickers[instance_ndx][index].htmlInputColor);

          obj.colorPickers[instance_ndx][index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[instance_ndx][index].htmlInputColor.value);
            obj.colorPickers[instance_ndx][index].r =r; obj.colorPickers[instance_ndx][index].g =g; obj.colorPickers[instance_ndx][index].b=b;
 
        }

        obj.uiLoadColorButton = (ndx,label)=>{
          obj.colorButton[ndx] = document.createElement(`button`);
        
          obj.colorButton[ndx].innerHTML = label;
          obj.colorButton[ndx].style.margin = `4px`;
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorButton[ndx]);
          obj.colorButton[ndx].addEventListener(`click`, ()=>{
             if (obj.colorsContainer[ndx] .style.display == `none`){
                obj.colorsContainer[ndx] .style.display = `flex`;
             } else if (obj.colorsContainer[ndx] .style.display == `flex`){
              obj.colorsContainer[ndx] .style.display = `none`;
            }
          })
        }  


        obj.uiLoadColorContainer = (instance_ndx,top =30,left=25)=>{

          obj.colorsContainer[instance_ndx] = document.createElement(`div`);    
          obj.colorsContainer[instance_ndx] .style.display = `flex`;
          obj.colorsContainer[instance_ndx] .style.position = `absolute`;
          obj.colorsContainer[instance_ndx] .style.top = top +`px`;
          obj.colorsContainer[instance_ndx] .style.left = left +`px`;
          obj.colorsContainer[instance_ndx] .style.flexDirection = `column`; 
          obj.colorsContainer[instance_ndx] .style.display = `none`;
           
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorsContainer[instance_ndx] );
        } 

        obj.uiLoadInstanceColorPickers = (instance_ndx,colors = ["#DD3698","#36109E","#E6DB65"])=>{
          obj.uiLoadColorPickers(instance_ndx,0,colors[0]);
          obj.uiLoadColorPickers(instance_ndx,1,colors[1]);
          obj.uiLoadColorPickers(instance_ndx,2,colors[2]);
        }

        obj.uiLoad = ()=>{

          obj.colorButton = [,];
          obj.colorsContainer= [,]
          obj.colorPickers = [[{},{},{}],[{},{},{}]];
          createUIInputsContainer(); 
          obj.uiLoadColorButton(0,`Color Start`);
          obj.uiLoadColorButton(1,`Color End`);

          obj.uiLoadColorContainer(0,35,200);
          obj.uiLoadColorContainer(1,35,300);
          obj.uiLoadInstanceColorPickers(0,["#DD3698","#36109E","#E6DB65"]);
          obj.uiLoadInstanceColorPickers(1,["#DF3608","#36709E","#A6DB95"]);

        }
        
 
        obj.func = async () =>{
          
          obj.uiLoad();

          let gpuDevice = null;

          async function initializeWebGPU() {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                    initializeWebGPU();
                }
            });
        
            onWebGPUInitialized();
        
            return true;
        }
        
        function onWebGPUInitialized() {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `



                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos = array(
                    vec2f( 0.0,  0.5),   
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)   
                  );

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                                  
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0][0].r,obj.colorPickers[0][0].g,obj.colorPickers[0][0].b,1.], 0);
              colorsData.set([ obj.colorPickers[0][1].r,obj.colorPickers[0][1].g,obj.colorPickers[0][1].b,1.], 4);
              colorsData.set([ obj.colorPickers[0][2].r,obj.colorPickers[0][2].g,obj.colorPickers[0][2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
           
          
        }
        
         initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{

        let obj = {};
        obj.desc = `ui gradient triangle`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5


        obj.uiLoadColorPickers = (index,color)=>{
          
          obj.colorPickers[index].htmlInputColorLabel = document.createElement(`div`);
          obj.colorPickers[index].htmlInputColorLabel.innerHTML = `Color`+index;
          obj.colorPickers[index].htmlInputColorLabel.style.padding = "0 5px"
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorPickers[index].htmlInputColorLabel);

          obj.colorPickers[index].htmlInputColor =  document.createElement(`input`);
          obj.colorPickers[index].htmlInputColor.setAttribute(`type`,"color");
          obj.colorPickers[index].htmlInputColor.setAttribute(`value`,color);
          document.querySelector(`#uiInputsContainer`).appendChild(obj.colorPickers[index].htmlInputColor);

          obj.colorPickers[index].htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.colorPickers[index].r =r; obj.colorPickers[index].g =g; obj.colorPickers[index].b=b;

          });

 
            let  {r,g,b} = hexToRgbaNormal(obj.colorPickers[index].htmlInputColor.value);
            obj.colorPickers[index].r =r; obj.colorPickers[index].g =g; obj.colorPickers[index].b=b;
 
        }


        obj.uiLoad = ()=>{

          createUIInputsContainer(); 

          obj.colorPickers = [{},{},{}];
          obj.uiLoadColorPickers(0,"#DD3698");
          obj.uiLoadColorPickers(1,"#36109E");
          obj.uiLoadColorPickers(2,"#E6DB65");

        }
        
 
        obj.func = async () =>{
          
          obj.uiLoad();

          let gpuDevice = null;

          async function initializeWebGPU() {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                    initializeWebGPU();
                }
            });
        
            onWebGPUInitialized();
        
            return true;
        }
        
        function onWebGPUInitialized() {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel =  obj.desc;

            const module = gpuDevice.createShaderModule({
              label: 'our hardcoded red triangle shaders',
              code: `



                struct Transfer {
                  @builtin(position) posi: vec4f, 
                  @location(0) color : vec4f
                }

                @group(0) @binding(0) var<uniform> colors: array<vec4f,3>; 
         

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) ->  Transfer {
                  let pos = array(
                    vec2f( 0.0,  0.5),   
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)   
                  );

                  var transfer : Transfer;
                  transfer.posi  = vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                                  
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: 'our hardcoded red triangle pipeline',
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorsData = new Float32Array(12);

            const colorsBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorsBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorsData.set([ obj.colorPickers[0].r,obj.colorPickers[0].g,obj.colorPickers[0].b,1.], 0);
              colorsData.set([ obj.colorPickers[1].r,obj.colorPickers[1].g,obj.colorPickers[1].b,1.], 4);
              colorsData.set([ obj.colorPickers[2].r,obj.colorPickers[2].g,obj.colorPickers[2].b,1.], 8);

              gpuDevice.queue.writeBuffer(colorsBuffer,0, colorsData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
           
          
        }
        
         initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
       
    entry : ()=>{

        let obj = {};
        obj.desc = `ui colored triangle`
        
        obj.r = 0.3,  obj.g = 0.4, obj.b = 0.5

        obj.uiLoad = ()=>{
          createUIInputsContainer(); 

          obj.htmlInputColorLabel = document.createElement(`div`);
          obj.htmlInputColorLabel.innerHTML = `Color`;
          obj.htmlInputColorLabel.style.padding = "0 5px"
          document.querySelector(`#uiInputsContainer`).appendChild(obj.htmlInputColorLabel);

          obj.htmlInputColor =  document.createElement(`input`);
          obj.htmlInputColor.setAttribute(`type`,"color");
          obj.htmlInputColor.setAttribute(`value`,"#e66465");
          document.querySelector(`#uiInputsContainer`).appendChild(obj.htmlInputColor);

          obj.htmlInputColor.addEventListener(`input`,(event)=>{

            let  {r,g,b} = hexToRgbaNormal(event.target.value);
            obj.r =r; obj.g =g;obj.b=b;

          });

        
        }
        
  
        obj.func = async () =>{
          
          obj.uiLoad();

          let gpuDevice = null;

          async function initializeWebGPU() {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                    initializeWebGPU();
                }
            });
        
            onWebGPUInitialized();
        
            return true;
        }
        
        function onWebGPUInitialized() {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const mainLabel = `ui colored triangle`;

            const module = gpuDevice.createShaderModule({
              label: obj.desc,
              code: `

                @group(0) @binding(0) var<uniform> color: vec4f; 
   
                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) -> @builtin(position) vec4f {
                  let pos = array(
                    vec2f( 0.0,  0.5),   
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)    
                  );

                                  
                  return vec4f(pos[vi], 0.0, 1.0);
                }
          
                @fragment fn fs() -> @location(0) vec4f {
                  return color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: obj.desc,
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });


            const colorData = new Float32Array(4);

            const colorBuffer = gpuDevice.createBuffer({
              label: mainLabel+`,colorBuffer`, 
              size: 4*4, 
              usage: GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST
            });

            const bindGroup = gpuDevice.createBindGroup({
              label: mainLabel+`,bindGroup`,
              layout: pipeline.getBindGroupLayout(0), 
              entries: [
                {binding: 0, resource:{buffer: colorBuffer}}
              ]
            })
          
            const renderPassDescriptor = {
              label: 'our basic canvas renderPass',
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              colorData.set([ obj.r,obj.g,obj.b,1.], 0);
              gpuDevice.queue.writeBuffer(colorBuffer,0, colorData);
              pass.setBindGroup(0,bindGroup);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
         
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
               
              }
            });

            observer.observe(canvas);
           
          
        }
        
         initializeWebGPU();

        }


        return {desc:obj.desc, func: obj.func};
    }

  } ,

  {
    desc: `Simple Gradient triangle`, 

    entry : ()=>{

        let obj = {};
        obj.desc = `Simple Gradient triangle`
        obj.func = async () =>{

        let gpuDevice = null;

        async function initializeWebGPU() {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
            // Note that the promise will reject if invalid options are passed to the optional
            // dictionary. To avoid the promise rejecting always check any features and limits
            // against the adapters features and limits prior to calling requestDevice().
            gpuDevice = await gpuAdapter.requestDevice();
        
            // requestDevice will never return null, but if a valid device request can’t be
            // fulfilled for some reason it may resolve to a device which has already been lost.
            // Additionally, devices can be lost at any time after creation for a variety of reasons
            // (ie: browser resource management, driver updates), so it’s a good idea to always
            // handle lost devices gracefully.
            gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason != 'destroyed') {
                    initializeWebGPU();
                }
            });
        
            onWebGPUInitialized();
        
            return true;
        }
        
        function onWebGPUInitialized() {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const module = gpuDevice.createShaderModule({
              label: obj.desc,
              code: `

                struct Transfer {
                    @builtin(position) posi: vec4f,
                    @location(0) color: vec4f
                };

                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) -> Transfer {
                  let pos = array(
                    vec2f( 0.0,  0.5),  
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)    
                  );

                  let colors = array(
                    vec4f(1,0,0,1),
                    vec4f(1,1,0,1),
                    vec4f(1,1,1,1)
                  );

                  var transfer: Transfer;

                  transfer.posi =  vec4f(pos[vi], 0.0, 1.0);
                  transfer.color = colors[vi];
                            
                  return transfer;
                }
          
                @fragment fn fs(transfer: Transfer) -> @location(0) vec4f {
                  return transfer.color;
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: obj.desc,
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });
          
            const renderPassDescriptor = {
              label: obj.desc,
              colorAttachments: [
                {
                  
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
        
            requestAnimationFrame(render);
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
              }
            });

            observer.observe(canvas);
            
          
        }
        
          initializeWebGPU();

        }


        return obj;
    }

  } ,


  {
      
  entry : ()=>{

      let obj = {};
      obj.desc = `Simple red triangle Structure`
      obj.func = async () =>{

      let gpuDevice = null;

      async function initializeWebGPU() {
          // Check to ensure the user agent supports WebGPU.
          if (!('gpu' in navigator)) {
              console.error("User agent doesn’t support WebGPU.");
              return false;
          }
      
          // Request an adapter.
          const gpuAdapter = await navigator.gpu.requestAdapter();
      
          // requestAdapter may resolve with null if no suitable adapters are found.
          if (!gpuAdapter) {
              console.error('No WebGPU adapters found.');
              return false;
          }
      
          // Request a device.
          // Note that the promise will reject if invalid options are passed to the optional
          // dictionary. To avoid the promise rejecting always check any features and limits
          // against the adapters features and limits prior to calling requestDevice().
          gpuDevice = await gpuAdapter.requestDevice();
      
          // requestDevice will never return null, but if a valid device request can’t be
          // fulfilled for some reason it may resolve to a device which has already been lost.
          // Additionally, devices can be lost at any time after creation for a variety of reasons
          // (ie: browser resource management, driver updates), so it’s a good idea to always
          // handle lost devices gracefully.
          gpuDevice.lost.then((info) => {
              console.error(`WebGPU device was lost: ${info.message}`);
      
              gpuDevice = null;
      
              // Many causes for lost devices are transient, so applications should try getting a
              // new device once a previous one has been lost unless the loss was caused by the
              // application intentionally destroying the device. Note that any WebGPU resources
              // created with the previous device (buffers, textures, etc) will need to be
              // re-created with the new one.
              if (info.reason != 'destroyed') {
                  initializeWebGPU();
              }
          });
      
          onWebGPUInitialized();
      
          return true;
      }
      
      function onWebGPUInitialized() {
          
          reloadCanvas();
          const canvas = document.querySelector('canvas');
          const context = canvas.getContext('webgpu');
          const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
          context.configure({
            device:gpuDevice,
            format: presentationFormat,
          });
        
          const module = gpuDevice.createShaderModule({
            label: obj.desc,
            code: `


              @vertex fn vs(
                @builtin(vertex_index) vi : u32
              ) -> @builtin(position) vec4f {
                let pos = array(
                  vec2f( 0.0,  0.5),   
                  vec2f(-0.5, -0.5),   
                  vec2f( 0.5, -0.5)    
                );

                                
                return vec4f(pos[vi], 0.0, 1.0);
              }
        
              @fragment fn fs() -> @location(0) vec4f {
                return vec4f(1,0,0,1);
              }
            `,
          });
        
          const pipeline =  gpuDevice.createRenderPipeline({
            label: obj.desc,
            layout: 'auto',
            vertex: {
              module,
              entryPoint: 'vs',
            },
            fragment: {
              module,
              entryPoint: 'fs',
              targets: [{ format: presentationFormat }],
            },
          });
        
          const renderPassDescriptor = {
            label: obj.desc,
            colorAttachments: [
              {
                
                clearValue: [0.3, 0.3, 0.3, 1],
                loadOp: 'clear',
                storeOp: 'store',
              },
            ],
          };
        
          function render() {

            renderPassDescriptor.colorAttachments[0].view =
                context.getCurrentTexture().createView();
        
            const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
            const pass = encoder.beginRenderPass(renderPassDescriptor);
            pass.setPipeline(pipeline);
            pass.draw(3);   
            pass.end();
        
            const commandBuffer = encoder.finish();
            gpuDevice.queue.submit([commandBuffer]);
            requestAnimationFrame(render);
          }
      
          requestAnimationFrame(render);
        
          const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
              const canvas = entry.target;
              const width = entry.contentBoxSize[0].inlineSize;
              const height = entry.contentBoxSize[0].blockSize;
              canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
              canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
            }
          });

          observer.observe(canvas);
          
        
      }
      
        initializeWebGPU();

      }


      return obj;
  }

  } ,

  {
       
    entry : ()=>{

        let obj = {};
        obj.desc = `Simple blue triangle Structure`
        obj.func = async () =>{

        let gpuDevice = null;

        async function initializeWebGPU() {
            // Check to ensure the user agent supports WebGPU.
            if (!('gpu' in navigator)) {
                console.error("User agent doesn’t support WebGPU.");
                return false;
            }
        
            // Request an adapter.
            const gpuAdapter = await navigator.gpu.requestAdapter();
        
            // requestAdapter may resolve with null if no suitable adapters are found.
            if (!gpuAdapter) {
                console.error('No WebGPU adapters found.');
                return false;
            }
        
            // Request a device.
             gpuDevice = await gpuAdapter.requestDevice();
        
             gpuDevice.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
        
                gpuDevice = null;
        
                if (info.reason != 'destroyed') {
                    initializeWebGPU();
                }
            });
        
            onWebGPUInitialized();
        
            return true;
        }
        
        function onWebGPUInitialized() {
            
            reloadCanvas();
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('webgpu');
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
              device:gpuDevice,
              format: presentationFormat,
            });
          
            const module = gpuDevice.createShaderModule({
              label: obj.desc,
              code: `
   
                @vertex fn vs(
                  @builtin(vertex_index) vi : u32
                ) -> @builtin(position) vec4f {
                  let pos = array(
                    vec2f( 0.0,  0.5),   
                    vec2f(-0.5, -0.5),   
                    vec2f( 0.5, -0.5)   
                  );

                                  
                  return vec4f(pos[vi], 0.0, 1.0);
                }
          
                @fragment fn fs() -> @location(0) vec4f {
                  return vec4f(0,0,1,1);
                }
              `,
            });
          
            const pipeline =  gpuDevice.createRenderPipeline({
              label: obj.desc,
              layout: 'auto',
              vertex: {
                module,
                entryPoint: 'vs',
              },
              fragment: {
                module,
                entryPoint: 'fs',
                targets: [{ format: presentationFormat }],
              },
            });
          
            const renderPassDescriptor = {
              label: obj.desc,
              colorAttachments: [
                {
                 
                  clearValue: [0.3, 0.3, 0.3, 1],
                  loadOp: 'clear',
                  storeOp: 'store',
                },
              ],
            };
          
            function render() {
  
              renderPassDescriptor.colorAttachments[0].view =
                  context.getCurrentTexture().createView();
          
              const encoder =  gpuDevice.createCommandEncoder({ label: 'our encoder' });
              const pass = encoder.beginRenderPass(renderPassDescriptor);
              pass.setPipeline(pipeline);
              pass.draw(3);   
              pass.end();
          
              const commandBuffer = encoder.finish();
              gpuDevice.queue.submit([commandBuffer]);
              requestAnimationFrame(render);
            }
        
            requestAnimationFrame(render);
          
            const observer = new ResizeObserver(entries => {
              for (const entry of entries) {
                const canvas = entry.target;
                const width = entry.contentBoxSize[0].inlineSize;
                const height = entry.contentBoxSize[0].blockSize;
                canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
                canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
              }
            });

            observer.observe(canvas);
           
          
        }
        
         initializeWebGPU();

        }

        return obj;
    }

  } ,


] ;

let createUIFunctionList = projects.funcs.createUIFunctionList;

export { projects,createUIFunctionList};
export default projects; 