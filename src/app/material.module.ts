import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatGridListModule, MatDialogModule, MatInputModule, MatSelectModule,
  MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTableModule,
  NoConflictStyleCompatibilityMode, MatChipsModule, MatProgressSpinnerModule, MatSortModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatChipsModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NoConflictStyleCompatibilityMode
  ],
  exports: [
    MatAutocompleteModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatChipsModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NoConflictStyleCompatibilityMode
  ]
})
export class MaterialModule { }
