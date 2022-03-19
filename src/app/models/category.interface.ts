export interface Category{
    id?: string;
    name?:string;
}

export enum CategoriesType {
    Sup = '01',
    Salad = '02',
    Hot = '03',
    Dessert='04'

}
export interface categoriesListOption<T> {
    label: string,
    value: T
}