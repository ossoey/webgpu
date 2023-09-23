 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
const Ebk = {};

Ebk.isNumber = (value) =>{
    if  ( (typeof value === 'number' && !isNaN(value))) return true
    else return false;
}

Ebk.isArray = (value) =>{
    if  (Array.isArray(value)) return true
    else return false;
}

Ebk.isArrayOfNumbers = (value) =>{
    let   isAllNumbers = true; 

    if(!Ebk.isArray(value)){
        return false;
    } else {

        let ndx = 0;

        while ((ndx < value.length)&&(isAllNumbers)) {

            if (!(typeof value[ndx] === `number`))  isAllNumbers = false;
            ndx++;
        }

        return isAllNumbers;
    }

}

Ebk.isMatrixOfNumbers = (value) =>{
    let   isAllNumbers = true; 

    if(!Ebk.isArray(value)){
        return false;
    } else { 

        let ndx = 1;
        let arrLength = value[0].length;
        isAllNumbers = Ebk.isArrayOfNumbers(value[0]);
          
        while ((ndx < value.length)&&(isAllNumbers)) {

            isAllNumbers = Ebk.isArrayOfNumbers(value[ndx]);
            if((value[ndx].length !==value[ndx].length)){
                isAllNumbers = false;
            }
            
            ndx++;
        }

        return isAllNumbers;
    }

}

Ebk.isMatrixClusterOfNumbers = (cluster) =>{
  let isAllNumber = true;

  let ndx = 0;
  while(isAllNumber && ndx < cluster.length){

    isAllNumber = Ebk.isMatrixOfNumbers(cluster[ndx]);
    ndx++;
  }
  
  return isAllNumber;
}   

Ebk.isObject = (value) =>{
    if  ((value instanceof Object && value !== null)) return true
    else return false;
}

Ebk.isInObject = (prop,obj) =>{
    if  (obj.hasOwnProperty(prop)) return true
    else return false;
}


Ebk.isFunction=(flow =(x)=>{return 2*x })=>{
      
    if ((!( typeof flow ==='function'))){
        return false;
    } else {
        return true;
    }

}


Ebk.getPublicMethodOfClass  =(instance) => {
    const prototype = Object.getPrototypeOf(instance);
    const methodNames = Object.getOwnPropertyNames(prototype);
  
    return methodNames.filter((methodName) => {
      const method = prototype[methodName];
      return typeof method === "function" && method !== "constructor";
    });
}


Ebk.ObjectName = {};


Ebk.ObjectName.test = (objectName,params ={range:[0.,1.]})=>{

    Object.keys(objectName).forEach(key =>{
        if((key !==`tests`)&&(key !==`test`)){
          console.log(key, `:` ,objectName[key](params));
        }

    });
}

Ebk.ObjectName.tests = (objectName, paramsTestOptions =[
                    `ff`,
                   {},
                   {range:[,]},    
                   {range:[`a`,1.]},
                   {range:[`a`,`2`]},
                   {range:[1,`2`]},
                   {range:[0.,1.]},
                   {range:[0,100],clamp:[0.5,0.51], length:`00`},
                   {range:[0,100],clamp:[-0.2,0.51], length:10},
                   {range:[0,100],clamp:[-0.2,0.51], length:10,clamps:[[0,1],[0.2,0.4],[0.8,0.87]]},
                   {range:[0,100],clamp:[-0.2,0.51], length:10,ranges:[[0.,1.],[23, 60], [-7, 2]]},
                   {range:[0,100],clamp:[-0.2,0.51], length:10,
                   
                    ranges:[[6,1.],[23, 60], [-7, 2]],clamps:[[0,1],[0.2,0.4],[0.8,0.87],[0.8,0.87]]},
                    
                    {range:[0,100],clamp:[-0.2,0.51], length:20,
                     ranges:[[0.,1.],[40, 60], [-7, -14],[102,200]],clamps:[[0,1],[0.2,0.4],[0.8,0.87],[0,1]]},
                     {range:[0,100],clamp:[-0.2,0.51], length:20,
                    ranges:[[0.,1.],[40, 60], [-7, -14],[102,200]],clamps:[[0,1],[0.2,0.4],[0.8,0.87],[0,1]],  arr:[10,1,{a:1},3,'23']},

                    
           ])=>{
     paramsTestOptions.forEach((item,ndx)=>{
        console.log(`<------------------------TEST: #`+ndx+`--------------------------->`);
        console.log(`params:`, item);
        Ebk.ObjectName.test(objectName,item);
    });
}



Ebk.ObjectInstance = {};

Ebk.ObjectInstance.test = (className,params ={path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.3})=>{

 
       let classInstance = new className(params);
       let allFunctions = Ebk.getPublicMethodOfClass(classInstance);
   
       allFunctions.forEach(func =>{
     
        if (!(func===  "constructor"))console.log(func, `:`,  classInstance[func](params));
        
       });
  

}

Ebk.ObjectInstance.tests = (className, paramsTestOptions =[
                  
    {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:-0.3},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:10.58},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.11},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.2},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.85},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.92},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.98},
   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,1,10]],target:0.62},

])=>{
paramsTestOptions.forEach((item,ndx)=>{
console.log(`<------------------------TEST: #`+ndx+`--------------------------->`);
console.log(`params:`, item);
Ebk.ObjectInstance.test(className, item);
});
}


/////// Ebk.Rand 

Ebk.Rand = {};

Ebk.Rand.float = (params={range:[0.,1.]})=>{
    
    if (!(Ebk.isObject(params) )) {
        console.error(`Params is not an object`);
        return null;
    }else {
  
       if (!(Ebk.isInObject(`range`,params))){
            console.error(`Attribut range has to be defined in params this way:[start,end] eg [20, 80]`);
            return null;
       } else {

            if ((! Ebk.isNumber(params.range[0])) ||( !Ebk.isNumber(params.range[1]))) {    
                 console.error(`range values are not numbers `);
                 return null;
            } else {

                return params.range[0]+ Math.random()*( params.range[1] - params.range[0]);
            }            
        }
    }

}

Ebk.Rand.fRange = (params={range:[0.,1.], clamp:[0,1]})=>{
     
    let clampInfo = `Attribut clamp has to be defined in params this way, clamp:[pourcentStart,pourcentEnd] eg clamp:[0.4, 0.7]`;
    //test previous attribut;
    let rand = Ebk.Rand.float(params) ;

     if (!(rand==null)) {
       
       if (!(Ebk.isInObject(`clamp`,params))){
            console.error(clampInfo);
            return null;
        } else {

            if (( !  Ebk.isNumber(params.clamp[0])) ||( !Ebk.isNumber(params.clamp[1]))) {
                console.error(clampInfo);
                return null;
            } else {

                return Ebk.Rand.float({range:[ params.range[0]+ params.clamp[0]*(params.range[1]-params.range[0]) , 
                                                params.range[0]+ params.clamp[1]*(params.range[1]-params.range[0])  
                                            ]});

            }
        }

     } else {
        return null;
     }

}

 Ebk.Rand.iRange = (params={range:[0,1], clamp:[0,1]})=>{
    //check previous attributs 
    let rand = Ebk.Rand.fRange(params) ;
    if (!(rand == null)){
        return  Math.round(rand);
    } else return null; 
  
}

