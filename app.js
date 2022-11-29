// ========== imports ========== //
import router from "./router.js";
import userService from "./user-service.js";

let selectedUserId;

function displayUsers(userList) {
    const userGrid = document.querySelector("#users-grid");
    userGrid.innerHTML = "";

    for (const user of userList) {
        const userHTML = /*html*/ `
            <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.mail}">${user.mail}</a>
                 <div class="btns">
                    <button class="btn-update-user">Update</button>
                    <button class="btn-delete-user">Delete</button>
                </div>
            </article>
        `;
        userGrid.insertAdjacentHTML("beforeend", userHTML);
        userGrid.querySelector("article:last-child .btn-update-user").addEventListener("click", () => handleShowUser(user));
        userGrid.querySelector("article:last-child .btn-delete-user").addEventListener("click", () => handleDeleteUser(user));
    }
}

async function handleCreateUser(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const mail = event.target.mail.value;
    const image = event.target.image.value;
    await userService.createUser(name, mail, image);
    await onUsersListChanged();
    router.navigateTo("#/");
}

async function handleShowUser(user) {
    selectedUserId = user.id;
    const form = document.querySelector("#form-update");
    form.name.value = user.name;
    form.mail.value = user.mail;
    form.image.value = user.image;
    router.navigateTo("#/update-user");
}

async function handleUpdateUser(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const mail = event.target.mail.value;
    const image = event.target.image.value;
    await userService.updateUser(selectedUserId, name, mail, image);
    await onUsersListChanged();
    router.navigateTo("#/");
}

async function handleDeleteUser(user) {
    const shouldDelete = confirm(`Are you sure you want to delete "${user.name}"?`);
    if (shouldDelete) {
        await userService.deleteUser(user.id);
        onUsersListChanged();
    }
}

async function onUsersListChanged() {
    const users = await userService.getUsers();
    displayUsers(users);
}

function initApp() {
    onUsersListChanged();

    if (!selectedUserId) {
        router.navigateTo("#/");
    }
}

// EVENTS
window.addEventListener("load", initApp);
document.querySelector("#form-create").addEventListener("submit", handleCreateUser);
document.querySelector("#form-update").addEventListener("submit", handleUpdateUser);
