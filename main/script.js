//creazione dinamica
for(team of datiTeams)
{ 
    const visualizzaTeams=document.querySelector("#scelta")

    let cont=document.createElement('div');
    let logo=document.createElement('img');
    logo.src=team.immagine;
    cont.appendChild(logo);
    
    let nome=document.createElement('h1');
    nome.dataset.idTeam=team.nome;
    nome.textContent=team.nome;
    cont.appendChild(nome);

    let stella=document.createElement('img');
    stella.id='add';
    stella.src='images/add.png'
    
    cont.id=(team.nome);
    cont.appendChild(stella);

    
    sc=document.createElement("a");
    sc.textContent="clicca per vedere i piloti";
    sc.addEventListener("click",show)
    cont.appendChild(sc);

    
    desc=document.createElement("p");
    desc.textContent=team.descrizione;
    desc.id="desc"
    desc.classList.add("hidden")
    cont.appendChild(desc)
    
    nasc=document.createElement("p");
    nasc.id="nascondi"
    nasc.textContent="nascondi piloti";
    nasc.classList.add("hidden")
    nasc.addEventListener("click",hide)
    cont.appendChild(nasc)

    visualizzaTeams.appendChild(cont);
}

ricerca=document.querySelector("#search")
ricerca.addEventListener("keyup",cerca)


//comportamento
const teams= document.querySelectorAll("#add")
for(team of teams)
{
    team.addEventListener("click", teamSelected);
}


function teamSelected(event)
{
    let teamSel=event.currentTarget.parentNode;
    teamSel.classList.add("hidden");

   const pref=document.querySelector("#preferiti");
    pref.classList.remove("hidden");
    const scritta=document.querySelector("#up1");
    scritta.classList.remove("hidden");

    const preferiti=document.querySelector("#preferiti .teams")
    
    for(team of datiTeams)
    {
        
        if(teamSel.id===team.nome)
        {
            let cont=document.createElement('div');
            cont.dataset.nome=team.nome
            let logo=document.createElement('img');
            let nome=document.createElement('h1');
            logo.src=team.immagine;
            cont.appendChild(logo);
            nome.textContent=team.nome;
            cont.appendChild(nome);
            let stella=document.createElement('img');
            stella.id='remove';
            stella.src='images/remove.png'
            stella.addEventListener("click",teamUnselected);
            cont.appendChild(stella);

            preferiti.appendChild(cont);
        }
    }

    
    
}


function teamUnselected(event)
{
    let teamSel=event.currentTarget.parentNode;
    //teamSel.classList.add("hidden"); si riusciva a buggare giocando apposta con la barra di ricerca
    teamSel.remove();
    let listaTeam=document.querySelectorAll("#scelta div");

    for(team of listaTeam)
    {
        if(team.id===teamSel.dataset.nome)
        {
            team.classList.remove("hidden")
        }
    }

    let listaP=document.querySelectorAll("#preferiti .teams div")
    let n=listaP.length;

    if(n===0)
    {
        const pref=document.querySelector("#preferiti");
    pref.classList.add("hidden");
    const scritta=document.querySelector("#up1");
    scritta.classList.add("hidden");
    }

   
}


function show(event)
{
    event.currentTarget.classList.add("hidden")

    let listaTeam=document.querySelectorAll("#scelta div");
    
    let i=0;
    for(team of listaTeam)
    {
        if(team.id===event.currentTarget.parentNode.id)
        {
            listaP=document.querySelectorAll("#scelta div #desc")
            listaN=document.querySelectorAll("#scelta div #nascondi")
            listaP[i].classList.remove("hidden")
            listaN[i].classList.remove("hidden")

            team.classList.add("scelto");
        }
        i++;
    }
}

function hide(event)
{
    event.currentTarget.classList.add("hidden")


    let listaTeam=document.querySelectorAll("#scelta div");
    
    let i=0;
    for(team of listaTeam)
    {
        if(team.id===event.currentTarget.parentNode.id)
        {
            listaP=document.querySelectorAll("#scelta div #desc")
            listaN=document.querySelectorAll("#scelta div #nascondi")
            listaP[i].classList.add("hidden")
            listaN[i].classList.add("hidden")

            listaA=document.querySelectorAll("#scelta div a")
            listaA[i].classList.remove("hidden")

            team.classList.remove("scelto");
        }
        i++;
    }
}

function cerca(event)
{
let favouriteList=document.querySelectorAll("#preferiti .teams div")

let listaTeam=document.querySelectorAll("#scelta div h1")
let valore=event.currentTarget.value
for(team of listaTeam)
{
    let Nteam=team.dataset.idTeam
    Nteam=Nteam.toLowerCase()
   
    valore=valore.toLowerCase()
    if(Nteam.search(valore)!==-1)
    {
        team.parentNode.classList.remove("hidden")

         for(preferito of favouriteList)
         {
              if(preferito.dataset.nome===team.parentNode.id)
             {
                  team.parentNode.classList.add("hidden")
             }
         }
    }
    else{
        team.parentNode.classList.add("hidden")
    }
}

if(valore===""){
        
    for(team of listaTeam){
        team.parentNode.classList.remove("hidden")

         for(preferito of favouriteList)
         {
              if(preferito.dataset.nome===team.parentNode.id)
             {
                  team.parentNode.classList.add("hidden")
             }
         }
    }
}

}
