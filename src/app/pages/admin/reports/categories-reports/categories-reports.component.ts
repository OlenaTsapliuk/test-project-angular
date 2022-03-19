import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { categoriesListOption, CategoriesType, Category } from 'src/app/models/category.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-reports',
  templateUrl: './categories-reports.component.html',
  styleUrls: ['./categories-reports.component.scss']
})
export class CategoriesReportsComponent implements OnInit, OnDestroy {
 categoriesList!: categoriesListOption<CategoriesType>[];
 
  public categories: Category[] = [];
  allCategories$ = new BehaviorSubject<Category[]>(this.categories);
  categoriesSubscribe!: Subscription;

  addCategory!: FormGroup;
  formTemp!: FormGroup;
  get categoryArray(): FormArray { return this.formTemp.get('categoryArray') as FormArray; } 

  constructor(private fb: FormBuilder,private categoriesService: CategoriesService) { }

  ngOnInit(): void {
       this.categoriesSubscribe = this.allCategories$.subscribe(categories => {
      this.categories = categories;
    
    })

 
    
    this.initCategoryForm();
    this.getAllCategory();
  }


  ngOnDestroy(): void {

    this.categoriesSubscribe.unsubscribe();
  }
  
  initCategoryForm() {
    this.addCategory = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)]
      ]
    });
   
  }
  addNewCategory() {
    const newCategory = { ...this.addCategory.value };
    this.categoriesService.addCategory(newCategory).subscribe((category) => {
      console.log('newCategory', category) 
    })
    this.name.reset();
}
    
  get name(): any { return this.addCategory.get('name'); }
  
  
  editCategory(name: HTMLInputElement) {
    name.disabled = false;
  }

  saveCategory(value: string, id: string) {
    this.categoriesService.editCategory(id, { name: value }).subscribe(() => {
      this.getAllCategory();
    });
  }


  getAllCategory() {
    this.categoriesService.getCategories().subscribe((categories) => {
      console.log(categories);
      this.allCategories$.next(categories)
      this.formTemp = new FormGroup({
        categoryArray: new FormArray(
          categories.map(v => this.fb.group({ id: [{value: v.id, disabled: true}], name: [{value: v.name, disabled: true}]})),
      ),
      });
      
    })
   
  }

}
