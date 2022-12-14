class UserService {
    constructor() {
        this.endpoint = "https://race-crud-rest-mvc-default-rtdb.firebaseio.com";
    }
    // === READ USERS (GET) === //
    async getUsers() {
        const res = await fetch(`${this.endpoint}/users.json`);
        const data = await res.json();
        const userList = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
        return userList;
    }

    async getUser(id) {
        const res = await fetch(`${this.endpoint}/users/${id}.json`);
        const data = await res.json();
        return data;
    }

    // === CREATE (POST) === //
    async createUser(name, mail, image) {
        const newUser = { name, mail, image };
        const userAsJson = JSON.stringify(newUser);
        const res = await fetch(`${this.endpoint}/users.json`, { method: "POST", body: userAsJson });
        return res;
    }

    // === UPDATE (PUT) === //
    async updateUser(id, name, mail, image) {
        const userToUpdate = { name, mail, image };
        const userAsJson = JSON.stringify(userToUpdate);
        const res = await fetch(`${this.endpoint}/users/${id}.json`, { method: "PUT", body: userAsJson });
        return res;
    }

    // === DELETE (DELETE) === //
    async deleteUser(id) {
        const res = await fetch(`${this.endpoint}/users/${id}.json`, { method: "DELETE" });
        return res;
    }
}
const userService = new UserService();
export default userService;
