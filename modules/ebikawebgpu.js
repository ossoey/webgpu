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


let EbkWebGPU = Ebk.WEBGPU

export {EbkWebGPU}
export default EbkWebGPU;