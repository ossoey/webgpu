
let element = {coco:1, bebe:2};


async function main() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
      fail('need a browser that supports WebGPU');
      return;
    }
  
    // Get a WebGPU context from the canvas and configure it
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('webgpu');
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device,
      format: presentationFormat,
    });
  
    const module = device.createShaderModule({
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
  
    const pipeline = device.createRenderPipeline({
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
          // view: <- to be filled out when we render
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };
  
    function render() {
      // Get the current texture from the canvas context and
      // set it as the texture to render to.
      renderPassDescriptor.colorAttachments[0].view =
          context.getCurrentTexture().createView();
  
      const encoder = device.createCommandEncoder({ label: 'our encoder' });
      const pass = encoder.beginRenderPass(renderPassDescriptor);
      pass.setPipeline(pipeline);
      pass.draw(3);  // call our vertex shader 3 times
      pass.end();
  
      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const canvas = entry.target;
        const width = entry.contentBoxSize[0].inlineSize;
        const height = entry.contentBoxSize[0].blockSize;
        canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));
        canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));
        // re-render
       
      }
    });
    observer.observe(canvas);
   
  }

  async function main1() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
      fail('need a browser that supports WebGPU');
      return;
    }
  
    // Get a WebGPU context from the canvas and configure it
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('webgpu');
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device,
      format: presentationFormat,
    });
  
    const module = device.createShaderModule({
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
          return vec4f(1, 1, 0, 1);
        }
      `,
    });
  
    const pipeline = device.createRenderPipeline({
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
          // view: <- to be filled out when we render
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };
  
    function render() {
      // Get the current texture from the canvas context and
      // set it as the texture to render to.
      renderPassDescriptor.colorAttachments[0].view =
          context.getCurrentTexture().createView();
  
      const encoder = device.createCommandEncoder({ label: 'our encoder' });
      const pass = encoder.beginRenderPass(renderPassDescriptor);
      pass.setPipeline(pipeline);
      pass.draw(3);  // call our vertex shader 3 times
      pass.end();
  
      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      requestAnimationFrame(render);
    }

     requestAnimationFrame(render);

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const canvas = entry.target;
        const width = entry.contentBoxSize[0].inlineSize;
        const height = entry.contentBoxSize[0].blockSize;
        canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));
        canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));
        // re-render
      
      }
    });
    observer.observe(canvas);
   
  }
  
  function fail(msg) {
    // eslint-disable-next-line no-alert
    alert(msg);
  }
  
  
    

export {element,main,main1};
export default element; 