Ebk.Rand.fRanges = (params={ranges:[[0.,1.],[23, 60], [-7, 2]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]})=> {
    
    let rangesClampsInfo = `Attributs ranges or clamps are required. eg ranges:[[0.,1.],[23, 60], [-7, 2]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]. ranges.length == clamps.length `; 
    
    if (!(Ebk.isObject(params) )) {
        console.error(`Params is not an object`);
        return null;
    }else {
  
       if ((!Ebk.isInObject(`ranges`,params))||(!Ebk.isInObject(`clamps`,params))){
        console.error(rangesClampsInfo);
        return null;
       } else {
        if((!Ebk.isArray(params.ranges))||(!Ebk.isArray(params.clamps))||(params.ranges.length!=params.clamps.length)){
            console.error(rangesClampsInfo);
            return null;
        } else {

            for (let i=0; i<params.ranges.length;i++){
                if (((!Ebk.isNumber(params.ranges[i][0]))||(!Ebk.isNumber(params.ranges[i][1])))||
                ((!Ebk.isNumber(params.clamps[i][0]))||(!Ebk.isNumber(params.clamps[i][1])))){
                 console.error(rangesClampsInfo);
                 return null;
             } 
            }
      

           let pickRangeIndex = Ebk.Rand.iRange({range:[0, params.ranges.length-1],clamp:[0,1]}); 
           return Ebk.Rand.fRange({range:params.ranges[pickRangeIndex],clamp:params.clamps[pickRangeIndex]});
        }
      
       }

    }

}

Ebk.Rand.iRanges = (params={ranges:[[0.,1.],[23, 60], [-7, 2]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]]})=>{
    //check previous attributs 
    let rand = Ebk.Rand.fRanges(params) ;
    if (!(rand == null)){
        return  Math.round(rand);
    } else return null; 
  
}

Ebk.Rand.fRangeArray = (params={range:[0,1], clamp:[0,1], length:10})=>{
    let lengthInfo = `Attribut length has to be defined in params this way, length:number eg length:10`;
    //check previous attributs 
    let rand = Ebk.Rand.fRange(params) ;
    if (!(rand == null)){

        if (!(Ebk.isInObject(`length`,params))){
            console.error(lengthInfo);
            return null;
        } else{

            if (!(Ebk.isNumber(params.length)) ){
                console.error(lengthInfo);
                return null;
            } else{

                let arr = [];
                for(let i = 0; i<params.length;i++){
                    arr.push(Ebk.Rand.fRange(params));
                }
    
                return arr;
            }

        }
    } else return null; 
  
}

Ebk.Rand.iRangeArray = (params={range:[0,1], clamp:[0,1], length:10})=>{
    let lengthInfo = `Attribut length has to be defined in params this way, length:number eg length:10`;
    //check previous attributs 
    let rand = Ebk.Rand.iRange(params) ;
    if (!(rand == null)){

        if (!(Ebk.isInObject(`length`,params))){
            console.error(lengthInfo);
            return null;
        } else{

            if (!(Ebk.isNumber(params.length)) ){
                console.error(lengthInfo);
                return null;
            } else{

                let arr = [];
                for(let i = 0; i<params.length;i++){
                    arr.push(Ebk.Rand.iRange(params));
                }
    
                return arr;
            }

        }
    } else return null; 
  
}

Ebk.Rand.fRangesArray = (params={ranges:[[0.,1.],[23, 60], [-7, 2]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]], length:10})=>{
    let lengthInfo = `Attribut length has to be defined in params this way, length:number eg length:10`;
    //check previous attributs 
    let rand = Ebk.Rand.fRanges(params) ;

    if (!(rand == null)){

        if (!(Ebk.isInObject(`length`,params))){
            console.error(lengthInfo);
            return null;
        } else{

            if (!(Ebk.isNumber(params.length)) ){
                console.error(lengthInfo);
                return null;
            } else{

                let arr = [];
                for(let i = 0; i<params.length;i++){
                    arr.push(Ebk.Rand.fRanges(params));
                }
    
                return arr;
            }

        }
    } else return null; 
  
}

Ebk.Rand.iRangesArray = (params={ranges:[[0.,1.],[23, 60], [-7, 2]], clamps:[[0,1],[0.2,0.4],[0.8,0.87]], length:10})=>{
    let lengthInfo = `Attribut length has to be defined in params this way, length:number eg length:10`;
    //check previous attributs 
    let rand = Ebk.Rand.iRanges(params) ;

    if (!(rand == null)){

        if (!(Ebk.isInObject(`length`,params))){
            console.error(lengthInfo);
            return null;
        } else{

            if (!(Ebk.isNumber(params.length)) ){
                console.error(lengthInfo);
                return null;
            } else{

                let arr = [];
                for(let i = 0; i<params.length;i++){
                
                    arr.push(Ebk.Rand.iRanges(params));
                }
    
                return arr;
            }

        }
    } else return null; 
  
}

Ebk.Rand.mixNdx = (params={length:10})=>{
     let lengthInfo = `Attribut length has to be defined in params this way, length:number eg length:10`;

     let arrNDX = [], arrNDXOut = [];

    if (!(Ebk.isObject(params))){

        console.error(lengthInfo);
        return null; 

    } else{

        if (!(Ebk.isInObject(`length`,params))){
            console.error(lengthInfo);
            return null;
        } else{

            if (!(Ebk.isNumber(params.length)) ){
                console.error(lengthInfo);
                return null;
            } else{

                for(let i=0;i<params.length; i++){
                    arrNDX.push(i);
                 }
            
                 while (arrNDX.length>1){
                    let ndx = Ebk.Rand.iRanges({ranges:[[0,arrNDX.length-1]], clamps:[[0,1]]});
                    arrNDXOut.push(arrNDX[ndx]);
                    arrNDX.splice(ndx, 1);            
                 }
            
                 arrNDXOut.push(arrNDX[0]);
            
                
                 return arrNDXOut;

            }

        }

    }
   
}    

Ebk.Rand.mixArr = (params={arr:[10,1,{a:1},3,'23']})=>{
    let arrInfo = `Attribut arr has to be defined in params this way, arr:[a1,a2,..,an] eg  arr:[10,1,{a:1},3,'23']`;

   if (!(Ebk.isObject(params))){

       console.error(arrInfo);
       return null; 

   } else{

       if (!(Ebk.isInObject(`arr`,params))){
           console.error(arrInfo);
           return null;
       } else{

           if (!(Ebk.isArray(params.arr)) ){
               console.error(arrInfo);
               return null;
           } else{

                let mixedNdx = Ebk.Rand.mixNdx ({length:params.arr.length}),arrOut = [];                
                mixedNdx.forEach((item)=>{
                    arrOut.push(params.arr[item]);
                });
               
                return arrOut;
           }

       }

   }
}    

Ebk.Rand.test = (params ={range:[0.,1.]})=>{

    Object.keys(Ebk.Rand).forEach(key =>{
        if((key !==`tests`)&&(key !==`test`)){
          console.log(key, `:` ,Ebk.Rand[key](params));
        }

    });
}

Ebk.Rand.tests = (paramsTestOptions =[
                    `ff`,
                   {},
                   {range:[,]},    
                   {range:[`a`,1.]},
                   {range:[`a`,`2`]},
                   {range:[1,`2`]},
                   {range:[0.,1.]},
                   {range:[0,100],clamp:[0.5,0.51], length:`00`},
                   {range:[0,100],clamp:[-0.2,0.51], length:10},
                   {range:[0,100],clamp:[-0.2,0.51], length:10,clamps:[[0,1],[0.2,0.4],[0.8,0.87]]},
                   {range:[0,100],clamp:[-0.2,0.51], length:10,ranges:[[0.,1.],[23, 60], [-7, 2]]},
                   {range:[0,100],clamp:[-0.2,0.51], length:10,
                   
                    ranges:[[6,1.],[23, 60], [-7, 2]],clamps:[[0,1],[0.2,0.4],[0.8,0.87],[0.8,0.87]]},
                    
                    {range:[0,100],clamp:[-0.2,0.51], length:20,
                     ranges:[[0.,1.],[40, 60], [-7, -14],[102,200]],clamps:[[0,1],[0.2,0.4],[0.8,0.87],[0,1]]},
                     {range:[0,100],clamp:[-0.2,0.51], length:20,
                    ranges:[[0.,1.],[40, 60], [-7, -14],[102,200]],clamps:[[0,1],[0.2,0.4],[0.8,0.87],[0,1]],  arr:[10,1,{a:1},3,'23']},

                    
           ])=>{
     paramsTestOptions.forEach((item,ndx)=>{
        console.log(`<------------------------TEST: #`+ndx+`--------------------------->`);
        console.log(`params:`, item);
        Ebk.Rand.test(item);
    });
}

