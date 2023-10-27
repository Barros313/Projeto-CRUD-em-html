const cpfInput = document.getElementById("cpfInput");
const nameInput = document.getElementById("nameInput");
const functionInput = document.getElementById("functionInput");
const addButton = document.getElementById("addButton");
const tableBody = document.getElementById("tableBody");
const updateCpfInput = document.getElementById("updateCpfInput");
const updateNameInput = document.getElementById("updateNameInput");
const updateFunctionInput = document.getElementById("updateFunctionInput");
const updateButton = document.getElementById("updateButton");
const cancelButton = document.getElementById("cancelButton");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
let validCpfFormat = /^\d{3}.\d{3}.\d{3}-\d{2}$/;

function renderTable()
{
    tableBody.innerHTML = "";
    for (let i = 0; i < users.length; i++)
    {
        const user = users[i];

        const tr = document.createElement("tr");
        const idTd = document.createElement("td");
        const cpfTd = document.createElement("td");
        const nameTd = document.createElement("td");
        const functionTd = document.createElement("td");
        const actionsTd = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.className = "classEditButton";
        const deleteButton = document.createElement("button");
        deleteButton.className = "classDeleteButton";

        idTd.innerText = user.id;
        cpfTd.innerText = user.cpf;
        nameTd.innerText = user.name;
        functionTd.innerText = user.function;
        editButton.innerText = "Editar";
        deleteButton.innerText = "Remover";

        editButton.addEventListener("click", () => {
            showUpdateForm(user.id);
        });
        deleteButton.addEventListener("click", () => {
            deleteUser(user.id);
        });

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);

        tr.appendChild(idTd);
        tr.appendChild(cpfTd);
        tr.appendChild(nameTd);
        tr.appendChild(functionTd);
        tr.appendChild(actionsTd);

        tableBody.appendChild(tr);
    }
}

function addUser()
{
    const userCpf = cpfInput.value.trim();
    const userName = nameInput.value.trim();
    const userFunction = functionInput.value.trim();

    if (userCpf.match(validCpfFormat)) /* Se houver erro verificar */
    {
        if(userName && userFunction != null) /* Se houver erro verificar */
        {
            var id = 1;
            var val = users.map(function(x) { return x.id; }).indexOf(id);

            while (val != -1)
            {
                id++;
                val = users.map(function(x) { return x.id; }).indexOf(id);
            }
            const user =
            {
                id: id,
                cpf: userCpf,
                name: userName,
                function: userFunction,
            };
    
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            cpfInput.value = "";
            nameInput.value = "";
            functionInput.value = "";
            renderTable();
        }
        else
        {
            alert("Nome e/ou função em branco, por favor preencher!");
        }
    }
    else
    {
        alert("CPF inválido");
    }
}

function updateUser()
{
    const userCpf = updateCpfInput.value;
    const userName = updateNameInput.value;
    const userFunction = updateFunctionInput.value;

    if (userCpf.match(validCpfFormat))
    {
        const index = users.findIndex((user) => user.id === currentUserId);
        if (index !== -1)
        {
            users[index].cpf = userCpf;
            users[index].name = userName;
            users[index].function = userFunction;
            hideUpdateForm();
            renderTable();
        }
    }
    else
    {
        alert("CPF inválido");
    }
}

function showUpdateForm(userId)
{
    const user = users.find((user) => user.id === userId) /* Verificar caso erro */
    if (user)
    {
        updateCpfInput.value = user.cpf;
        updateNameInput.value = user.name;
        updateFunctionInput.value = user.function;
        currentUserId = user.id;

        updateButton.addEventListener("click", updateUser);
        cancelButton.addEventListener("click", hideUpdateForm);
        updateButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";

        updateCpfInput.style.display = "inline-block";
        updateNameInput.style.display = "inline-block";
        updateFunctionInput.style.display = "inline-block";

        document.getElementById("updateContainer").style.display = "block";
    }
}

function hideUpdateForm()
{
    updateCpfInput.value = "";
    updateNameInput.value = "";
    updateFunctionInput.value = "";
    currentUserId = null;

    updateButton.removeEventListener("click", updateUser);
    cancelButton.removeEventListener("click", hideUpdateForm);

    updateButton.style.display = "none";
    cancelButton.style.display = "none";
    updateCpfInput.style.display = "none";
    updateNameInput.style.display = "none";
    updateFunctionInput.style.display = "none";

    document.getElementById("updateContainer").style.display = "none";
}

function deleteUser(userId)
{
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));
    if (users.length == 0)
    {
        hideUpdateForm();
    };
    renderTable();
}

addButton.addEventListener("click", addUser);

renderTable();