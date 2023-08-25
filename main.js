
window.addEventListener(`load`, ()=>{


    import(`./modules/webgpuprinciple.js`).then((module)=>{

        module.functions_entries[0].func();

        let list = document.createElement(`select`);
        document.querySelector(`#menu`).append(list);

        module.functions_entries.forEach((elt,index)=>{

            let subElt = document.createElement(`option`);
        
            subElt.innerHTML = elt.desc;
            subElt.functionId = index;
            subElt.setAttribute(`id`, index);
            list.appendChild(subElt);

        });

        list.addEventListener(`change`,(event)=>{
            let select = event.target.options[event.target.selectedIndex];
            module.functions_entries[select.functionId].func();           
        });

    });


})