/////// Ebk.Matrix 

Ebk.Matrix = {};

Ebk.Matrix.arrLoadElementNtimes =(elt,times) => {
    let arr = [];

     for(let i=0;i<times; i++){
        arr.push(elt);
     }
    return      arr;
}

Ebk.Matrix.arrGetSubarray =(arr = [1,2,3,4,5,6,7,8,9], fromIndex = 2, toIndex = 5 ) => {
    return      arr.slice(fromIndex, toIndex+1);
}

Ebk.Matrix.arrGetSubarrayWithoutIndex =(arr = [1,2,3,4,5,6,7,8,9], withoutIndex = 2) => {

    if (withoutIndex < 0 || withoutIndex >= arr.length) {  
        return arr.slice();
      }
      
      // Create a subarray before the index and after the index, then concatenate them
      return arr.slice(0,withoutIndex).concat(arr.slice(withoutIndex + 1));

}

Ebk.Matrix.vectAdd = (params ={v1:[3,1,4],v2:[5,3,-8]}) =>{

    let vectorsInfo = `v1 and v2 have to be define as array with the same type of numbers and same length, eg v1:[3,1,4],v2:[5,3,-8] `;

    let vectResult = [];
    if(!Ebk.isObject(params)){
        console.error(vectorsInfo)
        return null;
    } else {

        if((!Ebk.isArray(params.v1))||(!Ebk.isArray(params.v2))||(params.v1.length!=params.v2.length)){
            console.error(vectorsInfo)
            return null;
        } else {
                
                params.v1.forEach((item,ndx)=>{
                    vectResult.push(0);
                    if((! Ebk.isNumber(params.v1[ndx]))||(! Ebk.isNumber(params.v2[ndx]))){
                        console.error(vectorsInfo);
                        return null;
                    } 
                });

                params.v1.forEach((item,ndx)=>{
                    vectResult[ndx] = item + params.v2[ndx];
                });


                 return vectResult;
        }

    }
}


Ebk.Matrix.vectScale = (params ={v:[5,3,-8], scalar:0.5}) =>{

    let vectorsInfo = `v(array) and scalar(number) have to be define , eg {v:[5,3,-8], scalar:0.5} `;

    let vectResult = [];
    if(!Ebk.isObject(params)){
        console.error(vectorsInfo)
        return null;
    } else {

        if((!Ebk.isArray(params.v))||(!Ebk.isNumber(params.scalar))){
            console.error(vectorsInfo)
            return null;
        } else {
                
                params.v.forEach((item,ndx)=>{
                    vectResult.push(1);
                    if((! Ebk.isNumber(params.v[ndx]))){
                        console.error(vectorsInfo);
                        return null;
                    } 
                });

                params.v.forEach((item,ndx)=>{
                    vectResult[ndx] = item*params.scalar;
                });

                 return vectResult;
        }

    }
}

Ebk.Matrix.vector = (params ={v1:[3,1,4],v2:[5,3,-8]}) =>{
    return Ebk.Matrix.vectAdd({v1:params.v2, v2: Ebk.Matrix.vectScale({v:params.v1,scalar:-1})});
}

//Return some vecteur in a base(matrix) stretched by coords
Ebk.Matrix.linearCombination = (params ={ matrix:[[3,1,4],[5,3,-8]],scalars:[0.5,0.1]}) =>{

    let resultVector = [];

    let linearCombinationChecker =`matrix and coords have to be defined. coords.length == matrix.length, all matrix vectors length have to be equals { matrix:[[3,1,4],[5,3,-8]],coords:[0.5,0.]}`;

    if(!Ebk.isObject(params)){
        console.error(linearCombinationChecker);
        return null;
    } else {

        if((!Ebk.isMatrixOfNumbers(params.matrix))||(!Ebk.isArrayOfNumbers(params.scalars))){
            console.error(linearCombinationChecker);
            return null;
        } else {

            if(!(params.matrix.length === params.scalars.length)){
                console.error(linearCombinationChecker);
                return null;
            } else {

                params.matrix[0].forEach(item=>{
                    resultVector.push(0);
                });

                params.matrix.forEach((item,ndx)=>{

                    resultVector  =   Ebk.Matrix.vectAdd({v1:resultVector,v2: Ebk.Matrix.vectScale({v:item,scalar:params.scalars[ndx]})}); 
                });

                return resultVector;
              
            }
        }

    }
}

Ebk.Matrix.dotProduct = (params ={v1:[3,1,4],v2:[5,3,-8]}) =>{

    let vectorsInfo = `v1 and v2 have to be define as array with the same type of numbers and same length, eg v1:[3,1,4],v2:[5,3,-8] `;

    let vectResult = 0;
    if(!Ebk.isObject(params)){
        console.error(vectorsInfo)
        return null;
    } else {

        if((!Ebk.isArray(params.v1))||(!Ebk.isArray(params.v2))||(params.v1.length!=params.v2.length)){
            console.error(vectorsInfo)
            return null;
        } else {
                
                params.v1.forEach((item,ndx)=>{
                     
                    if((! Ebk.isNumber(params.v1[ndx]))||(! Ebk.isNumber(params.v2[ndx]))){
                        console.error(vectorsInfo);
                        return null;
                    } 
                });

                params.v1.forEach((item,ndx)=>{
                    vectResult += item*params.v2[ndx];
                });


                 return vectResult;
        }

    }
}

Ebk.Matrix.magnitude = (params ={v:[5,3,-8]}) =>{

    let vectorsInfo = `v(array) has to be define , eg {v:[5,3,-8]} `;

    let result = 0;
    if(!Ebk.isObject(params)){
        console.error(vectorsInfo)
        return null;
    } else {

        if((!Ebk.isArray(params.v))){
            console.error(vectorsInfo)
            return null;
        } else {
                
                params.v.forEach((item,ndx)=>{
                
                    if((! Ebk.isNumber(params.v[ndx]))){
                        console.error(vectorsInfo);
                        return null;
                    } 
                });

                params.v.forEach((item,ndx)=>{
                    result += Math.pow(item,2);
                });

                 return Math.sqrt(result);
        }

    }
}

Ebk.Matrix.distance = (params ={v1:[3,1,4],v2:[5,3,-8]}) =>{
    return  Ebk.Matrix.magnitude( {v:Ebk.Matrix.vector({v1:params.v1, v2:params.v2 }) } );
}

Ebk.Matrix.add = (params ={ m1:[[3,1],[5,3]],m1:[[5,14],[1,7]]}) => {

    let vectorsInfo = `m1 and m2 have to be defined. eg { m1:[[3,1],[5,3]],m1:[[5,14],[1,7]]} `;
    
    let mxResult = [];
    if(!Ebk.isObject(params)){
        console.error(vectorsInfo);
        return null;
    } else {

        if(! (Ebk.isMatrixOfNumbers(params.m1))||(!(Ebk.isMatrixOfNumbers(params.m2)))
        ||(!(params.m1.length ===params.m2.length ))) {

            console.error(vectorsInfo);
            return null;
        } else {

            params.m1.forEach((item,ndx)=>{
                mxResult.push(Ebk.Matrix.vectAdd({v1:item,v2:params.m2[ndx]}));
            })

        
            return mxResult;
        }


    }
   
}

