 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
import { Ebk} from "./ebika.js";
import { EbkCov} from "./ebikacovering.js";
import { EbkGeo} from "./ebikageometry.js";
import { EbkWebGPU} from "./ebikawebgpu.js";


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

let createUIFunctionList = () =>{


   


  let selectContainer = document.createElement(`div`);

  let list = document.createElement(`select`);

  selectContainer.appendChild(list);

  document.querySelector(`#menu`).append(selectContainer);

   createUIInputsContainer();


   functions_entries.forEach((elt,index)=>{

      let subElt = document.createElement(`option`);
      subElt.innerHTML = elt.entry().desc;
      subElt.functionId = index;
      list.appendChild(subElt);
  });

  list.addEventListener(`change`,(event)=>{
      removeUIInputsContainer();
      let select = event.target.options[event.target.selectedIndex];
      functions_entries[select.functionId].entry().func();           

  });

  functions_entries[0].entry().func();

}


let functions_entries = [

  {
       
    entry : ()=>{
         
        let gpuDevice = null;

        let obj = {};
        obj.desc = `Ebk.Geometry.GridTrix2DTests`
        
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
                
       
          let grid = new  Ebk.Geometry.GridTrix2D({ 
      
            width: 3,
            height: 9, 
            geomatrix: {origin:[0.5,-0.4],  matrix: [[-1, 0], [0, 1 ]] }, 
            rythms: {
              edge: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.01], [0.01002]], flow:(x)=>{return 2*x; }, messy:[-1,1]},   
              abs:    [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x  }, messy:[0, 0]},
                        {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x  }, messy:[0, 0]},
                      ]   ,
    
              ord:  [ {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x; }, messy:[-1,1]},
                               {type:Ebk.ERythm.TYPE.LINEAR, flow:(x)=>{return 2*x }, messy:[0, 0]},
                    ]  
                               
            }
         
         });

             
           let openPath2D = new EbkCov.OpenPath2D({ 
            positions:   grid.getRows( ),
            thicknessRythm:{type:Ebk.ERythm.TYPE.WAVY, sample:[[0.002], [0.005]], flow:(x)=>{return Math.sin(x); }, messy:[0,0]}
         });
          

       

          let matrixSelector = openPath2D.thicknessPath();

 

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
            


            let matrixSelector = openPath2D.thicknessPath();

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

       

          // Ebk.TrajectoryTests ( [
                  
          //   {creation:{path:[[0],[0.7],[0.9],[0.99], [1]],target:0.3,targets:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}, 
          //   update:{path:[[1,2,3,5,9,10],[3,5,12,-2,2,3],[19,5,1,26,-52,6],[8,1,600,12,-2,-11]],target:-0.3,targets:[0,0.1,0.2,0.9,1] }} ,

          //   {creation:{path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.3,targets:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}, 
          //   update:{path:[[1,2,3,5,9,10],[3,5,12,-2,2,3],[19,5,1,26,-52,6],[8,1,600,12,-2,-11]],target:-0.3,targets:[0,0.1,0.2,0.9,1] }} ,
        
          //   {creation:{path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:1.3,targets:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}, 
          //   update:{path:[[1,2,3],[-2,2,3],[5,1,6],[1,1,1]],target:-1.3,targets:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]} } ,
         
          //  ],  ["_update", "getParams" ]);
          

          //  Ebk.ERythm.LinearTests ([
                  
          //   {creation:{flow:(x)=>{return 2*x; }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]}, 
          //   update: {flow:(x)=>{return 3*x; }, granularity:5,step:3,sample:[100,200],messy:[0,0]}} ,
        
          //   {creation:{flow:(x)=>{return  Math.pow(2,x)  }, granularity:13,step:3,sample:[-1,1],messy:[0,1]}, 
          //   update:{flow:(x)=>{return  Math.pow(2,1/(x+1))  }, granularity:13,step:3,sample:[-1,1],messy:[-1,-1]} } ,
         
          //  ],["_update", "getParams" ])



        //   Ebk.ERythm.WavyTests([
                  
        //     {creation:{flow:(x)=>{return Math.sin(x); }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]}, 
        //     update: {flow:(x)=>{return Math.sin(x); }, granularity:10,step:3,sample:[100,200],messy:[0,0]}} ,
        
        //     {creation: {flow:(x)=>{return Math.cos(x); }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]}, 
        //     update: {flow:(x)=>{return Math.cos(x); }, granularity:10,step:3,sample:[100,200],messy:[0,0]} } ,
        //     ,
        //     {creation: {flow:(x)=>{return Math.tan(x); }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]}, 
        //     update: {flow:(x)=>{return Math.tan(x); }, granularity:10,step:3,sample:[100,200],messy:[0,0]} }
        //   ]
          
        // , ["_update", "getParams" ]);


        // Ebk.ERythm.CreationTests  ([
                  
        //   {creation:{type:Ebk.ERythm.TYPE.WAVY,flow:(x)=>{return Math.sin(x); }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]}, 
        //   update: {type:Ebk.ERythm.TYPE.WAVY,flow:(x)=>{return Math.cos(x); }, granularity:10,step:3,sample:[100,200],messy:[-1,1]}} ,
      
        //   {creation: {type:Ebk.ERythm.TYPE.LINEAR,flow:(x)=>{return 2*x; }, granularity:3,step:2,sample:[-20,10],messy:[-1,1]}, 
        //   update: {type:Ebk.ERythm.TYPE.LINEAR,flow:(x)=>{return Math.pow(3,x); }, granularity:10,step:3,sample:[100,200],messy:[-1,1]} } ,
      
       
        //  ], ["_update", "getParams" ]);

       
      //   Ebk.RythmTests   ( [
                  
      //     {creation: {type:Ebk.ERythm.TYPE.WAVY, sample:[[0],[1]], flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1], step:0}, 
      //     update: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,1,1],[0,2,2],[3,-1,3],[4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3} } ,
      //     {creation: {type:Ebk.ERythm.TYPE.WAVY, sample:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]], flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1], step:0}, 
      //     update: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,1,1],[0,2,2],[3,-1,3],[4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3} } ,
      
      //     {creation: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,1,1],[0,2,2],[3,-1,3],[4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3}, 
      //     update: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,1,1],[0,2,2],[3,-1,3],[4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3} } ,
      
      //     {creation: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[15,1,1,1],[-9,0,2,2],[1039,3,-18,3],[0, 4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3}, 
      //     update: {type:Ebk.ERythm.TYPE.LINEAR, sample:[[15,1],[-9,0],[1039,3],[0, 4],[-1,3],[5,1]], flow:(x)=>{return 2*x; }, granularity:20,messy:[-1,1], step:3} } ,
       
      //     {creation: {type:Ebk.ERythm.TYPE.WAVY, sample:[[15,1,1,1],[-9,0,2,2],[1039,3,-18,3],[0, 4,4,8]], flow:(x)=>{return  Math.cos(x); }, granularity:10,messy:[0,0], step:3}, 
      //     update: {type:Ebk.ERythm.TYPE.WAVY, sample:[[15,1],[-9,0],[1039,3],[0, 4],[-1,3],[5,1]], flow:(x)=>{return Math.tan(x); }, granularity:30,messy:[0.5,0.6], step:3} } ,


      // ], ["_update" , "getInfos"  ])


    //   Ebk.Sequence.CreationTests ( [
                  
    //     {creation:{step: 0, dataRef: 2,length :3 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MKMK }, 
    //     update: {step: 0, dataRef: 2,length :4 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MKMK }} ,
    
    //     {creation:{step: 0, dataRef: 2,length :5 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MSMS}, 
    //     update: {step: 0, dataRef: 2,length :6 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MSMS }} ,
    
    //     {creation:{step: 0, dataRef: 2,length :7 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MSMK}, 
    //     update: {step: 0, dataRef: 2,length :8 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MSMK }} ,
    
    //     {creation:{step: 0, dataRef: 2,length :6 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MSMKFADEIN}, 
    //     update: {step: 0, dataRef: 2,length :6 , phase : 0, cLength:40, type: Ebk.Sequence.TYPE.MSMKFADEOUT }} ,
     
    //  ], ["_update", "getParams" ]);
 
 

    //     Ebk.NavigationTests ([
        
    //       {creation:   {sequenceType:Ebk.Sequence.TYPE.MKMK ,  
    //               rythmType:Ebk.ERythm.TYPE.LINEAR,sample:[[1,2,3],[-2,2,3],[5,1,6],[25,30,10]],                     
    //               flow:(x)=>{return 2*x; }, granularity:7,messy:[0,0], step:-2, cLength:22,incDec:1
    //              },   
      
    //         update:  {sequenceType:Ebk.Sequence.TYPE.MSMK,  
    //           rythmType:Ebk.ERythm.TYPE.WAVY,sample:[[1,2],[-2,2],[5,1],[25,30]],                     
    //               flow:(x)=>{return Math.cos(x)}, granularity:8,messy:[0,0], step:-2, cLength:20,incDec:1
    //              },    
                
    //         exceptions:["_update", "pause", "inc", "dec" , "move" , "resume" ]  
              
    //       }  ,
          
    //       {creation:   {sequenceType:Ebk.Sequence.TYPE.MSMKFADEIN ,  
    //         rythmType:Ebk.ERythm.TYPE.LINEAR,sample:[[1,2,3],[-2,2,3],[5,1,6],[25,30,10], [5,1,6]],                     
    //         flow:(x)=>{return 2*x; }, granularity:8,messy:[0,0], step:-2, cLength:29,incDec:1
    //        },   

    //       update:  {sequenceType:Ebk.Sequence.TYPE.MSMK,  
    //       rythmType:Ebk.ERythm.TYPE.WAVY,sample:[[1,2],[-2,2],[5,1],[25,30], [-2,2] ],                     
    //         flow:(x)=>{return Math.cos(x)}, granularity:8,messy:[0,0], step:-1, cLength:40,incDec:1
    //        },    
          
    //      exceptions:["_update", "pause", "inc", "dec" , "move" , "resume" ]  
        
    // }  
        
      
    //   ]);


  //   Ebk.GeoMatrixTests([
    
  //     {creation:  { 
  //         position : [0,0], 
  //         granularity : 3, 
  //         rythMatrix : [{vector: [100,100], type: Ebk.ERythm.TYPE.LINEAR, flow : (x) =>{return 2*x }, messy : [0,0]} ,
  //                       {vector: [100,100], type: Ebk.ERythm.TYPE.LINEAR, flow : (x) =>{return 2*x }, messy : [0,0]} 
  //     ] , indices : [1,1]  },   
  
  //       update:  { 
  //         position : [0,0], 
  //         granularity : 3, 
  //         rythMatrix : [{vector: [100,100], type: Ebk.ERythm.TYPE.LINEAR, flow : (x) =>{return 2*x }, messy : [0,0]} ,
  //                       {vector: [100,100], type: Ebk.ERythm.TYPE.LINEAR, flow : (x) =>{return 2*x}, messy : [0,0]} 
  //     ] , indices : [3,3]  } ,   
      
  //        exceptions:["_update" ]    
  //     }       
     
  //  ]);

   
