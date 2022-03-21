import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { categoriesListOption, CategoriesType } from 'src/app/models/category.interface';
import { Dish } from 'src/app/models/dishes.interface';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes-reports',
  templateUrl: './dishes-reports.component.html',
  styleUrls: ['./dishes-reports.component.scss']
})
export class DishesReportsComponent implements OnInit {
  formDish!: FormGroup;
  addDish!: FormGroup;
  public show: boolean = false;
  categoriesList!: categoriesListOption<CategoriesType>[];
  
  get dishesList(): FormArray { return this.formDish.get('dishesList') as FormArray; } 
  
  allDishes$ = new Subject<Dish[]>();

  constructor(private fb: FormBuilder, private dishesService:DishesService) { }

  ngOnInit(): void {

    this.categoriesList = [
   { label: 'Суп', value:CategoriesType.Sup},
   { label: 'Салат', value: CategoriesType.Salad },
   { label: 'Гарячее блюдо или гарнир', value: CategoriesType.Hot},
  { label: 'Десерт', value: CategoriesType.Dessert }
    ];
    
    this.initDishForm();
    this.getAllDishes();
  }

   initDishForm() {
    this.addDish = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)]
      ],
      description: ['', [
        Validators.required,Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      imageURL: ['', [Validators.required]],
      ingredients: [''],
      category:[null]
      
    });

   }
  
  
    isControlInvalid(controlName: string): boolean {
    const control = this.addDish.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
    }
  
  addNewDish() {
    const newDish = { ...this.addDish.value };
    this.dishesService.addDish(newDish).subscribe((dish) => {
  
    });
    this.addDish.reset();
    alert('Блюдо добавлено');

  }

  editDish(form: any) {
    form.enable();
  }

  saveDish(dish: any) {
    console.log((dish as FormGroup).value)
    this.dishesService.editDish(dish).subscribe(() => {
      this.getAllDishes();
    });
  }


  getAllDishes() {
    this.dishesService.getDishes().subscribe((dishes) => {
      this.allDishes$.next(dishes);
      console.log(dishes);
      this.formDish = new FormGroup({
        dishesList: new FormArray(
          dishes.map(dish => this.fb.group({
            id: [{ value: dish.id, disabled: true }], name: [{ value: dish.name, disabled: true }],
            description: [{ value: dish.description, disabled: true }], price: [{ value: dish.price, disabled: true }],
            imageURL: [{ value: dish.imageURL, disabled: true }], ingredients: [{ value: dish.ingredients, disabled: true }],
            category: [{ value: dish.category, disabled: true }]

          }))
        )
      })

    })
  }

  deleteDish(dish:any) {
     
    // this.users = this.users.filter(data => data !== user);
    // this.authService.deleteUser(user.id).subscribe((data) => {
    // console.log(data);
    // });
    // this.userList$ = this.authService.getUsers();
    }

}
