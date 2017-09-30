import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatGridListModule, MatDialogModule, MatInputModule, MatSelectModule,
  MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTableModule,
  NoConflictStyleCompatibilityMode } from '@angular/material';

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
    NoConflictStyleCompatibilityMode
  ]
})
export class MaterialModule { }
