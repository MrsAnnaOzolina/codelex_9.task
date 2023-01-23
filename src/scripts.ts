import axios from "axios";

const allData = document.querySelector<HTMLDivElement>('.cards');
const addButton = document.querySelector<HTMLButtonElement | null>('.addButton');
let inputTitle = document.querySelector<HTMLInputElement | null>(".addNewItem__title");
let inputText = document.querySelector<HTMLInputElement | null>(".addNewItem__text");
let DataArray:number[] = []

type Dogs = {
    id: number,
    image: string,
    title: string,
    text: string
}

showData();
function showData() {

      axios.get<Dogs[]>('http://localhost:3004/dogs').then((dogs) => {

            let data: string = "";
            for (let i = 0; i < JSON.stringify(dogs).length; i++) {
                data += `<div class="dog">
                <img src="${dogs.data[i].image}">
                <h3 class="title-id-${dogs.data[i].id}">${dogs.data[i].title}</h3>
                <p class="text-id-${dogs.data[i].id}">${dogs.data[i].text}</p>
                <button class="edit-id-${dogs.data[i].id} waves-effect waves-light btn">Edit</button>
                <button class="extrabutton deleteButton-id-${dogs.data[i].id} waves-effect waves-light btn" id="data-id-${dogs.data[i].id}">Delete</button>
                <div ><p class="editedData-id-${dogs.data[i].id}"></p></div>
                </div>
                `;

                allData.innerHTML = data;
                DataArray.push(dogs.data[i].id);
                                //    DELETE BUTTON
             const deletebutton = document.querySelector(`.deleteButton-id-${dogs.data[0].id}`);
                deletebutton.addEventListener("click", () => {
                axios.delete(`http://localhost:3004/dogs/${dogs.data[0].id}`).then(()=>{ 
                    showData();

                })
            })

                                      // EDIT BUTTON
            const editButton = document.querySelector(`.edit-id-${dogs.data[0].id}`);
               editButton.addEventListener("click", () => {
                   document.querySelector(`.editedData-id-${dogs.data[0].id}`).innerHTML = `
                   <label class="addNewItem__label" >
                   <h2>Edit Item</h2>
                   <input type="text" value="${dogs.data[0].title}" class="changedtitle" >
                   <input  type="text" value="${dogs.data[0].text}" class="changedtext" >
                   <button class="submitbutton waves-effect waves-light btn">Submit Changes</button>
               </label>`;
                let editedTitle = document.querySelector<HTMLInputElement | null>(".changedtitle")
                let editedText = document.querySelector<HTMLInputElement | null>(".changedtext")
               document.querySelector(".submitbutton").addEventListener("click", () => {
                axios.put<Dogs>(`http://localhost:3004/dogs/${dogs.data[0].id}`, {
                    id: `${dogs.data[0].id}`,
                    image: `${dogs.data[0].image}`,
                    title:editedTitle.value,
                    text:editedText.value,
                }).then(()=>{
                    showData();
                })
               })
               })
        }
        }) 
        .catch((error) => { console.log(error); })

       
}
//console.log(DataArray);
addButton.addEventListener('click', () => {
    axios.post<Dogs>('http://localhost:3004/dogs', {
        id: 0,
        image: "assets/images/dog.jpg",
        title: inputTitle.value,
        text: inputText.value,
    })
        .then((data) => {
            showData();
            inputTitle.value = " ";
            inputText.value = " ";
            DataArray.push(data.data.id);
        })
})
