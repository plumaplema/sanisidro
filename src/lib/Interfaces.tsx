import { Office } from "@prisma/client"

export interface ADDSTUDENT {
    id: number, student_name: string, level: number, section: string
}

export interface QUERYPARAMS {
    code: string
    index_position: number
    json: boolean
    key_type?: "i64"
    limit?: number
    lower_bound?: string
    scope: string
    table: string
    upper_bound?: string
}

export interface BodyAddStudent {
    Lrn: number
    FirstName: string
    LastName: string
    sectionId: number
}

export interface FeedBack {
    transactionNameId: string
    criteriaNameIds: {
        id: string
        CriteriaScore: number
    }[]
}

export interface FeedBackPostData {
    customerName: string
    age: number
    gender: string
    office: Office
    start: Date
    criteriaScores: Array<CriteriaScore>
    customerCategoriesId: string
    transactionCategoriesId: string

}

export interface CriteriaScore {
    id: string
    score: number
}

export interface FeedBackPostDatas {
    datas: Array<FeedBackPostData>
}