let inputTask = document.querySelector("#newTask");
let addTask = document.querySelector(".btn");
let tasks = document.querySelector("#taskList");

//quando aperta o enter vai a informção
inputTask.addEventListener("keypress", (e) => {
    //keypress é quando uma tecla for pressionada, keyCode é tecla enter! (é basicamente pra ir tanto no enter quanto no botão)
    if (e.keyCode === 13) {
        //verificar se o input ta vazio
        if (inputTask.value.trim() === "") {
            alert("Por favor digite uma tarefa");
        } else {
            let tarefa = {
                nome: inputTask.value,
                id: gerarId(), //identificar a tarefa
            };
            addingTask(tarefa);
        }
    }
});

//quando aperta o botão vai a informção
addTask.addEventListener("click", (e) => {
    if (inputTask.value.trim() === "") {
        alert("Por favor digite uma tarefa");
    } else {
        let tarefa = {
            nome: inputTask.value,
            id: gerarId(), //identificar a tarefa
        };
        //adicionar a tarefa ao html
        addingTask(tarefa);
    }
});

//criar função pra gerar o id
function gerarId() {
    return Math.floor(Math.random() * 3000); //retorna um numero entre 1 e 3000
    //math.floor retorna pro menor numero inteiro ex 45.3 math.floor retorna 45
}

//função de add tarefa,
function addingTask(tarefa) {
    let li = criarTagLi(tarefa); //li vai ser igual a function que criei ali embaixo
    tasks.appendChild(li); //li vai entrar dentro da tasks que é a ul (#taskList)
    inputTask.value = ""; //serve pra limpar a caixa de texto depois de add uma tarefa
}

//criar um novo item na lista já que fiz ul, para a informação ser passada - como a informação vai para o html (basicamente o que já fiz)
function criarTagLi(tarefa) {
    let li = document.createElement("li");
    li.id = tarefa.id;

    let divBg = document.createElement("div");
    divBg.classList.add("task");

    let input = document.createElement("input");
    input.classList.add("checkbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "checkbox");

    let span = document.createElement("span");
    span.classList.add("textTask");
    span.innerHTML = tarefa.nome;

    let div = document.createElement("div");
    div.classList.add("btn-changes");

    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit");
    btnEdit.innerHTML =
        ' <img src="assets/images/pencil-icon.png" alt="Icone de editar tarefa" width="13px" height="13px" /> ';
    btnEdit.addEventListener("click", () => editar(tarefa.id));

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.innerHTML =
        ' <img src="assets/images/trash-icon.png" alt="Icone de excluir tarefa" width="13px" height="13px" /> ';
    btnDelete.addEventListener("click", () => deletar(tarefa.id));

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    divBg.appendChild(input);
    divBg.appendChild(span);
    divBg.appendChild(div);

    li.appendChild(divBg);

    input.addEventListener("change", () => {
        if (input.checked) {
            span.style.cssText =
                "text-decoration-line: line-through; text-decoration-thickness: 0.1rem;";
        } else {
            span.style.cssText = "text-decoration-line: none";
        }
    });

    // btnEdit.addEventListener("click", () => {
    //     if (btnEdit.clicked) {
    //         span.style.cssText =
    //             "text-decoration-line: line-through; text-decoration-thickness: 0.1rem;";
    //     } else {
    //         span.style.cssText = "text-decoration-line: none";
    //     }
    // });

    return li;
}

//criar função de editar
function editar(idTarefa) {
    let li = document.getElementById(idTarefa); // seleciona o item da tarefa pelo id
    let span = li.querySelector(".textTask"); // seleciona o texto da tarefa dentro do <li>

    // pergunta ao usuário o novo texto da tarefa
    let novoTexto = prompt("Edite sua tarefa:", span.textContent);

    // se o usuário fornece um novo texto, atualiza a tarefa
    if (novoTexto !== null && novoTexto.trim() !== "") {
        span.textContent = novoTexto;
    }
}

//criar função de deletar
function deletar(idTarefa) {
    let confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
        let li = document.getElementById(idTarefa);
        if (li) {
            tasks.removeChild(li);
        }
    }
}
