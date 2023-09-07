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

Ebk.Matrix.arrGetSubarray =(arr, fromIndex, toIndex) => {
    return      arr.slice(fromIndex, toIndex+1);
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

Ebk.Matrix.subMatrix = (params ={ matrix:[[3,1,5],[5,3,-9],[5,3,-9]], headNdx :1}) =>{


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
               
                params.matrix.forEach((item,ndx)=>{

                    result.push(Ebk.Matrix.subMatrix({matrix:params.matrix,headNdx:ndx}));
                })

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

        if((!Ebk.isInObject(`matrix`, params))||(!Ebk.isInObject(`headNdx`, params))){  
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
            
                            result.push(  Math.pow(-1,vecNdx)*mat[vecNdx][0]*obj.det(Ebk.Matrix.subMatrix({matrix:mat, headNdx:vecNdx})));
                        }
            
                        result.forEach(value =>{
                            sum+=value;
                        })
            
                        return sum ;
                                     
                    }
                    else {
            
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

        if((!Ebk.isInObject(`matrix`, params))||(!Ebk.isInObject(`headNdx`, params))){  
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

                    let subMatrices = Ebk.Matrix.subMatrices({matrix:params.matrix});
                    
                    let result = [];

                    subMatrices.forEach((matrix,matrixNdx)=>{
                        result.push((1/det)*Ebk.Matrix.determinant({matrix:matrix}));

                    });
                    return subMatrices;
                }
          
            }
       }
  
    }

}

 Ebk.Matrix.determinant1 = ( ) =>{
   // let matrix =[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,22,24,25]]
   // let matrix =[[-2,-1,2],[2,1,0],[-3,3,-1]]
    //let matrix =[[2,-1,2],[5,2,1],[0,3,-2]]
    let matrix = [[1,2,-1,2],[ 0,5,2,1],[4,0,3,-2],[-6,3,5,3]]; //  [[1,2,8],[6,7,9],[4,3,5]]
    //let matrix = [[2,0,0,0],[1,-1,0,0],[0,0,2,0 ],[-3,1,-5,1]]; //  [[1,2,8],[6,7,9],[4,3,5]]


  
    let obj ={};

   
   
    obj.det = (mat) =>{
         let result =[] 
         let sum = 0; 
        
        if(mat.length > 2 ) {
            
          
            
            for(let vecNdx =0;vecNdx< mat.length;vecNdx++) {

                result.push(  Math.pow(-1,vecNdx)*mat[vecNdx][0]*obj.det(Ebk.Matrix.subMatrix({matrix:mat, headNdx:vecNdx})));
            }

            result.forEach(value =>{
                sum+=value;
            })


            return sum ;
                         
        }
        else if (mat.length == 2)  {

            return  mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0];

        }
    }
   
         
 
   return obj.det(matrix);
 

 }


Ebk.Matrix.test = (params ={range:[0.,1.]})=>{

    Object.keys(Ebk.Matrix).forEach(key =>{
        if((key !==`tests`)&&(key !==`test`)&&(key !==`arrGetSubarray`)  )     {
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

export {Ebk}
export default Ebk;