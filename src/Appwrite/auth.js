import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
        }
        login= async ({email, password}) =>{
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        // this method will tells that user is logged in or not, if we refresh the page after login.
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }   
        return null;
    }
    async logout() {
        try {
            const res = await this.account.deleteSession("current");
                console.log("Appwrite service :: logout :: success", res);
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }   
        }



}

const authService = new AuthService();
export default authService;