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

Ebk.isObject = (value) =>{
    if  ((value instanceof Object && value !== null)) return true
    else return false;
}

Ebk.isInObject = (prop,obj) =>{
    if  (obj.hasOwnProperty(prop)) return true
    else return false;
}

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
      

           let pickRangeIndex = Ebk.Rand.iRange({range:[0, params.ranges.length],clamp:[0,1]}); 
           return Ebk.Rand.fRange({range:params.ranges[pickRangeIndex],clamp:params.clamps[pickRangeIndex]});
        }
      
       }

    }

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
    console.log(`fail`);
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
                    console.log(i);
                    arr.push(Ebk.Rand.fRanges(params));
                }
    
                return arr;
            }

        }
    } else return null; 
  
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
                    
                    {range:[0,100],clamp:[-0.2,0.51], length:10,
                     ranges:[[0.,1.],[23, 60], [-7, 2]],clamps:[[0,1],[0.2,0.4],[0.8,0.87]]},
                
           ])=>{
     paramsTestOptions.forEach((item,ndx)=>{
        console.log(`<------------------------TEST: #`+ndx+`--------------------------->`);
        console.log(`params:`, item);
        Ebk.Rand.test(item);
    });
}


export {Ebk}
export default Ebk;