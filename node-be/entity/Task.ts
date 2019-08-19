import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

// テーブルのinterface（なくても大丈夫）
export interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}
 
// テーブルの定義
@Entity()
export default class Task implements ITask {
    // タスクのID
    // int型で、自動インクリメントしてくれるカラム
    @PrimaryGeneratedColumn({ type: 'int', generated: true})
    id: number;
 
    // タスクのタイトル
    // string型のカラム
    @Column('string')
    title: string;
 
    // タスクの状態
    // boolean型のカラム 
    @Column('boolean', { default: false })
    is_done: boolean;
}