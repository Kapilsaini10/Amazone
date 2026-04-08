import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // 1. GET ALL PRODUCTS (For your Home Page)
    async getProducts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getProducts :: error", error);
            return false;
        }
    }

    // 2. ADD TO CART / CREATE ORDER
    // We can store orders in a separate 'orders' collection
    async createOrder({ userId, items, totalAmount, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
              conf.appwriteCollectionId, // Add this to your conf.js
                ID.unique(),
                {
                    userId,
                    items, // Array of product IDs
                    totalAmount,
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createOrder :: error", error);
        }
    }

    // 3. FILE UPLOAD (For Product Images)
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // 4. DELETE PRODUCT (If user is Admin)
    async deleteProduct(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteProduct :: error", error);
            return false;
        }
    }
    async getOrders(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, // Your orders collection ID
                [Query.equal("userId", userId)]
            );
        } catch (error) {
            console.log("Appwrite service :: getOrders :: error", error);
            return false;
        }   }
}

const service = new Service();
export default service;