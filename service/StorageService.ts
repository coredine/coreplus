import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class Storage {

    private static key = "auth";

    static async setAuthToken(token: String): Promise<void> {
        
    }

    static async getAuthToken(): Promise<String> {
        return "...";
    }

}