Ebk.Matrix.mult = (params ={ m1:[[3,1],[5,3]],m2:[[5,14],[1,7]]}) => {

    let vectorsInfo = `m1 and m2 have to be defined , eg m1:[[3,1],[5,3]],m2:[[5,14],[1,7]] `;

    let mtxResult = [];
    if(!Ebk.isObject(params)){
        console.error(vectorsInfo)
        return null;
    } else {
        if(! (Ebk.isMatrixOfNumbers(params.m1))||(!(Ebk.isMatrixOfNumbers(params.m2)))
        ||(!(params.m1.length ===params.m2.length ))) {

            console.error(vectorsInfo);
            return null;
        } else {

            params.m2.forEach((item)=>{
                mtxResult.push(Ebk.Matrix.linearCombination({matrix: params.m1,scalars:item}));
            })

            return mtxResult;
        }

    }
   
}

Ebk.Matrix.addMatrices = (params ={ matrices:[ [[3,1],[5,3]], [[3,1],[5,3]], [[5,14],[1,7]]]}) => {

    let info = `matrices has to be defined. eg : { matrices:[ [[3,1],[5,3]], [[3,1],[5,3]], [[5,14],[1,7]]]} `;

    let result;
    if(!Ebk.isObject(params)){
        console.error(info)
        return null;
    } else {

       if (!Ebk.isInObject(`matrices`,params)){
            console.error(info)
            return null;

       } else {

            if (!Ebk.isMatrixClusterOfNumbers(params.matrices)){
                console.error(info)
                return null;
            } else {
            
                result = Ebk.Matrix.add({m1:params.matrices[0],m2:params.matrices[1]});

                let ndx = 2;

                while(ndx<params.matrices.length){

                    result = Ebk.Matrix.add({m1: result,m2:params.matrices[ndx]});
                    ndx++;
                }

                return result;
            }

       }

    }
   
}

Ebk.Matrix.multMatrices = (params ={ matrices:[ [[3,1],[5,3]], [[3,1],[5,3]], [[5,14],[1,7]]]}) => {

    let info = `matrices has to be defined. eg : { matrices:[ [[3,1],[5,3]], [[3,1],[5,3]], [[5,14],[1,7]]]} `;

    let result;
    if(!Ebk.isObject(params)){
        console.error(info)
        return null;
    } else {

        if (!Ebk.isInObject(`matrices`,params)){
             console.error(info)
             return null;
 
        } else {
 
             if (!Ebk.isMatrixClusterOfNumbers(params.matrices)){
                 console.error(info)
                 return null;
             } else {
             
                 result = Ebk.Matrix.mult({m1:params.matrices[0],m2:params.matrices[1]});
 
                 let ndx = 2;
 
                 while(ndx<params.matrices.length){
 
                     result = Ebk.Matrix.mult({m1: result,m2:params.matrices[ndx]});
                     ndx++;
                 }
 
                 return result;
             }
 
        }
 
     }
   
}

Ebk.Matrix.determinant2D = (params ={ matrix:[[3,1],[5,3]]}) =>{


    let info =`2D matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {
       if(!Ebk.isInObject(`matrix`, params)) {
            console.error(info);
            return null;

       } else {

            if(!Ebk.isMatrixOfNumbers(params.matrix)){
                console.error(info);
                return null;
            } else {
                if (!(params.matrix[0].length == 2)){
                    console.error(info);
                    return null;  
                } else {
                    return  params.matrix[0][0]*params.matrix[1][1] -   params.matrix[0][1]*params.matrix[1][0]
                }
            }

       }
 

    }
}

Ebk.Matrix.subHeadMatrix = (params ={ matrix:[[3,1,5],[5,3,-9],[5,3,-9]], headNdx :1}) =>{


    let info =`matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {
       if((!Ebk.isInObject(`matrix`, params))||(!Ebk.isInObject(`headNdx`, params))){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))||(!Ebk.isNumber(params.headNdx))){
                console.error(info);
                return null;
            } else {
                    
                let result = [];


                    let ndx_ = 0
                    while (ndx_ < params.matrix.length){

                        if (ndx_ !== params.headNdx) {

                     
                             result.push(Ebk.Matrix.arrGetSubarray(params.matrix[ndx_], 1,params.matrix[ndx_].length-1 ));
                        }

                        ndx_ ++;
                    }
               

                 return result;


            }

       }
 
    }
}

Ebk.Matrix.subMatrix = (params ={ matrix:[[3,1,5],[5,3,-9],[5,3,-9]], colNdx :1,rowNdx:2}) =>{


    let info =`matrix,colNdx,rowNdx have to be defined. eg ={ matrix:[[3,1],[5,3]] ,colNdx :1,rowNdx:2}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {
       if((!Ebk.isInObject(`matrix`, params))||(!Ebk.isInObject(`colNdx`, params))||(!Ebk.isInObject(`rowNdx`, params))){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))||(!Ebk.isNumber(params.colNdx))||(!Ebk.isNumber(params.rowNdx))){
                console.error(info);
                return null;
            } else {
                    
                if((! ((params.colNdx >=0) && (params.colNdx <params.matrix.length)))||(! ((params.rowNdx >=0) && (params.rowNdx <params.matrix.length)))){
                    console.error(info);
                    return null;
                } else {

                  let result = [];

                    let ndx_ = 0
                    while (ndx_ < params.matrix.length){

                        if (ndx_ !== params.colNdx) {
                     
                             result.push( Ebk.Matrix.arrGetSubarrayWithoutIndex (params.matrix[ndx_], params.rowNdx) );
                        }

                        ndx_ ++;
                    }
               

                 return result;                  
                }




            }

       }
 
    }
}
Ebk.Matrix.subMatrices = (params ={ matrix:[[3,1,5],[5,3,-9],[5,3,-9]]}) =>{


    let info =`matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {
       if((!Ebk.isInObject(`matrix`, params)) ){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))){
                console.error(info);
                return null;
            } else {
                    
                let result = [];
               
                  for(let col = 0; col<params.matrix.length; col++) {
                      let colValues = [];
                    for(let row = 0; row<params.matrix.length; row++) {

                        colValues.push(Ebk.Matrix.subMatrix({matrix:params.matrix, colNdx:col, rowNdx:row}));
                    }  

                    result.push(colValues);

                  }
                
                 return result;

            }

       }
 
    }
}

Ebk.Matrix.subCofactor = (params ={ matrix:[[3,1,5],[5,3,-9],[5,3,-9]], colNdx :1,rowNdx:2}) =>{

    let info =`matrix,colNdx,rowNdx have to be defined. eg ={ matrix:[[3,1],[5,3]] ,colNdx :1,rowNdx:2}`;

    let subMatrix = Ebk.Matrix.subMatrix (params);
   
    if  (subMatrix==null){
        console.error(info);
        return null;
    }  else {

        return  Math.pow(-1,params.colNdx +params.rowNdx)*Ebk.Matrix.determinant( {matrix:subMatrix} ); 
    }

}

Ebk.Matrix.cofactor = (params ={ matrix:[[3,1,5],[5,3,-9],[5,3,-9]]}) =>{


    let info =`matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {
       if((!Ebk.isInObject(`matrix`, params)) ){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))){
                console.error(info);
                return null;
            } else {
                    
                let result = [];
               
                  for(let col = 0; col<params.matrix.length; col++) {
                      let colValues = [];
                    for(let row = 0; row<params.matrix.length; row++) {

                        colValues.push(Ebk.Matrix.subCofactor({matrix:params.matrix, colNdx:col, rowNdx:row}));
                    }  

                    result.push(colValues);

                  }
                
                 return result;

            }

       }
 
    }
}

Ebk.Matrix.adj = (params ={ matrix:[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,22,24,25]]}) =>{

    let info =`matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {

        if((!Ebk.isInObject(`matrix`, params))){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))){
                console.error(info);
                return null;
            } else {
        

                let result = [];

                for(let row = 0;row<params.matrix.length; row++){
                    let colValues = [];
                    for(let col = 0;col<params.matrix.length; col++){

                       colValues.push( params.matrix[col][row]);
             
                    }

                    result.push(colValues);
                   
                }
                
      
               
               return result;
          
            }
       }
  
    }

}

