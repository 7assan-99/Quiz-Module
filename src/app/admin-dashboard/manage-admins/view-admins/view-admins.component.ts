import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DeletePromptComponent } from 'src/app/DIalogs/delete-prompt/delete-prompt.component';
import { EditDialogAdminComponent } from 'src/app/DIalogs/edit-dialog-admin/edit-dialog-admin.component';
import { AdminService } from 'src/app/Services/admin.service';
import { Admin } from 'src/app/entities/admin.entity';

@Component({
  selector: 'app-view-admins',
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.scss'],
})
export class ViewAdminsComponent {
  constructor(private aService: AdminService, private dialog: MatDialog,private jwtHelper: JwtHelperService) {}

  data: any[] = [];
  dataSource = new MatTableDataSource();
  id: any;
  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let payload = this.jwtHelper.decodeToken(token);
    this.id = payload.sub
    this.aService.getAdmins().subscribe((val: Admin[]) => {
      this.data = val;
      this.dataSource.data = this.data.filter((val)=> val.ID != payload.sub);
    });
  }

  displayedColumns: string[] = ['ID', 'Name', 'Email', 'isMasterAdmin', 'Actions'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getFieldById(id: number) {
    return this.data.filter((val: any) => val.ID == id);
  }

  showDialog(id: any) {
    let fieldsData = this.getFieldById(id)[0];
    const d = this.dialog.open(EditDialogAdminComponent, {
      data: fieldsData,
    });
    d.afterClosed().subscribe((val: any) => {
      if (val) {
        fieldsData.Name = val.name
        fieldsData.isMasterAdmin = val.isMasterAdmin
        this.aService.updateAdmin(id, fieldsData).subscribe(() => {
          this.data.filter((val) => val.ID == id, { fieldsData });
        });
      }
    });
  }

  deleteRecord(id: any) {
    const d = this.dialog.open(DeletePromptComponent, { disableClose: true });
    d.afterClosed().subscribe(({ data }: any) => {
      if (data) {
        if (data.isConfirmed) {
          this.aService.deleteAdmin(id).subscribe(() => {
            this.data = this.data.filter((val) => val.ID != id && val.ID != this.id);
            this.dataSource.data = this.data;
          });
        }
      }
    });
  }
}
