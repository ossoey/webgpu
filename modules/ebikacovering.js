 //    Copyright (c) 2013-2023 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";


Ebk.Covering = {}
/////// Ebk.Geometry.Geobartrix
 
Ebk.Covering.OpenPath2D = class EbkCoveringOpenPath  {
    #params;
    #process;
    #isCreate;
    #dataError;
   
    constructor(params ={  positions: [[0,0], [0.1, 0.2], [0.3, 0], [0.2, -0.3], [0.7, -0.2]],
                           thicknessRythm:{type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]}
               }){

                this.name = `Ebk.Covering.OpenPath2D`;

                this.#isCreate = false;
        
                this.#params = {};
                this.#process = {};

                this.#params =  Object.assign({},  params );

                this.#assignSubParamsForCreation( );

                this.#isCreate = true;
  
    }
    
    _update(params =params ={ 
        positions: [[0,0], [0.1, 0.2], [0.3, 0], [0.2, -0.3], [0.7, -0.2]],
        thicknessRythm:{type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]}
     }){
        
       this.#params = Object.assign(this.#params , Ebk.objectDeepCopy (params));

       this.#assignSubParamsForUpdate( );
    
    }


    #assignSubParamsForCreation( ){

        this.#params.thicknessRythm.granularity = this.#params.positions.length;

        this.#process.thicknessRythm = new Ebk.Rythm(this.#params.thicknessRythm);

       

                
    }

    #assignSubParamsForUpdate( ){

        this.#params.thicknessRythm.granularity = this.#params.positions.length;
         
        this.#process.thicknessRythm._update(this.#params.thicknessRythm);

       
                
    }

    #getNodeEdgePosition(index, vector) {
        let updatedVector = Ebk.Matrix.vectScale({v:Ebk.Matrix.unit({v:vector}), scalar: this.#process.thicknessRythm.locate({step: index})[0] } ) 

       return  Ebk.Matrix.vectAdd({v1: this.#params.positions[index] , v2: updatedVector })
    }

    #getNodeThickness(params = {index:0}) {

        let thickness;

        let vectorPrev, vectorNext; 

        let perpRight, perpLeft, prevPerpRight, prevPerLeft, nextPerpRight, nextPerLeft;

        if (params.index == 0 ) {

            vectorNext = Ebk.Matrix.vector({v1: this.#params.positions[0] , v2 :this.#params.positions[1] });      
            
            perpRight= Ebk.Matrix.vect2DPerpRight({v: vectorNext});

            perpLeft= Ebk.Matrix.vect2DPerpLeft({v: vectorNext});

            thickness = [
                 this.#getNodeEdgePosition(params.index, perpRight)
                ,
                  this.#getNodeEdgePosition(params.index, perpLeft)

            ]
        } else if (params.index == this.#params.positions.length-1 ) {

            vectorPrev = Ebk.Matrix.vector({v1: this.#params.positions[this.#params.positions.length-2] ,
                                            v2 :this.#params.positions[this.#params.positions.length-1] }); 

            perpRight= Ebk.Matrix.vect2DPerpRight({v: vectorPrev});

            perpLeft= Ebk.Matrix.vect2DPerpLeft({v: vectorPrev});

            thickness = [
                this.#getNodeEdgePosition(params.index, perpRight)
                ,
                this.#getNodeEdgePosition(params.index, perpLeft)
            ]

        } else {

            
            vectorPrev = Ebk.Matrix.vector({v1: this.#params.positions[params.index-1 ] ,
                                             v2 :this.#params.positions[params.index ] }); 


            prevPerpRight= Ebk.Matrix.vect2DPerpRight({v: vectorPrev}); prevPerLeft= Ebk.Matrix.vect2DPerpLeft({v: vectorPrev});                               

            vectorNext = Ebk.Matrix.vector({v1: this.#params.positions[params.index], v2 :this.#params.positions[params.index +1] });                                                
             nextPerpRight= Ebk.Matrix.vect2DPerpRight({v: vectorNext}); nextPerLeft= Ebk.Matrix.vect2DPerpLeft({v: vectorNext}); 
            
            
             thickness = [
                this.#getNodeEdgePosition(params.index, Ebk.Matrix.vectAdd({v1: prevPerpRight, v2: nextPerpRight}))
                ,
                this.#getNodeEdgePosition(params.index, Ebk.Matrix.vectAdd({v1: prevPerLeft, v2: nextPerLeft}))
            ]

        }

        return thickness; 
    } 

    #getSectionThickness(params = {index:0}) {
        let coord0, coord1, coord2, coord3;
        let egde0 =    this.#getNodeThickness({index: params.index});
        let egde1 =    this.#getNodeThickness({index: params.index +1 });
        coord0 = egde0[0]; coord1 = egde1[0];
        coord2 = egde1[1]; coord3 = egde0[1];
        return [
            [coord0, coord1, coord2],
            [coord0, coord2, coord3]
         ]
    }

    thicknessPath(){

        let arr = [];

        for(let ndx = 0; ndx < this.#params.positions.length -1; ndx++ ){
            arr = arr.concat(this.#getSectionThickness({index: ndx}) );
        }

        return arr;

    }


    getParams(){
        return Object.assign({},Ebk.objectDeepCopy (this.#params));
    }



}  


Ebk.Covering.OpenPath2DTests = (paramsTestOptions =[
    
    {creation:  { positions: [[0,0], [0.1, 0.2], [0.3, 0], [0.2, -0.3], [0.7, -0.2]],
        thicknessRythm:{type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]}
     },   

      update:  { positions: [[0,0], [0.1, 0.2], [0.3, 0], [0.2, -0.3], [0.7, -0.2]],
        thicknessRythm:{type:Ebk.ERythm.TYPE.LINEAR, sample:[[0.2], [0.4]], flow:(x)=>{return Math.sin(x); }, messy:[-1,1]}
    }
}] ,    exceptions = ["_update" ]    
       
)=>{

    Ebk.ObjectInstance.testsCreateAndUpdate(Ebk.Covering.OpenPath2D,paramsTestOptions, exceptions );

}



let EbkCov= Ebk.Covering

export {EbkCov}
export default EbkCov;