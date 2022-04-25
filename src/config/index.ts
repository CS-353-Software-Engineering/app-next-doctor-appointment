import {loadAWS} from "./aws";

export class AppConfig{
    static shared = new AppConfig()

    private constructor() {}
    load(){
        loadAWS()
    }
}