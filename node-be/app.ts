import "reflect-metadata";
import {createConnection, ConnectionOptions, Connection} from "typeorm";
import Task from "./entity/Task";

export default class Store {
    private static _conn: Connection;
 
    // データベースの設定
    public static connectionOptions: ConnectionOptions = {
        driver: {
            type: 'sqlite',
            storage: __dirname + '/test.db', // './test.db',
            database: 'Tasks'
        },
        entities: [
            // テーブルクラス
            Task
        ],
        autoSchemaSync: true
    };
 
    public static async createConnection() {
        if (!this._conn) {
            this._conn = await createConnection(this.connectionOptions);
        }
        return this._conn;
    }
}
// createConnection({
//     driver: {
//         type: "mysql",
//         host: "localhost",
//         port: 3306,
//         username: "root",
//         password: "admin",
//         database: "test"
//     },
//     entities: [
//         Photo
//     ],
//     autoSchemaSync: true,
// }).then(connection => {
//     // here you can start to work with your entities
// }).catch(error => console.log(error));