//  Ebk.Matrix.tests ([
                  
//   {position: [3,1,9], arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:0,times:10, vectors:[[3,1,4],[5,3,-8]] },
//   {position: [3,1,9],v1:[3,1],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:3,times:2, vectors:[[3,1,4],[5,3,-8]],dim: 4},    
//   {position: [3,1,9],v2:[5,3],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 5},
//   {position: [3,1,9],v1:[3,1,1],v2:[5,3],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 3},
//   {position: [3,1,9],v1:[3,`1`],v2:[5,3],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 3},
//   {position: [3,1,9],v1:[3,1],v2:[5,6],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 3},
//   {position: [3,1,9],v1:[3,1,9,20],v2:[5,6,10,-1],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 3},
//   {position: [3,1,9],v:[3,1,9,`20`],scalar:0.5,arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 3},
//   {position: [3,1,9],v1:[2,1],v2:[-1,2],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]],dim: 3},
//   {position: [3,1,9],v1:[1,0],v2:[0,1],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]], dim: 3},
//   {position: [3,1,9], matrix:[[1,2,3],[1,0,2]],scalars:[1,-2], headNdx :0,arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`B`,times:10, vectors:[[3,1,4],[5,3,-8]], dim: 3}, 
//   {position: [3,1,9], matrix:[[1,2,3],[3,5,1],[0,0,8]],scalars:[-1,1,-1/2],  headNdx :0,
//   v:[3,1,42], matrix:[[3,1],[5,3]] , matrices:[ [[3,1],[5,3]], [[3,1],[5,3]], [[5,14],[1,7]]],arr : [1,2,3,4,5,6,7,8,9], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:`y`,times:10 , vectors:[[3,1,4],[5,3,-8]] , dim: 3
// },
//   {position: [3,1,9],m2:[[1,3],[2,4]],m1:[[2,1],[0,2]],arr : [1,2,3,4,5,6,7,8,9], vectors:[[3,1,4],[5,3,-8]], fromIndex : 2, toIndex : 5, withoutIndex : 2,elt:[],times:10, dim: 7}
// ])


