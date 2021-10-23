let employeePayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")){
         getDataFromLocalStorage();
    }else
        getAddressBookFromServer();
})

function processAddressBookDataResponse() {
    //Create another method for response because this should implement after we get response from server
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem("edit-emp");
}

const getDataFromLocalStorage = () => {
    employeePayrollList= localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressBookDataResponse();
}

const getAddressBookFromServer=()=> {

    makeServiceCall("GET", site_properties.server_url, true)
        .then(response =>{
            employeePayrollList=JSON.parse(response);
            processAddressBookDataResponse();
        })
        .catch(error=>{
            console.log("Get Error Status : "+JSON.stringify(error));
            employeePayrollList=[];
            processAddressBookDataResponse();
        })
}


const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (let empPayrollData of addressbookList) {
        innerHtml = `${innerHtml}
            <tr>
            <td><img src ="${addBookData._profilePic}"></td>
            <td>${addBookData._fullname}</td>
            <td>${addBookData._phonenumber}</td>
            <td>${empPayrollData._address}</td>
            <td>
                <img id ="${empPayrollData.id}" src="../assert/delete-black-18dp.svg" alt="Delete" onClick=remove(this)>
                <img id ="${empPayrollData.id}" src="../assert/create-black-18dp.svg" alt="Edit" onClick=update(this)>
            </td>
        </tr>`
        ;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}




const remove = (data) => {
  
    let employeeData = employeePayrollList.find(empData => empData.id == data.id);
    if (!employeeData) {
        return;
    }
    const index = employeePayrollList.map(empData => empData.id).indexOf(employeeData.id);
    if(site_properties.use_local_storage.match("true")){
        employeePayrollList.splice(index, 1);
        localStorage.setItem('AddressBookList', JSON.stringify(employeePayrollList));
        document.querySelector('.add-count').textContent = employeePayrollList.length;
        createInnerHtml();
    }else {
        const deleteUrl=site_properties.server_url+employeeData.id.toString();
        makeServiceCall("DELETE",deleteUrl,true)
            .then(response=>{
                console.log(response)
                document.querySelector(".emp-count").textContent=employeePayrollList.length;
                createInnerHtml();
            })
            .catch(error=>{
                alert("Error while deleting "+error)
            })
    }

}

const update = (data) => {

    let addressData = addressBookList.find(addData => addData.id == data.id);
    if (!addressData) {
        return;
    }
    localStorage.setItem('edit-add', JSON.stringify(addressData));
    window.location.replace(site_properties.add_employee_page);
}