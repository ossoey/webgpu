
let simplebut = document.querySelector(`.simpletri`);
let simplebut1 = document.querySelector(`.simpletri1`);

simplebut.addEventListener(`click`, ()=>{

    import(`./modules/webgpuprinciple.js`).then((module)=>{

       //  document.querySelector(`canvas`).remove();
        // document.querySelector(`body`).append( document.createElement(`canvas`));
        module.main();
        console.log(module.element);
    })

});


simplebut1.addEventListener(`click`, ()=>{

    import(`./modules/webgpuprinciple.js`).then((module)=>{
        //document.querySelector(`canvas`).remove();
        //document.querySelector(`body`).append( document.createElement(`canvas`));

        module.main1();
        console.log(module.element);
    })

});