 
let reloadCanvas = () =>{
    document.querySelector(`canvas`).remove();
    document.querySelector(`body`).append( document.createElement(`canvas`));
}
 
  
let functions_entries = [

    {
        desc: `Simple Blue triangle Structure`, 

        func : async ()=>{

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
                  label: 'our hardcoded red triangle shaders',
                  code: `
                    @vertex fn vs(
                      @builtin(vertex_index) vertexIndex : u32
                    ) -> @builtin(position) vec4f {
                      let pos = array(
                        vec2f( 0.0,  0.5),  // top center
                        vec2f(-0.5, -0.5),  // bottom left
                        vec2f( 0.5, -0.5)   // bottom right
                      );
              
                      return vec4f(pos[vertexIndex], 0.0, 1.0);
                    }
              
                    @fragment fn fs() -> @location(0) vec4f {
                      return vec4f(0, 0, 1, 1);
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

    } ,
   
    {
        desc: `Simple red triangle Structure`, 

        func : async ()=>{

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
                  label: 'our hardcoded red triangle shaders',
                  code: `
                    @vertex fn vs(
                      @builtin(vertex_index) vertexIndex : u32
                    ) -> @builtin(position) vec4f {
                      let pos = array(
                        vec2f( 0.0,  0.5),  // top center
                        vec2f(-0.5, -0.5),  // bottom left
                        vec2f( 0.5, -0.5)   // bottom right
                      );
              
                      return vec4f(pos[vertexIndex], 0.0, 1.0);
                    }
              
                    @fragment fn fs() -> @location(0) vec4f {
                      return vec4f(1, 0, 0, 1);
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

    } ,

    {
        desc: `Simple Gradient triangle`, 

        func : async ()=>{

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
                  label: 'our hardcoded red triangle shaders',
                  code: `


            

                    struct Transfer {
                        @builtin(position) posi: vec4f,
                        @location(0) color: vec4f
                    };

                    @vertex fn vs(
                      @builtin(vertex_index) vi : u32
                    ) -> Transfer {
                      let pos = array(
                        vec2f( 0.0,  0.5),  // top center
                        vec2f(-0.5, -0.5),  // bottom left
                        vec2f( 0.5, -0.5)   // bottom right
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

    } ,

];

export { functions_entries};
export default functions_entries; 