Ebk.Matrix.determinant = (params ={ matrix:[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,22,24,25]]}) =>{

    let info =`matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {

        if((!Ebk.isInObject(`matrix`, params))){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))){
                console.error(info);
                return null;
            } else {
        
                let matrix =params.matrix;
    
                let obj ={};
            
                obj.det = (mat) =>{
                    let sum = 0;
                    let result =[];

                    if(mat.length >= 3 ) {
                        
                      
                        for(let vecNdx =0;vecNdx< mat.length;vecNdx++) {
            
                            result.push(  Math.pow(-1,vecNdx)*mat[vecNdx][0]*obj.det(Ebk.Matrix.subHeadMatrix({matrix:mat, headNdx:vecNdx})));
                        }
            
                        result.forEach(value =>{
                            sum+=value;
                        })
            
                        return sum ;
                                     
                    }
                    else if(mat.length ==2) {
            
                        return  mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0];
            
                    }
                }
               
               return obj.det(matrix);
          
            }
       }
  
    }

}
Ebk.Matrix.inverse = (params ={ matrix:[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,22,24,25]]}) =>{

    let info =`matrix has to be defined. eg ={ matrix:[[3,1],[5,3]]}`;

    if(!Ebk.isObject(params)){
        console.error(info);
        return null;
    } else {

        if((!Ebk.isInObject(`matrix`, params))){  
            console.error(info);
            return null;

       } else {

            if((!Ebk.isMatrixOfNumbers(params.matrix))){
                console.error(info);
                return null;
            } else {
        
                let det = Ebk.Matrix.determinant({matrix:params.matrix});

                if (det == 0){
                    console.error('Determinant = 0');
                }
                else {

                    let adj =  Ebk.Matrix.adj({matrix:Ebk.Matrix.cofactor({matrix:params.matrix})});
                    
                    let result = [];

                    adj.forEach((vector, vectorNdx)=>{
                        result.push(Ebk.Matrix.vectScale({v:vector,scalar:1/det}));
                    });

                    
                    return result;
                }
          
            }
       }
  
    }

}
Ebk.Matrix.testInverse = (params ={ matrix:[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,22,24,25]]}) =>{
    let matrix = params.matrix; 
    let inverse = Ebk.Matrix.inverse({matrix:params.matrix});
    return { matrix, inverse, 
            text1: Ebk.Matrix.multMatrices({matrices:[matrix,inverse]}),  text2: Ebk.Matrix.multMatrices({matrices:[matrix,inverse]})   }
}

 Ebk.Matrix.determinant1 = ( ) =>{
   let matrix =[[16,17,18],[1,2,3],[6,7,8] ]
   // let matrix =[[-2,-1,2],[2,1,0],[-3,3,-1]]
    //let matrix =[[2,-1,2],[5,2,1],[0,3,-2]]
  //  let matrix = [[1,2,-1,2],[ 0,5,2,1],[4,0,3,-2],[-6,3,5,3]]; //  [[1,2,8],[6,7,9],[4,3,5]]
    //let matrix = [[2,0,0,0],[1,-1,0,0],[0,0,2,0 ],[-3,1,-5,1]]; //  [[1,2,8],[6,7,9],[4,3,5]]


  
    let obj ={};

   
   
    obj.det = (mat) =>{
         let result =[] 
         let sum = 0; 
        
        if(mat.length >=  3) {
            
          
            
            for(let vecNdx =0;vecNdx< mat.length;vecNdx++) {

                result.push(  Math.pow(-1,vecNdx)*mat[vecNdx][0]*obj.det(Ebk.Matrix.subHeadMatrix({matrix:mat, headNdx:vecNdx})));
            }

            result.forEach(value =>{
                sum+=value;
            })


            return sum ;
                         
        }
        else   {

            return  mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0];

        }
    }
   
         
 
   return obj.det(matrix);
 

 }

Ebk.Matrix.test = (params ={range:[0.,1.]})=>{

    Object.keys(Ebk.Matrix).forEach(key =>{
        if((key !==`tests`)&&(key !==`test`)&&(key !==`arrGetSubarray`)&&(key !==`arrGetSubarrayWithoutIndex`))   {
          console.log(key, `:` ,Ebk.Matrix[key](params));
        }

    });
}

Ebk.Matrix.tests = (paramsTestOptions =[
                  
                   {},
                   {v1:[3,1]},    
                   {v2:[5,3]},
                   {v1:[3,1,1],v2:[5,3]},
                   {v1:[3,`1`],v2:[5,3]},
                   {v1:[3,1],v2:[5,6]},
                   {v1:[3,1,9,20],v2:[5,6,10,-1]},
                   {v:[3,1,9,`20`],scalar:0.5},
                   {v1:[2,1],v2:[-1,2]},
                   {v1:[1,0],v2:[0,1]},
                   { matrix:[[1,2,3],[1,0,2]],scalars:[1,-2], headNdx :0,}, 
                   { matrix:[[1,2,3],[3,5,1],[0,0,8]],scalars:[-1,1,-1/2],  headNdx :0,
                    matrices:[ [[3,1],[5,3]], [[3,1],[5,3]], [[5,14],[1,7]]]
                },
                   {m2:[[1,3],[2,4]],m1:[[2,1],[0,2]]}
           ])=>{
     paramsTestOptions.forEach((item,ndx)=>{
        console.log(`<------------------------TEST: #`+ndx+`--------------------------->`);
        console.log(`params:`, item);
        Ebk.Matrix.test(item);
    });
}

/////// Ebk.Trajectory

