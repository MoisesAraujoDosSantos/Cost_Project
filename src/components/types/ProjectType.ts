export interface Category { id: string, name: string }
export interface Service { id?: string, name?: string, cost?: string, description?: string }
export interface ProjectType {
    id: string
    name?: string
    budget: string
    category: Category
    cost: string
    services: Service[]
}

type Juntadao = Record<number|string, string|Category>;

const teste: Juntadao = {
    "aaa": "aaaaa",
    1: "aaaa"
}
