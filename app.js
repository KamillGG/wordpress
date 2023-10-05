async function funk(){
    const data = await fetch('http://localhost/kgwordpress/wp-json/wp/v2/posts',)
    const json = await data.json()
    console.log(json)
    for(let i=0;i<=json.length-1;i++){
        const point = document.createElement('div')
        const li = document.createElement('li')
        const butt = document.createElement('button')
        const butt2 = document.createElement('button')
        butt2.innerHTML = "censor"
        butt2.addEventListener('click',()=>{
            censor(json[i].id)
        })
        li.innerHTML = json[i].title.rendered
        butt.innerHTML = "DELETE"
        butt.addEventListener('click',()=>{
            deleteArticle(json[i].id)
        })
        point.setAttribute('id',json[i].id)
        point.appendChild(li)
        point.appendChild(butt)
        point.appendChild(butt2)
        document.getElementById('list').appendChild(point)
    }
}
async function deleteArticle(id){
    const data = await fetch(`http://localhost/kgwordpress/wp-json/wp/v2/posts/${id}`,{
        method:"delete",
        headers:{
            Authorization:`Basic ${btoa("Kamil:koronawirus2@2@")}`
        }
    })
    const json =await data.json()
    if(json.status=="trash"){
        document.getElementById(json.id).remove()
    }
}
async function add(){
    const tytul =document.getElementById('tytul').value
    const tresc = document.getElementById('tresc').value
    var url  =new URL(`http://localhost/kgwordpress/wp-json/wp/v2/posts`)
    var params = {
        title:tytul,
        status:"publish",
        content:tresc
    }
    for(let i in params){
        url.searchParams.append(i, params[i])
    }
    console.log(url)
    const inaczej =await fetch(url,{
        method:"POST",
        headers:{
            Authorization:`Basic ${btoa("Kamil:koronawirus2@2@")}`
        }
    })
    const json = await inaczej.json()
    const point = document.createElement('div')
    const li = document.createElement('li')
    const butt = document.createElement('button')
    li.innerHTML = json.title.rendered
    butt.innerHTML = "DELETE"
    butt.addEventListener('click',()=>{
        deleteArticle(json.id)
    })
    point.setAttribute('id',json.id)
    point.appendChild(li)
    point.appendChild(butt)
    document.getElementById('list').appendChild(point)
}
async function censor(id){
    const url = new URL(`http://localhost/kgwordpress/wp-json/wp/v2/posts/${id}`)
    var params = {
        content:"cenzura"
    }
    for(let i in params){
        url.searchParams.append(i,params[i])
    }
    console.log(url)
    const data =await fetch(url,{
        method:"POST",
        headers:{
            Authorization:`Basic ${btoa("Kamil:koronawirus2@2@")}`
        }
    })
}