Ebk.Trajectory = class EbkTrajectory{
    #params;
    #infos;
    constructor(params ={path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]]}){

        this._update(  params);
    }

    _update(params ={path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]]}){
        let info =`path has to be defined. eg {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]]}`;

        if(!Ebk.isObject(params)){
            console.error(info);
            return null;
        } else {
           if((!Ebk.isInObject(`path`, params))){  
                console.error(info);
                return null;
    
           } else {
    
                if((!Ebk.isMatrixOfNumbers(params.path))){
                    console.error(info);
                    return null;
                } else {
                    this.#params = params;
                    this.#computeInfos();
                    
                }
             } 
        }
    }

    #computeDistances(){
        this.#infos = {};
        this.#infos.distances = [];
        this.#infos.distances.push( 0);
        this.#infos.cumulativeDistances = [];
        this.#infos.cumulativeDistances.push( 0);
        let cumulativeDistance = 0;
        this.#params.path.forEach((item,ndx)=>{
            if (ndx >0){
                let distance = Ebk.Matrix.distance({v1:this.#params.path[ndx-1],v2:this.#params.path[ndx]});
                this.#infos.distances.push( distance );
                cumulativeDistance+= distance;
                this.#infos.cumulativeDistances.push(cumulativeDistance);
            }
        });
    }

    #computeRatios(){
        
        this.#infos.ratios = [];
        this.#infos.cumulativeDistances.forEach((item,ndx)=>{
      
                this.#infos.ratios.push(  this.#infos.cumulativeDistances[ndx] /this.#infos.cumulativeDistances[this.#infos.cumulativeDistances.length-1]);
         
        });
    }

    #computeInfos(){
        this.#computeDistances();
        this.#computeRatios();  
    }

    #locateInterval(params ={target:0.3}){


       if (params.target<= this.#infos.ratios[0]){
         return [0,0];
       } else  if (params.target>= this.#infos.ratios[this.#infos.ratios.length-1]){
         return [this.#infos.ratios.length-1,this.#infos.ratios.length-1];
       } else {
     
            let intervalNdx = 1;
            while( (params.target > this.#infos.ratios[intervalNdx])){

               intervalNdx++;
            }    

            return [intervalNdx-1,intervalNdx];
        }
    }

    #locateIntervalRatio(target,interval=[0,1]){

        let targetRatioSize = target -  this.#infos.ratios[interval[0]];
        
        return targetRatioSize /(this.#infos.ratios[interval[1]] -this.#infos.ratios[interval[0]])
 
     }
 
     locate(params ={target:0.3}){

        let info =`target has to be defined . eg {target: 0.4}`;

        if(!Ebk.isObject(params)){
            console.error(info);
            return null;
        } else {
           if((!Ebk.isInObject(`target`, params))){  
                console.error(info);
                return null;
    
           } else {
    
                if((!Ebk.isNumber(params.target))){
                    console.error(info);
                    return null;
                } else {
                       
                  let interval =   this.#locateInterval(params);

                  if (interval[0] == interval[1]){
                     return this.#params.path[interval[1]];
                  } else {
                    
                       let intervalVector =  Ebk.Matrix.vector({v1:this.#params.path[interval[0] ],v2:this.#params.path[interval[1]]});
                       let intervalVectorScaled = Ebk.Matrix.vectScale({v:intervalVector,scalar:this.#locateIntervalRatio(params.target,interval), interval });
                       this.position = Ebk.Matrix.vectAdd({v1:this.#params.path[interval[0]],v2:intervalVectorScaled});
                     return     this.position;

                  }
   
                }
            
           } 
        }
    
    }

    _updateAndLocate(params ={path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.3}){
        this._update(params);
        return this.locate(params);
    }

    
};

Ebk.TrajectoryTests = {};

Ebk.TrajectoryTests.test = (params ={path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.3})=>{
   
    Ebk.ObjectInstance.test( Ebk.Trajectory,params);
}

Ebk.TrajectoryTests.tests = (paramsTestOptions =[
                  
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:-0.3},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:10.58},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.11},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.2},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.85},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.92},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.98},
                   {path:[[1,2,3],[-2,2,3],[5,1,6],[0,1,10]],target:0.62},
                
           ])=>{

  
    Ebk.ObjectInstance.tests(Ebk.Trajectory,paramsTestOptions );
}


/////// Ebk.ERythm 

Ebk.ERythm = {};

/////// Ebk.ERythm.Linear
Ebk.ERythm.Linear = class EbkERythmLinear {
    #params;
    #infos;
    constructor(params ={flow:(x)=>{return 2*x; }, granularity:10,messy:[-1,1]}){

        this._update(params);
    }

    

    _update(params ={flow:(x)=>{return 2*x; }, granularity:10,messy:[-1,1]}){
        let info =`  granularity and messy have to be defined. eg params ={flow:(x)=>{return 2*x; }, granularity:10,messy:[-1,1]}`;

        if(!Ebk.isObject(params)){
            console.error(info);
            return null;
        } else {

            if ((!(this.isflowRight(params.flow)))||(!(Ebk.isInObject('granularity',params)))||(!(Ebk.isInObject('messy',params)))){
                console.error(info);
                return null;
            } else{
                if((!(Ebk.isNumber(params.granularity)))||(!(Ebk.isArrayOfNumbers(params.messy)))){
                    console.error(info);
                    return null;
                } else {
                    this.#params = params;
                    this.#infos = {};
                    this.#infos.domain = [1,10];
                    this.#infos.codomain = [this.#params.flow(this.#infos.domain[0]),this.#params.flow(this.#infos.domain[1])];
                    return true;
                }

            }
   
        }
    }
  

    isflowRight(flow =(x)=>{return 2*x }){
        return Ebk.isFunction(flow) ;
    }
    
    
    #computeEntry(params ={step:1}){
        
       return ((this.#infos.domain[1] - this.#infos.domain[0])/this.#params.granularity)*params.step+this.#infos.domain [0];
    }

    #computeImage(params ={step:1}){


        if ((params.step == 0)||(params.step == this.#params.granularity)){
            return this.#params.flow(this.#computeEntry({step:params.step}));
        } else {
            let prev = this.#params.flow(this.#computeEntry({step:(params.step-1)}));
            let current = this.#params.flow(this.#computeEntry({step:params.step}));
            
            let next = this.#params.flow(this.#computeEntry({step:(params.step+1)}));
            
            let messyMin =  ((current+prev) /2);
            let messyMax =  ((current+next) /2);

            
            return Ebk.Rand.fRange({range:[messyMin, messyMax],clamp:[(this.#params.messy[0]+1)/2,(this.#params.messy[1]+1)/2]})
        }
    
        
    }

    #computeNormalizedImage(params = {step:1}){

        return   Math.abs( (this.#computeImage({step:params.step}) - this.#computeImage({step:0}))/(this.#computeImage({step:this.#params.granularity}) - this.#computeImage({step:0})));
    }


    locate(params ={step:1}){

        let info =`step has to be defined . eg {step: 1}`;

        if(!Ebk.isObject(params)){    
            console.error(info);
            return null;
        } else {
            if (!(Ebk.isInObject('step',params))){         
                console.error(info);
                return null;
            } else {
                if (!(Ebk.isNumber(params.step))){         
                    console.error(info);
                    return null;
                } else {
                    this.position = this.#computeNormalizedImage(params);
                    return   this.position;
                }
            }
        }    
    }

    locateCollection(){
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locate({step:i}));
        }

        return arr;
    }

    _updateAndLocate(params ={step:1}){
        this._update(params);
        return this.locate(params);
    }

    _updateAndLocateCollection(params){
        this._update(params);
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locate({step:i}));
        }

        return arr;
    }

    locateAt(params ={step:1,sample: [10,-20]}){

        let info =`step and sample have to be defined . eg {step: 1,sample: [10,-20]}`;

        if(!Ebk.isObject(params)){    
            console.error(info);
            return null;
        } else {
            if ((!(Ebk.isInObject('step',params)))||(!(Ebk.isInObject('sample',params)))){         
                console.error(info);
                return null;
            } else {
                if ((!(Ebk.isNumber(params.step)))|| (!(Ebk.isArrayOfNumbers(params.sample)))){         
                    console.error(info);
                    return null;
                } else {
                    this.position = this.locate(params)*(params.sample[1]-params.sample[0])+params.sample[0];
                    return   this.position;
                }
            }
        }    

    }

    _updateAndLocateAt(params ={step:1,sample: [10,-20]}){
        this._update(params);
        return this.locateAt(params);
    }

    locateCollectionAt(params={sample:[-20,10]}){
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locateAt({step:i,sample: params.sample}));
        }

        return arr;
    }

    _updateLocateCollectionAt(params={flow:(x)=>{return  Math.pow(2,x)  }, granularity:500,step:3,sample:[100,200]}){
        this._update(params);
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locateAt({step:i,sample: params.sample}));
        }

        return arr;
    }


    
    

};

Ebk.ERythm.LinearTests = (paramsTestOptions =[
    
                {flow:(x)=>{return 2*x; }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]},
                {flow:(x)=>{return 3*x; }, granularity:10,step:3,sample:[100,200],messy:[0,0]},
                {flow:(x)=>{return  Math.pow(2,x)  }, granularity:13,step:3,sample:[-1,1],messy:[0,1]},
                {flow:(x)=>{return  Math.pow(2,x)  }, granularity:13,step:3,sample:[-1,1],messy:[-1,-1]},
                {flow:(x)=>{return  Math.pow(2,1/(x+1))  }, granularity:13,step:3,sample:[-1,1],messy:[-1,-1]},
                
           ])=>{

  
    Ebk.ObjectInstance.tests(Ebk.ERythm.Linear,paramsTestOptions );
 
}

