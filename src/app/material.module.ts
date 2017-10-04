import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatGridListModule, MatDialogModule, MatInputModule, MatSelectModule,
  MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTableModule,
  NoConflictStyleCompatibilityMode, MatChipsModule } from '@angular/material';

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
    NoConflictStyleCompatibilityMode
  ]
})
export class MaterialModule { }
