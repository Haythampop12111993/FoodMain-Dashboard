import { Router } from '@angular/router';
import { GlobleService } from './../../services/globle-service/globle.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FoodService } from '../../services/food-service/food.service';
import { flush } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  location = '';
  foodOrigins: string[] = [
    'indian',
    'italian',
    'chinese',
    'american',
    'japanese',
    'french',
    'german',
    'mediterranean',
    'thai',
    'vietnamese',
    'brazilian',
    'korean',
    'mexican',
    'middle eastern',
    'moroccan',
    'peruvian',
    'spanish',
    'turkish',
    'vegan',
    'vegetarian',
    'western',
    'egyptian',
  ];
  foodTags: string[] = [
    'juice',
    'drink',
    'snack',
    'dessert',
    'fastfood',
    'pizza',
    'lunch',
    'slowfood',
    'hamburger',
    'fry',
    'soup',
  ];
  errorMessage: { [key: string]: any } = {
    isCookingTimeError: false,
    cookingTimeError: '',
    isTagsError: false,
    isOriginsError: false,
    tags: [],
    origins: [],
  };

  constructor(
    private foodService: FoodService,
    private toastr: ToastrService,
    private GlobleService: GlobleService,
    private Router: Router
  ) {
    this.location = window.location.pathname;
    console.log(this.location);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GlobleService.isHome = false;
    console.log('here');
  }
  foodFromData = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    foodImage: new FormControl('', Validators.required),
    tags: new FormArray([], Validators.required),
    origins: new FormArray([], Validators.required),
    cookingTime: new FormControl('', Validators.required),
    stars: new FormControl('', {
      validators: [Validators.required, Validators.min(0), Validators.max(5)],
    }),
  });
  get controls() {
    return this.foodFromData.controls;
  }
  addItemToFormArray(item: String, formArrayName: string) {
    const formArray = this.foodFromData.get(formArrayName) as FormArray;
    if (formArray.value.includes(item)) {
      return;
    }
    if (formArrayName == 'tags') {
      if (item == '') {
        this.toastr.error('Tag is required', 'Error', {
          timeOut: 2000,
          progressBar: true,
        });
        return;
      }
      if (!this.foodTags.includes(item as string)) {
        this.errorMessage['isTagsError'] = true;
        this.errorMessage['tags'].push(item);
        console.log('Invalid Tag');
        this.toastr.error(
          `Invalid Tags ${this.errorMessage['tags'].join(' , ')} `,
          'Error',
          {
            timeOut: 2000,
            progressBar: true,
          }
        );
        return;
      }
      this.errorMessage['isTagsError'] = false;
    }
    if (formArrayName == 'origins') {
      if (item == '') {
        this.toastr.error('Origin is required', 'Error', {
          timeOut: 2000,
          progressBar: true,
        });
        return;
      }
      if (!this.foodOrigins.includes(item.toLowerCase() as string)) {
        this.errorMessage['isOriginsError'] = true;
        this.errorMessage['origins'].push(item);
        this.toastr.error(
          `Invalid Origins ${this.errorMessage['origins'].join(' , ')} `,
          'Error',
          {
            timeOut: 2000,
            progressBar: true,
          }
        );
        return;
      }
      this.errorMessage['isOriginsError'] = false;
    }
    formArray.push(new FormControl(item, Validators.required));
  }
  handelInputData(inputData: any, formArrayName: string) {
    console.log(inputData);
    const tagsArray = inputData
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item != '')
      .map((item: string) => item.toLowerCase());
    const formArray = this.foodFromData.get(formArrayName) as FormArray;
    formArray.clear();
    this.errorMessage['tags'] = [];
    this.errorMessage['origins'] = [];
    tagsArray.forEach((item: any) => {
      this.addItemToFormArray(item, formArrayName);
    });
    console.log(tagsArray);
  }
  onFileSelected(event: any) {
    console.log(event);
    this.foodFromData.controls['foodImage'].setValue(event.target.files[0]);
  }
  addFoodData() {
    if (this.foodFromData.valid) {
      console.log(this.foodFromData.value);
      const formData = new FormData();
      formData.append('name', this.foodFromData.value.name ?? '');
      formData.append('price', this.foodFromData.value.price ?? '');
      formData.append('foodImage', this.foodFromData.value.foodImage ?? '');
      this.foodFromData.value.tags?.forEach((tag: string) => {
        formData.append('tags', tag.charAt(0).toUpperCase() + tag.slice(1));
      });
      this.foodFromData.value.origins?.forEach((origin: string) => {
        formData.append(
          'origins',
          origin.charAt(0).toUpperCase() + origin.slice(1)
        );
      });
      let cookingTime = this.foodFromData.value.cookingTime;
      if (cookingTime?.includes('minutes')) {
        cookingTime = cookingTime.replace('minutes', '');
      }
      if (
        cookingTime &&
        cookingTime.includes('-') &&
        cookingTime.split('-').length == 2
      ) {
        formData.append('cookingTime', cookingTime ?? '');
        this.errorMessage['isCookingTimeError'] = false;
      } else {
        this.errorMessage['isCookingTimeError'] = true;
        this.errorMessage['cookingTimeError'] =
          `Invalid Cooking Time You Should Enter Like 10-15 ` +
          `${this.foodFromData.value.cookingTime} Is Not Valid`;
      }
      formData.append('stars', this.foodFromData.value.stars ?? '');
      console.log(this.foodFromData.value.foodImage);
      console.log(formData);
      if (
        this.foodFromData.valid &&
        !this.errorMessage['isTagsError'] &&
        !this.errorMessage['isOriginsError'] &&
        !this.errorMessage['isCookingTimeError']
      ) {
        this.foodService.addFood(formData).subscribe({
          next: (res) => {
            console.log(res);
            this.foodService.foods.next(res.data);
            this.toastr.success('Food Added Successfully', 'Success', {
              timeOut: 2000,
              progressBar: true,
            });
            this.foodFromData.reset();
            this.errorMessage['isCookingTimeError'] = false;
            this.errorMessage['cookingTimeError'] = '';
            this.errorMessage['isTagsError'] = false;
            this.errorMessage['tags'] = [];
            this.errorMessage['isOriginsError'] = false;
            this.errorMessage['origins'] = [];
            this.Router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Food Added Failed', 'Error', {
              timeOut: 2000,
              progressBar: true,
            });
          },
        });
      }
    }
  }
}