/////// Ebk.ERythm.Wavy
Ebk.ERythm.Wavy = class EbkERythmWavy {
    #params;
    #infos;
    constructor(params ={flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1]}){

        this._update(params);
    }

    

    _update(params ={flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1]}){
        let info =`flow, granularity and messy have to be defined. eg params ={flow:(x)=>{return 2*x; }, granularity:10,messy:[-1,1]}`;

        if(!Ebk.isObject(params)){
            console.error(info);
            return null;
        } else {

            if ((!(this.isflowRight(params.flow)))||(!(Ebk.isInObject('granularity',params)))||(!(Ebk.isInObject('messy',params)))){
                console.error(info);
                return null;
            } else{
                if((!(Ebk.isNumber(params.granularity)))||(!(Ebk.isArrayOfNumbers(params.messy)))){
                    console.error(info);
                    return null;
                } else {
                    this.#params = params;
                    this.#infos = {};
                    this.#infos.domain = [0,2*Math.PI];
                    this.#infos.codomain = [1,-1];
                    return true;
                }

            }
   
        }
    }
  

    isflowRight(flow =(x)=>{return 2*x }){
      
        if ((!( typeof flow ==='function'))){
            return false;
        } else {
            return true;
        }
     }
    
    
    #computeEntry(params ={step:1}){
        
       return ((this.#infos.domain[1] - this.#infos.domain[0])/this.#params.granularity)*params.step+this.#infos.domain [0];
    }

    #computeImage(params ={step:1}){


        if ((params.step == 0)||(params.step == this.#params.granularity)){
            return this.#params.flow(this.#computeEntry({step:params.step}));
        } else {
            let prev = this.#params.flow(this.#computeEntry({step:(params.step-1)}));
            let current = this.#params.flow(this.#computeEntry({step:params.step}));
            
            let next = this.#params.flow(this.#computeEntry({step:(params.step+1)}));
            
            let messyMin =  ((current+prev) /2);
            let messyMax =  ((current+next) /2);

            
            return Ebk.Rand.fRange({range:[messyMin, messyMax],clamp:[(this.#params.messy[0]+1)/2,(this.#params.messy[1]+1)/2]})
        }
    
        
    }

    #computeNormalizedImage(params = {step:1}){

        return   Math.abs( (this.#computeImage({step:params.step})-1 )/(this.#infos.codomain[1]- this.#infos.codomain[0]));
    }

   

    locate(params ={step:1}){

        let info =`step has to be defined . eg {step: 1}`;

        if(!Ebk.isObject(params)){    
            console.error(info);
            return null;
        } else {
            if (!(Ebk.isInObject('step',params))){         
                console.error(info);
                return null;
            } else {
                if (!(Ebk.isNumber(params.step))){         
                    console.error(info);
                    return null;
                } else {
                    this.position = this.#computeNormalizedImage(params);
                    return   this.position;
                }
            }
        }    
    }

    locateCollection(){
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locate({step:i}));
        }

        return arr;
    }

    _updateAndLocate(params ={step:1}){
        this._update(params);
        return this.locate(params);
    }

    _updateAndLocateCollection(params){
        this._update(params);
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locate({step:i}));
        }

        return arr;
    }

    locateAt(params ={step:1,sample: [10,-20]}){

        let info =`step and sample have to be defined . eg {step: 1,sample: [10,-20]}`;

        if(!Ebk.isObject(params)){    
            console.error(info);
            return null;
        } else {
            if ((!(Ebk.isInObject('step',params)))||(!(Ebk.isInObject('sample',params)))){         
                console.error(info);
                return null;
            } else {
                if ((!(Ebk.isNumber(params.step)))|| (!(Ebk.isArrayOfNumbers(params.sample)))){         
                    console.error(info);
                    return null;
                } else {
                    this.position = this.locate(params)*(params.sample[1]-params.sample[0])+params.sample[0];
                    return   this.position;
                }
            }
        }    

    }

    _updateAndLocateAt(params ={step:1,sample: [10,-20]}){
        this._update(params);
        return this.locateAt(params);
    }

    locateCollectionAt(params={sample:[-20,10]}){
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locateAt({step:i,sample: params.sample}));
        }

        return arr;
    }

    _updateLocateCollectionAt(params={flow:(x)=>{return  Math.pow(2,x)  }, granularity:500,step:3,sample:[100,200]}){
        this._update(params);
        let arr = [];

        for(let i=0;i<=this.#params.granularity;i++){
            arr.push(this.locateAt({step:i,sample: params.sample}));
        }

        return arr;
    }


    
    

};


Ebk.ERythm.WavyTests = (paramsTestOptions =[
    
                {flow:(x)=>{return Math.sin(x); }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]},
                {flow:(x)=>{return Math.sin(x); }, granularity:10,step:3,sample:[100,200],messy:[0,0]},

                
           ])=>{

  
    Ebk.ObjectInstance.tests(Ebk.ERythm.Wavy,paramsTestOptions );
 
}


Ebk.ERythm.TYPE = {};
Ebk.ERythm.TYPE.LINEAR = `LINEAR`;
Ebk.ERythm.TYPE.WAVY = `WAVY`;

/////// ERythm.create
Ebk.ERythm.create =  (params={ type: Ebk.ERythm.TYPE.LINEAR  ,flow:(x)=>{return 2*x; }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]})=>{

    if (params.type ===  Ebk.ERythm.TYPE.LINEAR){

        return new Ebk.ERythm.Linear(params);

    } else   if (params.type ===  Ebk.ERythm.TYPE.WAVY){

        return new Ebk.ERythm.Wavy(params);
    }



}

Ebk.ERythm.createTests =(paramsTestOptions =[
    
    {type:Ebk.ERythm.TYPE.WAVY,flow:(x)=>{return Math.sin(x); }, granularity:10,step:1,sample:[-20,10],messy:[-1,1]},
    {type:Ebk.ERythm.TYPE.WAVY,flow:(x)=>{return Math.sin(x); }, granularity:10,step:3,sample:[100,200],messy:[0,0]},
    {type:Ebk.ERythm.TYPE.LINEAR,flow:(x)=>{return Math.pow(3,x); }, granularity:10,step:3,sample:[100,200],messy:[0,0]},
    {type:Ebk.ERythm.TYPE.WAVY,flow:(x)=>{return Math.tan(x); }, granularity:10,step:3,sample:[5,25],messy:[0,0]},
    
])=>{

 

    let test = (instance ,params ={path:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]],target:0.3})=>{

        let allFunctions = Ebk.getPublicMethodOfClass(instance);
       
        allFunctions.forEach(func =>{
         
            if (!(func===  "constructor"))console.log(func, `:`,  instance[func](params));
            
        });
    
    }

     paramsTestOptions.forEach((item,ndx)=>{
        let inst = Ebk.ERythm.create(item);
        console.log(`<------------------------TEST: #`+ndx+`--------------------------->`);
        console.log(`ClassName:`,  inst.constructor.name,`Params`,item,);
         test(inst, item);
      });
   
}

