const api_key_sportsDB ='1'
const endPoint_sportsDB='https://www.thesportsdb.com/api/v1/json/'

const api_key_scaleSerp='06EB32BB3A804B9EA789FDFD49F17C30'
const endPoint_scaleSerp='https://api.scaleserp.com/search?api_key='


const bannerLeft=document.querySelector("#bannerLeft")
const bannerRight=document.querySelector("#bannerRight")
let fillCall=0
function fillBanner(json)
{
    let listaImgL=bannerLeft.querySelectorAll("img")
    let listaImgR=bannerRight.querySelectorAll("img")
    for(foto of listaImgL)
        {
            foto.parentNode.removeChild(foto)
        }
        for(foto of listaImgR)
            {
                    foto.parentNode.removeChild(foto)
            }
    //console.log(json)
    for(let i=0;i<9;i++)
    {
        let img=document.createElement("img")
        img.src=json.image_results[i].image
        bannerLeft.appendChild(img)
    }
    for(let i=9;i<18;i++)
    {
        let img=document.createElement("img")
        img.src=json.image_results[i].image
        bannerRight.appendChild(img)
    }
}

let url=endPoint_sportsDB + api_key_sportsDB +"/eventspastleague.php?id=4407"
fetch(url).then(onResponse).then(onJSON)

function onResponse(response)
{
    return response.json()
}

function onJSON(json)
{
    //console.log(json)
    const cont=document.querySelector("#container")
    let i=0;
    for(evento of json.events)
    {
        let gpBox=document.createElement('div')
        gpBox.dataset.idEvento=evento.idEvent
        let gpName=document.createElement('a');
        gpName.classList.add("nomeEvento")
        gpBox.classList.add("gPrix")
        gpName.textContent=evento.strEvent + "  (" + evento.dateEvent + ")"
        gpBox.appendChild(gpName); 
        gpBox.addEventListener("click", selected)
        cont.appendChild(gpBox);
        //console.log(evento)  
    }
}


function selected(event)
{
    fillCall=0;
    let divAttivi=document.querySelectorAll(".selezionato")
    for(div of divAttivi)
    { 
        let piloti=div.querySelectorAll("span.pilota")
    
        for(pilota of piloti)
        {
           pilota.parentNode.removeChild(pilota)
        }
        div.classList.remove("selezionato")
        div.removeEventListener("click", unSelected)
        div.addEventListener("click", selected)
    }

    event.currentTarget.classList.add("selezionato")
    event.currentTarget.removeEventListener("click", selected)
    event.currentTarget.addEventListener("click", unSelected)
    id_evento=event.currentTarget.dataset.idEvento;

    let urlArrivi=endPoint_sportsDB + api_key_sportsDB + "/eventresults.php?id=" + id_evento;
   fetch(urlArrivi).then(onResponse).then(addPilota)
}

function addPilota(json)
{
    //console.log(json.results);
    let gara=json.results[0].idEvent;
    let listaDiv=document.querySelectorAll("div.gPrix")
    //console.log(listaDiv);

    let divSel
    for(div of listaDiv)
    {
        if(div.dataset.idEvento==gara)
        {
            divSel=div
        }
    }
//console.log(divSel)
    for(let i=0;i<3;i++)
    {
        let nome=json.results[i].strPlayer;
        let pilota=document.createElement("span");
        pilota.dataset.nome=nome
        pilota.dataset.id_pilota=json.results[i].idPlayer;
        pilota.dataset.id_team=json.results[i].idTeam;
        let pos=i+1
        pilota.dataset.posizione=pos;
        pilota.classList.add("pilota")
        //pilota.textContent=pos + ") " + nome;
        divSel.appendChild(pilota)
        fetch(endPoint_sportsDB + api_key_sportsDB + "/lookupteam.php?id="+pilota.dataset.id_team).then(onResponse).then(onTeam)
    }
}

function onTeam(json)
{
    pilotiTeam=document.querySelectorAll("span.pilota")
    for(pilota of pilotiTeam)
    {
        
        if(pilota.dataset.id_team==json.teams[0].idTeam)
        {
            pilota.dataset.datiRicerca=json.teams[0].strTeam
            
            if(pilota.dataset.posizione==1)
            {
                //console.log(pilota)
                pilota.parentNode.dataset.datiRicerca=pilota.dataset.datiRicerca

                if(fillCall==0){
                    fillCall=1;
                    
                //riempimento banner in base al primo arrivato dell'evento selezionato
                let listaImgL=bannerLeft.querySelectorAll("img")
                let listaImgR=bannerRight.querySelectorAll("img")
                for(foto of listaImgL)
                {
                    foto.parentNode.removeChild(foto)
                }
                for(foto of listaImgR)
                {
                    foto.parentNode.removeChild(foto)
                }
                let nomeTeam=pilota.dataset.datiRicerca
                //console.log(nomeTeam)
                nomeTeam=encodeURIComponent(nomeTeam)
                let urlScale=endPoint_scaleSerp + api_key_scaleSerp + "&q=" + nomeTeam+"&search_type=images&images_page=1";
                fetch(urlScale).then(onResponse).then(fillBanner)
                 }
            }
            pilota.textContent=pilota.dataset.posizione + ") " + pilota.dataset.nome + " ("+pilota.dataset.datiRicerca+")";
        } 
    }
}

function unSelected(event)
{
    
    fillCall=0;
    let piloti=event.currentTarget.querySelectorAll("span.pilota")
    
    for(pilota of piloti)
    {
        pilota.parentNode.removeChild(pilota)
    }
    event.currentTarget.classList.remove("selezionato")
    event.currentTarget.removeEventListener("click", unSelected)
    event.currentTarget.addEventListener("click", selected)
}