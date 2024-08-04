import { UserServiceService } from './../../services/user/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from './../../services/food-service/food.service';
import { GlobleService } from './../../services/globle-service/globle.service';
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isHome = false;
  selectedTags: any = [];
  selectedOrigins: any = [];
  editFoodId: string = '';
  deleteFoodId: string = '';
  deleteUserIdString: string = '';
  foods: any[] = [];
  users: any[] = [];
  showEditForm: any = '';
  isEditFormValid = false;
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
    'Juice',
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
  constructor(
    private AuthService: AuthService,
    public GlobleService: GlobleService,
    private FoodService: FoodService,
    private Router: Router,
    private ToastrService: ToastrService,
    private UserServiceService: UserServiceService
  ) {}
  protected readonly value = signal('');

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    tags: new FormArray([]),
    origins: new FormArray([]),
  });
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isHome = true;

    this.AuthService.getAdminLogin().subscribe({
      next: (res) => {
        console.log(res);
        this.GlobleService.adminName = res.data.name;
        this.GlobleService.imgUrl = res.data.image;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.FoodService.showFood().subscribe({
      next: (res) => {
        console.log(res);
        this.FoodService.foods.next(res.data);
        this.FoodService.foods$.subscribe({
          next: (res) => {
            console.log(res);
            this.foods = res.food;
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.UserServiceService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.UserServiceService.users.next(res.data);
        this.UserServiceService.users$.subscribe((res) => {
          console.log(res);
          this.users = res;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.isHome = false;
    console.log(this.isHome);
  }
  // handelOriginsSelect(origins: any) {
  //   console.log(origins.value);
  //   console.log('lol');
  // }
  // handelTagsSelect(tags: any) {
  //   console.log(tags.value);
  //   console.log('lol');
  // }
  tagClick(tag: string) {
    console.log(tag);
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(this.selectedTags.indexOf(tag));
    }
    console.log(this.selectedTags);
    if (this.selectedTags.length == 0 || this.selectedOrigins.length == 0) {
      this.isEditFormValid = false;
    } else {
      this.isEditFormValid = true;
    }
  }
  originsClick(origin: string) {
    console.log(origin);
    if (!this.selectedOrigins.includes(origin)) {
      this.selectedOrigins.push(origin);
    } else {
      this.selectedOrigins.splice(this.selectedTags.indexOf(origin));
    }
    console.log(this.selectedOrigins);
    if (this.selectedTags.length == 0 || this.selectedOrigins.length == 0) {
      this.isEditFormValid = false;
    } else {
      this.isEditFormValid = true;
    }
  }
  editFood(food: { _id: string }) {
    this.editFoodId = food._id;
    console.log(this.editFoodId);
    this.showEditForm = '';
    this.isEditFormValid = false;
  }
  deleteFood(food: { _id: string }) {
    this.deleteFoodId = food._id;
    console.log(this.deleteFoodId);
  }
  handelEditForm() {
    console.log('here');
    // this.editForm.value.tags = this.selectedTags;
    // this.editForm.value.origins = this.selectedOrigins;
    // const formTagsData = this.editForm.get('tags') as FormArray;
    // formTagsData.push(
    //   this.selectedTags.map((tag: string) => {
    //     return new FormControl(tag, Validators.required);
    //   })
    // );

    // const formOriginsData = this.editForm.get('origins') as FormArray;
    // formOriginsData.push(
    //   this.selectedOrigins.map((origin: string) => {
    //     return new FormControl(origin, Validators.required);
    //   })
    // );

    // console.log(this.editForm.value);
    if (this.editForm.valid) {
      if (this.selectedTags.length == 0 || this.selectedOrigins.length == 0) {
        this.ToastrService.error('Please Select Tags and Origins');
        return;
      }
      this.editForm.value.tags = this.selectedTags;
      this.editForm.value.origins = this.selectedOrigins;
      this.isEditFormValid = true;

      console.log(this.isEditFormValid);

      // console.log(this.editForm.value);
      this.FoodService.updateFood(
        this.editFoodId,
        this.editForm.value
      ).subscribe({
        next: (res) => {
          console.log(res);
          this.FoodService.foods.next(res.data);
          this.ToastrService.success('Food Updated Successfully');
          this.selectedTags = [];
          this.selectedOrigins = [];
          this.editForm.reset();
          this.editFoodId = '';
          this.showEditForm = 'modal';
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error('Something went wrong', err.massage);
        },
      });
    } else {
      this.ToastrService.error('Please Enter Valid Data');
    }
  }

  // handelSubmit() {
  //   console.log(this.editForm.value);
  // }
  handelDeleteFood() {
    this.FoodService.deleteFood(this.deleteFoodId).subscribe({
      next: (res) => {
        console.log(res);
        this.FoodService.foods.next(res.data);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteUserId(userId: string) {
    this.deleteUserIdString = '';
    console.log(userId);
    this.deleteUserIdString = userId;
  }
  handelDeleteUser() {
    this.UserServiceService.deleteUser(this.deleteUserIdString).subscribe({
      next: (res) => {
        console.log(res);
        this.UserServiceService.users.next(res.data);
        this.ToastrService.success('User Deleted Successfully');
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message, 'Something went wrong');
      },
    });
  }
  handelBlock(userId: string) {
    this.UserServiceService.blockUser(userId).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.UserServiceService.users.next(res.data);
        this.ToastrService.success('User Blocked Successfully');
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message, 'Something went wrong');
      },
    });
  }
  handelUnblock(userId: string) {
    this.UserServiceService.unBlockUser(userId).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.UserServiceService.users.next(res.data);
        this.ToastrService.success('User UnBlocked Successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