/////// Ebk.Rythm 
Ebk.Rythm = class EbkRythm {
    #params;
    #infos;
    #isCreate;
    #msg;
    constructor(params ={type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]], flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1]}){

        let info =`type, sample, flow, granularity and messy have to be defined. eg params ={type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]], flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1]}`;
        this.#msg = {};
        this.#msg.NOTCREAT = 'Object is not created ';

        this.#isCreate = false;

        if(!(Ebk.isObject(params))){
            console.error(info);
            return null;
        } else {

            if((!(Ebk.isInObject(`type`,params)))||(!(Ebk.isInObject(`sample`,params)))
                ||(!(Ebk.isInObject(`flow`,params)))||(!(Ebk.isInObject(`granularity`,params)))||(!(Ebk.isInObject(`messy`,params)))){
                console.error(info);
                return  ;

            } else {

                if  (!((( params.type ==Ebk.ERythm.TYPE.LINEAR)||( params.type ==Ebk.ERythm.TYPE.WAVY)))){
                    console.error(info);
                    return  ;
                } else {

                   if((!Ebk.isMatrixOfNumbers(params.sample))||(!Ebk.isFunction(params.flow))
                     ||(!Ebk.isNumber(params.granularity))||(!Ebk.isArrayOfNumbers(params.messy))
                   
                   ){
                     console.error(info);
                     return  ;
                   } else {
                    this.#params = params;
                    this.#infos = {};
                    this.#infos.trajectory = new Ebk.Trajectory({path:this.#params.sample});
                    this.#infos.eRythm =  Ebk.ERythm.create(this.#params);
                    this.#isCreate = true;
                   }
                
                }

            }

        }



        
    }


    _update(params ={flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1]}){
        let info =`type, granularity and messy have to be defined. eg {type:{domain:[1,5], motion:(x)=>{return 2*x;}}, granularity:10,messy:[-1,1]}`;

 
    }

    locate(params ={step:5}){

        if (this.#isCreate) {
             let ratio =  this.#infos.eRythm.locate({step:params.step })
             return  this.#infos.trajectory.locate({target: ratio  });
        } else {
            return this.#msg.NOTCREAT;
        }

    }

    locateCollection(){

        if (this.#isCreate) {
            let arr = [];
            for(let i=0;i<=this.#params.granularity;i++){
                arr.push( this.locate({step:i}));
            }
    
            return arr;
        }else {
            console.error(this.#msg.NOTCREAT);
            return null;
        }


    }

}  


Ebk.RythmTests = (paramsTestOptions =[
    
    {type:Ebk.ERythm.TYPE.WAVY, sample:[[1,2,3],[-2,2,3],[5,1,6],[0,0,0]], flow:(x)=>{return Math.sin(x); }, granularity:10,messy:[-1,1], step:0},
    {type:Ebk.ERythm.TYPE.LINEAR,sample:[[1,2,3],[-2,2,3],[5,1,6],[25,30,10]], flow:(x)=>{return 2*x; }, granularity:10,messy:[-1,1], step:3},
    {type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,1,1],[0,2,2],[3,-1,3],[4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3},
    {type:Ebk.ERythm.TYPE.LINEAR, sample:[[1,1,1],[0,2,2],[3,-1,3],[4,4,8]], flow:(x)=>{return  Math.pow(5,x); }, granularity:20,messy:[-1,1], step:3},
])=>{


Ebk.ObjectInstance.tests(Ebk.Rythm,paramsTestOptions );

}


/////// Ebk.Sequence
Ebk.Sequence = {

}

Ebk.Sequence.toggle = (params = {step:1})=>{
    return Math.pow(-1, params.step);
}

Ebk.Sequence.toggleNext = (params = {step:1})=>{
    return Ebk.Sequence.toggle({step:params.step+1});
}

Ebk.Sequence.binary = (params = {step:1})=>{
    return Math.abs((Ebk.Sequence.toggle({step:params.step})-1)/-2);
}

Ebk.Sequence.binaryNext = (params = {step:1})=>{
    return Ebk.Sequence.binary({step:params.step+1});
}


Ebk.Sequence.e_msmk = (params = {step:1,length:4})=>{
    let row = () =>{
        return Math.floor(params.step/params.length);
    }
 
    let switchStarter = () =>{
        return params.length*Ebk.Sequence.binary({step:row()});
    }

    let switchSign = () =>{
        return Ebk.Sequence.toggle({step:row()});
    }

    let stepModulo = () =>{
        return params.step % params.length;

    }

    return  switchStarter ()+ switchSign()*stepModulo();
}


Ebk.Sequence.msmk = (params = {step:1,length:4,phase:2})=>{
    return  Ebk.Sequence.e_msmk (params = {step:params.step+params.phase,length:params.length});
}


Ebk.Sequence.e_msmkCollection = (params = {step:1,length:4,cLength:15})=>{
    let arr = [];
    for(let i=0;i<params.cLength;i++){
        arr.push(Ebk.Sequence.e_msmk({step:i, length:params.length}));
    }
    
    return arr; 
}    


Ebk.Sequence.msmkCollection = (params = {step:1,phase:2,length:4,cLength:15})=>{
    let arr = [];
    for(let i=0;i<params.cLength;i++){
        arr.push(Ebk.Sequence.msmk({step:i,phase: params.phase , length:params.length}));
    }
    
    return arr; 
} 

Ebk.Sequence.e_mkmk = (params = {step:1,length:4})=>{
    return  params.step % params.length;
}

Ebk.Sequence.mkmk = (params = {step:1,length:4,phase:2})=>{
    return Ebk.Sequence.e_mkmk (params = {step:params.step+params.phase,length:params.length});
}

Ebk.Sequence.mkmkCollection = (params = {step:1,phase:2,length:4,cLength:15})=>{
    let arr = [];
    for(let i=0;i<params.cLength;i++){
        arr.push(Ebk.Sequence.mkmk({step:i,phase: params.phase , length:params.length}));
    }
    return arr; 
} 

Ebk.Sequence.gridGetIndexFromRowCol = (params = {width:4,height:6,row:3,col:5})=>{
    return  params.row*params.width + params.col;
}

Ebk.Sequence.gridGetIndexFromRowColCollection = (params = {width:4,height:6,row:3,col:5})=>{
    
    let arr = [];

    for(let row=0; row<params.height; row++) {

        let subArr = [];
        for(let col=0; col<params.width;col++){
            subArr.push([row,col,Ebk.Sequence.gridGetIndexFromRowCol({width:params.width, height: params.height, col:col, row: row})]);
        }

        arr.push(subArr);

    }

    return arr; 


}

Ebk.Sequence.gridGetRowFromIndex = (params = {width:4,height:6,index:5})=>{
    return Math.floor(params.index/params.width);
}

Ebk.Sequence.gridGeColFromIndex = (params = {width:4,height:6,index:5})=>{
    return params.index - Ebk.Sequence.gridGetRowFromIndex(params)* params.width;
}

Ebk.Sequence.gridGetRowColFromIndex = (params = {width:4,height:6,index:5})=>{
    return [Ebk.Sequence.gridGetRowFromIndex(params),Ebk.Sequence.gridGeColFromIndex(params)] ;
}

Ebk.Sequence.gridGetRowColFromIndexColCollection = (params = {width:4,height:6,row:3,col:5})=>{
    
    let arr = [];

    for(let ndx=0; ndx<params.height*params.width; ndx++) {

        arr.push(Ebk.Sequence.gridGetRowColFromIndex({width:params.width, height: params.height,index:ndx }));

    }

    return arr; 
}

Ebk.Sequence.gridGetWholeNumberSum = (params = {length:5})=>{
    return  (params.length*(params.length+1))/2 ;
}

Ebk.Sequence.tests = (params = [
                            {step:0,length:4,phase:0,cLength:20,width:6,height:4,row:3,col:5,index:5},
                            {step:1,length:4,phase:1,cLength:20,width:6,height:4,row:3,col:5,index:8},
                            {step:2,length:4,phase:2,cLength:20,width:6,height:4,row:3,col:5,index:16},
                            {step:3,length:4,phase:3,cLength:20,width:6,height:4,row:3,col:5,index:19},
])=>{
    Ebk.ObjectName.tests(Ebk.Sequence,params ); 
}


export {Ebk}
export default Ebk;