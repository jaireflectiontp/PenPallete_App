import envConf from "../config/envConf";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket

    constructor() {
        this.client
            .setEndpoint(envConf.appwriteUrl)
            .setProject(envConf.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, content, slug, featuredImage, userId, status }) {
        try {
            return await this.databases.createDocument(
                envConf.appwriteDatabaseId,
                envConf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                envConf.appwriteDatabaseId,
                envConf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                envConf.appwriteDatabaseId,
                envConf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error', error);
            return false
        }

    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                envConf.appwriteDatabaseId,
                envConf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log('Appwrite service :: getPost :: error', error);

        }

    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                envConf.appwriteDatabaseId,
                envConf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            console.log('Appwrite service :: getPosts :: error', error);
            return false
        }

    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                envConf.appwriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error', error);
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                envConf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error', error);
            return false
        }
    }

    async getFilePreview(fileID) {
        try {
            return await this.bucket.getFilePreview(
                envConf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            console.log('Appwrite service :: getFilePreview :: error', error);
            return false
        }
    }
}

const service = new Service()

export default service