// console.log(`DEEP OBJECT COPY`,Ebk.objectDeepCopy ({coco:2,cedro:{a:1,b:`a`}}));


          // Ebk.GeoMatrixTests ( [
              
          //     {creation:  { 
          //       origin : [-1,10], 
          //       matrix: [[4,2], [3,6]] ,
          //       scalars: [0,0],
          //       scalarsMatrix : [[3,1],[5,3], [0,0],[1,2]]
          //   },   

          //     update:  { 
          //       origin : [51,3,0], 
          //       matrix: [[4,2,5], [3,6,8], [3,6,8]] ,
          //       scalars: [0,0,0],
          //       scalarsMatrix : [[3,1,-1],[5,3,9], [0,0,32],[1,2,-8]]
          //   } ,   

            
          //     exceptions:["_update" ]    
          //   }    ,

          //   {creation:  { 
          //     origin : [1,1], 
          //     matrix: [[3,1], [2,4]] ,
          //     scalars: [0.4,0.9],
          //     scalarsMatrix : [[0.4,0.9],[5,3], [0,0],[1,2]]
          // },   

          //   update:  { 
          //     origin : [51,3,0], 
          //     matrix: [[4,2,5], [3,6,8], [3,6,8]] ,
          //     scalars: [0,0,0],
          //     scalarsMatrix : [[3,1,-1],[5,3,9], [0,0,32],[1,2,-8]]
          // } ,   


          //   exceptions:["_update" ]    
          // } 
          
          // ])


        //   Ebk.TrajectoriesVertiMapTests ([
                  
        //     {creation:{     paths:[
        //         [[0,0],[0,1],[0,2],[0,3]],
        //         [[1,0],[1,1],[1,2],[1,3]],
        //         [[2,0],[2,1],[2,2],[2,3]],
        //         [[3,0],[3,1],[3,2],[4,3]],
        //         ], coords:[0.3,0.8], 
        //         coordsMatrix : [ [0.0,0.0], [0,0.20], [0,0.8], [0,1],
        //                          [0.25,0.0], [0.25,0.20], [0.25,0.8], [0.25, 1],
        //                          [0.75,0.0], [0.75,0.20], [0.75,0.8], [0.75, 1],
        //                          [1,0.0], [1,0.20], [1,0.8], [1, 1]
        //       ] }, 
        //     update:{     paths:[
        //         [[0,0],[0,1],[0,2],[0,3]],
        //         [[1,0],[1,1],[1,2],[1,3]],
        //         [[2,0],[2,1],[2,2],[2,3]],
        //         [[3,0],[3,1],[3,2],[4,3]],
        //         ], coords:[0,0] , coordsMatrix : [ [0.0,0.0], [0.1,0.18], [0.3,0.8], [1,0.99], [1,1]] }} ,
        
        //     {creation:{     paths:[
        //         [[0,0],[0,1],[0,2],[0,3]],
        //         [[1,0],[1,1],[1,2],[1,3]],
        //         [[2,0],[2,1],[2,2],[2,3]],
        //         [[3,0],[3,1],[3,2],[4,3]],
        //         ], coords:[0.3,0.8]}, 
        //     update:{     paths:[
        //         [[0,0],[0,1],[0,2],[0,3]],
        //         [[1,0],[1,1],[1,2],[1,3]],
        //         [[2,0],[2,1],[2,2],[2,3]],
        //         [[3,0],[3,1],[3,2],[4,3]],
        //         ], coords:[1,1]} } ,
         
        // ],["_update", "getParams" ]);
            


      //   Ebk.Conversion.tests  ( [
      //     `ff`,
      //     {value: 0.5, eltMatrix:[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]},
      //     {value: -0.5, eltMatrix:[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      //      src:{interval:[1,12], value:3.18},  dst:{interval:[100,200]},
      //  }, 
          
      //     {value: -0.5,  eltMatrix:[
      //                  -2,-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1,
      //                  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 3,1
      //                 ],
       
      //                 src:{interval:[1,12], value:3.18},  dst:{interval:[100,200]}
      //              },  
                   
          
      // ])

 

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

export { functions_entries,createUIFunctionList};
export default functions_entries; 