
export interface IBase {
    code: number,
    message: string
}

export interface IOne<T> extends IBase {
    data: T
}

export interface IList<T> extends IBase {
    datas: T[]
}

export interface IPage {
    total: number,
    offset: number
}

export interface IListResponse<T> extends IList<T>, IPage { }