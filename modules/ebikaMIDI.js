 //    Copyright (c) 2013-2024 Ossoey/experiments.  All rights reserved.
  
//    About Us page for Ossoey  website  

//    Authored by ebanga@ossoey.com/ebanga@hotmail.com  
 
import { Ebk} from "./ebika.js";

/* here's the  way to  call a function, voici comment 
       
Ebk.MIDI.initMIDI({   onMIDIMessage : (event) => {
    // Extract MIDI data from the event
         const [status, data1, data2] = event.data;

         console.log(status, data1, data2);
      }
});
  
*/

Ebk.MIDI =  {

    initMIDIParams : {}, 

    initMIDI : (params)=> {
        Ebk.MIDI.initMIDIParams = params;
        // Check if the Web MIDI API is supported
        if (navigator.requestMIDIAccess) {
          // Request access to MIDI devices
          navigator.requestMIDIAccess()
            .then(Ebk.MIDI.onMIDISuccess, Ebk.MIDI.onMIDIFailure);
        } else {
          console.error('Web MIDI API is not supported in this browser.');
        }
      } ,

     onMIDISuccess : (midiAccess)=> {
        // Get the list of available MIDI inputs
        const inputs = midiAccess.inputs.values();
    
        // Log each MIDI input device
        for (let input of inputs) {
          console.log('MIDI Input:', input.name);
          
          // Listen for MIDI messages
          input.onmidimessage =  Ebk.MIDI.initMIDIParams.onMIDIMessage;
                              //= onMIDIMessage 
        }    
      } , 
    
      onMIDIFailure : (error)=> {
        console.error('Failed to access MIDI devices:', error);
      } , 
    
      keyValueToRGBvalue : (value)=> {
        return Math.floor(Ebk.Conversion.intervalSourceToTarget ({src:{interval:[0,127], value:value},  dst:{interval:[0,255]}  }));
      } , 
    
 
      

      controlSelect: (params = { selection: {chanel: 176, key: 0  }, 
                                flow: {chanel: 176, key: 0, value: value} , 
                                operation: {function: () =>{ return }} }) =>{

            if   ((params.selection.chanel === params.flow.chanel) && (params.selection.key === params.flow.key)){
 
               const  {chanel, key, value} = params.flow;
               return params.operation.function({chanel, key, value});

            } 


        } ,

        controlSelectCheckAll: (params = {   flow: {chanel: 176, key: 0, value: value} }) =>{
         

                 console.log(params.flow.chanel, params.flow.key, params.flow.value);

        } , 


        ctrlAKAILPD8_PROG1_K1: (params = {  

            flow: {chanel: 176, key: 0, value: value} , 
            operation: {function: () =>{ return }} })  =>{
            
            params.selection = {chanel: 176, key: 8  };
        
            return   Ebk.MIDI.controlSelect(params);

        },
    
        ctrlAKAILPD8_PROG1_K2: (params = {  

            flow: {chanel: 176, key: 0, value: value} , 
            operation: {function: () =>{ return }} })  =>{
            
            params.selection = {chanel: 176, key: 9  };
        
            return   Ebk.MIDI.controlSelect(params);

        },

        ctrlAKAILPD8_PROG1_K3: (params = {  

            flow: {chanel: 176, key: 0, value: value} , 
            operation: {function: () =>{ return }} })  =>{
            
            params.selection = {chanel: 176, key: 10  };
        
            return   Ebk.MIDI.controlSelect(params);

        },

        ctrlAKAILPD8_PROG1_K4: (params = {  

            flow: {chanel: 176, key: 0, value: value} , 
            operation: {function: () =>{ return }} })  =>{
            
            params.selection = {chanel: 176, key: 11  };
        
            return   Ebk.MIDI.controlSelect(params);

        },

        ctrlAKAILPD8_PROG1_K5: (params = {  

          flow: {chanel: 176, key: 0, value: value} , 
          operation: {function: () =>{ return }} })  =>{
          
          params.selection = {chanel: 176, key: 12 };
      
          return   Ebk.MIDI.controlSelect(params);

      },

      ctrlAKAILPD8_PROG1_K6: (params = {  

        flow: {chanel: 176, key: 0, value: value} , 
        operation: {function: () =>{ return }} })  =>{
        
        params.selection = {chanel: 176, key: 13 };
    
        return   Ebk.MIDI.controlSelect(params);

    },

    ctrlAKAILPD8_PROG1_K7: (params = {  

      flow: {chanel: 176, key: 0, value: value} , 
      operation: {function: () =>{ return }} })  =>{
      
      params.selection = {chanel: 176, key: 14 };
  
      return   Ebk.MIDI.controlSelect(params);

  },

  ctrlAKAILPD8_PROG1_K8: (params = {  

    flow: {chanel: 176, key: 0, value: value} , 
    operation: {function: () =>{ return }} })  =>{
    
    params.selection = {chanel: 176, key: 15 };

    return   Ebk.MIDI.controlSelect(params);

},

 
         
}

let EbkMIDI = Ebk.MIDI

export {EbkMIDI}
export default EbkMIDI;