import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './category-crud.component.html',
})
export class CategoryCrudComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;
  editMode = false;
  editCategoryId?: number;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentCategoryId: [null],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response && response.$values) {
        this.categories = response.$values;
        console.log(this.categories);
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    const category: any = this.categoryForm.value;

    if (this.editMode && this.editCategoryId != null) {
      console.log(this.editCategoryId, category.name);
      this.categoryService
        .updateCategory(this.editCategoryId, category.name)
        .subscribe(() => {
          this.loadCategories();
          this.editMode = false;
          this.editCategoryId = undefined;
          this.categoryForm.reset();
        });
    } else {
      this.categoryService.addCategory(category).subscribe(() => {
        this.loadCategories();
        this.categoryForm.reset();
      });
    }
  }

  onEdit(category: any): void {
    this.categoryForm.patchValue(category);
    this.editMode = true;
    this.editCategoryId = category.id;
  }
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  onCancel(): void {
    this.editMode = false;
    this.editCategoryId = undefined;
    this.categoryForm.reset();
  }
}
