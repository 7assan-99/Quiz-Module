import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatTooltipModule} from '@angular/material/tooltip'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const Material = [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule
]

@NgModule({
    imports:[Material],
    exports:[Material]
})
export class AngularMaterialModule{}