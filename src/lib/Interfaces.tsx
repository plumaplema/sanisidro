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