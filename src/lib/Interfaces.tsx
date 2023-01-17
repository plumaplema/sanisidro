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
    feedback: Array<FeedBack>
    Name: string
    Age: number
    Gender: string,
    customerName: "Learner" | "Parent" | "Teaching Personnel" | "Non-Teaching Personnel" | "School Administrator/School Head" | "Other Stakeholders"
}

export interface Transaction {
    Transaction: {
        connect: {
            id: string;
        };
    };
    CriteriaScore: {
        create: Criterias[];
    };
}

export interface Criterias {
    Criteria: {
        connect: {
            id: string
        }
    },
    CriteriaScore: number

}
