// ========== imports ========== //
import "./router.js";
import userService from "./user-service.js";

function displayUsers(userList) {
    document.querySelector("#users-grid").innerHTML = "";

    for (const user of userList) {
        const html = /*html*/ `
             <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.mail}">${user.mail}</a>
                 <div>
                    <button class="btn-update-user" data-id="${user.id}">Update</button>
                    <button class="btn-delete-user" data-id="${user.id}">Delete</button>
                </div>
            </article>
        `;
        document.querySelector("#users-grid").insertAdjacentHTML("afterbegin", html);
    }

    document.querySelector("#users-grid").innerHTML = html;
}

async function onUsersListChanged() {
    const users = await userService.getUsers();
    displayUsers(users);
}

onUsersListChanged();
