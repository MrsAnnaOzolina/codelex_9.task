import axios from "axios";

const allData = document.querySelector<HTMLDivElement>('.cards');
const addButton = document.querySelector<HTMLButtonElement| null>('.addButton');
let inputTitle = document.querySelector<HTMLInputElement | null>(".addNewItem__title")
let inputText = document.querySelector<HTMLInputElement | null>(".addNewItem__text")


 

type Dogs = {
    id: number,
    image: string,
    title: string,
    text: string
}
showData();
function showData () {
axios.get<Dogs[]>('http://localhost:3004/dogs').then((printData)=>{
    
    let data:string = "";
    for (let i = 0; i < JSON.stringify(printData).length; i++) {
    data+= `<div class="dog">
    <img src="${printData.data[i].image}">
    <h3>${printData.data[i].title}</h3>
    <p>${printData.data[i].text}</p>
    <div">
        <button class="edit-id-${printData.data[i].id} waves-effect waves-light btn">Edit</button>
        <button class="deleteButton-id-${printData.data[i].id} waves-effect waves-light btn" id="data-id-${printData.data[i].id}">Delete</button>
        <br>
        </div>
</div>`;
allData.innerHTML = data;
    }
})

}

axios.get<Dogs>('http://localhost:3004/dogs').then((deleteData)=>{
    const deletebutton = document.getElementById(`data-id-${deleteData.data.id}`);
    deletebutton.addEventListener('click', ()=>{
        axios.delete(`http://localhost:3004/dogs/${deleteData.data.id}`);
        //   console.log(`http://localhost:3004/dogs/${deleteData.data.id}`);
    });
}).then(()=>{
    showData();

})  



addButton.addEventListener('click', () => {
    axios.post<Dogs>('http://localhost:3004/dogs',{
    id: 0,
    image: "assets/images/dog.jpg",
    title: inputTitle.value,
    text: inputText.value,
})
.then(()=>{
    showData();
    inputTitle.value = " ";
    inputText.value = " ";
})
})
