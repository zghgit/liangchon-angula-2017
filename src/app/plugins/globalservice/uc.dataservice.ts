/**
 * Created by max on 2017/4/24.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class DataService {
    private data: any = {};

    constructor() {
    };

    public setData(key: string, value: string): void {
        this.data[key] = value;
    };

    public getData(key: string): string {
        return this.data[key] || false;
    };

    public setObject(key: string, value: any): void {
        this.data[key] = JSON.stringify(value);
    };

    public getObject(key: string): any {
        return JSON.parse(this.data[key] || false);
    };

    public setCookies(key: string, value: string|number, Days?: number): void {
        let d = new Date();
        d.setTime(d.getTime() + (Days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = key + "=" + value + "; " + expires;
    };

    public getCookies(key: string): string|number {
        let data = document.cookie;
        let dataArray = data.split("; ");
        for (let i = 0; i < dataArray.length; i++) {
            let varName = dataArray[i].split("=");
            if (varName[0] == key) {
                return decodeURI(varName[1]);
            }
        }
        return "";
    };

    public setLocalStorage(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public getLocalStorage(key: string): string {
        return JSON.parse(localStorage.getItem(key))
    }

    public clearLocalStorage(): void {
        localStorage.clear();
    }

    public clearCookies(): void {
        let myDate = new Date();
        myDate.setTime(-1000);//设置时间
        let data = document.cookie;
        let dataArray = data.split("; ");
        for (let i = 0; i < dataArray.length; i++) {
            let varName = dataArray[i].split("=");
            document.cookie = varName[0] + "=''; expires=" + myDate.toUTCString();
        }
    };

    public clearData(): void {
        this.data = {};
    };

    public clearAll(): void {
        this.clearCookies();
        this.clearData();
        this.clearLocalStorage();
    }

}
