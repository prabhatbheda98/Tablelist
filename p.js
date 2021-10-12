const tablelist = document.getElementById("tablelist");
const Name = document.getElementById('Name');
const positon = document.getElementById('positon');
const office = document.getElementById('office');
const age = document.getElementById('age');
const startdate = document.getElementById('startdate');
const form = document.getElementById('itemForm');

let storedata = "tableData";
let tableData = [];

const tableshow = function (tableData) {
    tablelist.innerHTML = "";
    tableData.forEach((element, index,id) => {
        tablelist.insertAdjacentHTML("beforeend", `
     <td>${element.Name}</td>
    <td>${element.positon}</td>
    <td>${element.office}</td>
    <td>${element.age}</td>
    <td>${element.startdate}</td>
    <td>
    <a href="#" onclick=editData("${element.Name}") data-bs-toggle="modal" data-bs-target="#exampleModal2"
    data-bs-whatever="@mdo"><i class="bi bi-pencil-square"></i>
    <a href="#" onclick=deleteData("${element.Name}")><i class="bi bi-trash"></i></a>
    </td>`);
    });
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = Name.value;
    const itempositon = positon.value;
    const itemoffice = office.value;
    const itemage = age.value;
    const itemstartdate = startdate.value;
    if (itemName.length, itempositon.length, itemoffice.length, itemage.length, itemstartdate.length === 0) {
        swal ("Please enter the details!", "Name,positon,office...");
    } else {
        const itemData = {
            Name: itemName,
            positon: itempositon,
            office: itemoffice,
            age: itemage,
            startdate: itemstartdate,
        }
        tableData.push(itemData);
        localStorage.setItem(storedata, JSON.stringify(tableData));
        swal("New item has been added!", "You clicked the button!", "success");
    }
    tableshow(tableData);
    console.log(tableData);
    Name.value = "";
    positon.value = "";
    office.value = "";
    age.value = "";
    startdate.value = "";
    document.getElementById('btnClose').click();
    loadList();
    selectIn();   
});

let oldName = '';
function editData(name) {
    oldName = name;
    const editName = document.getElementById('editName');
    const editpositon = document.getElementById('editpositon');
    const editoffice = document.getElementById('editoffice');
    const editage = document.getElementById('editage');
    const editstartdate = document.getElementById('editstartdate');

    // let saveindex = document.getElementById("saveindex");
    // saveindex.value = index;
    const edit = tableData.find((element) => element.Name === name);
    editName.value = edit.Name;
    editpositon.value = edit.positon;
    editoffice.value = edit.office;
    editage.value = edit.age;
    editstartdate.value = edit.startdate;
};
let Update = document.getElementById('update');
Update.addEventListener("click", (e) => {
    e.preventDefault();
    swal({
        title: "update item has been added",
        icon: "success",
        button: "close",
    });
    // const editName = document.getElementById('editName');
    // const editpositon = document.getElementByIdAddbook
    // tableData[saveindex].startdate = editstartdate.value;
    const editName = document.getElementById('editName').value;
    const editpositon = document.getElementById('editpositon').value;
    const editoffice = document.getElementById('editoffice').value;
    const editage = document.getElementById('editage').value;
    const editstartdate = document.getElementById('editstartdate').value;

    tableData.find((element) => {
        if(element.Name === oldName) {
            element.Name = editName,
            element.positon = editpositon,
            element.office = editoffice,
            element.age = editage,
            element.startdate = editstartdate
        }
    });
    tableshow(tableData);
    localStorage.setItem(storedata, JSON.stringify(tableData));
    editName.value = "";
    editpositon.value = "";
    editoffice.value = "";
    editage.value = "";
    editstartdate.value = "";
    document.getElementById('closebutton').click();
    loadList();
    selectIn();   
});

let currentPage = 0, numberPerPage = 10, numberOfPages = 1, pageList = [];
let options = [5, 10, 15, 20, 25];
selectInput.innerHTML = options.map((res) => {
    return `<option value="${res}">${res}</option>`;
})
loadList();
selectIn();
function selectIn() {
    let sel = document.getElementById('selectInput');
    numberPerPage = sel.value;
    numberOfPages = Math.ceil(tableData.length / numberPerPage);
    currentPage = 1;
    loadList();
}
function previousPage() {
    currentPage -= 1;
    loadList();
}
function nextPage() {
    currentPage += 1;
    loadList();
}
function curPage(n) {
    currentPage = n;
    loadList();
}
function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
}
function loadList() {
    if (!localStorage.getItem(storedata)) { localStorage.setItem(storedata, JSON.stringify(tableData)); }
    tableData = JSON.parse(localStorage.getItem(storedata));
    if (!tableData.length) return false;

    let btn = document.getElementById('page-btn');
    btn.innerHTML = '';
    for (let i = 1; i <= numberOfPages; i++) {
        btn.innerHTML += `<button onclick="curPage(${i})" class="${currentPage === i ? 'active' : ''}">${i}</button>`;
    }
    let begin = ((currentPage - 1) * numberPerPage);
    let end = parseInt(begin) + parseInt(numberPerPage);
    pageList = tableData.slice(begin, end);
    document.getElementById('start-count').innerHTML = begin + 1;
    document.getElementById('end-count').innerHTML = begin + pageList.length;
    document.getElementById('total-count').innerHTML = tableData.length;
    tableshow(pageList);
    check();
}
function deleteData(name) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                const del = tableData.findIndex((element) => element.Name === name);
                tableData.splice(del, 1);
                localStorage.setItem(storedata, JSON.stringify(tableData));
                loadList();
                selectIn();
                swal("Poof! Your data file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your data file is safe!");
            }
        });
        
}
function serch() {
    var input, filter, table, tr, td, col, i, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            col = tr[i].getElementsByTagName("td")[j];
            if (col) {
                if (col.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}
function sortTable(el) {
    tableData.togglesort = function () {
        var data = this;
        this.asc = !this.asc;
        return this.sort(function (a, b) {
            return a[el] > b[el] ? (data.asc ? 1 : -1) : a[el] < b[el] ? (data.asc ? -1 : 1) : 0;
        }); 
    };
    sort = tableData.togglesort();
    tableshow(tableData);
    
}


