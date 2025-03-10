import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage {

    private static key = "customerAuth";

    static async setAuthToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(this.key, token);
        } catch (error: unknown) {
            console.log("SETAUTHTOKEN: " + error)
        }
    }

    static async getAuthToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(this.key);
        } catch (error: unknown) {
            console.log("GETAUTHTOKEN: " + error)
            return null;
        }
    }

    static async reset(): Promise<void> {
        await AsyncStorage.removeItem(this.key);
    }

}