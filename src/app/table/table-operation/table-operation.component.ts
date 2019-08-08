import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ArticleService } from '../article.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-operation',
  templateUrl: './table-operation.component.html',
  styleUrls: ['./table-operation.component.css']
})
export class TableOperationComponent {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private articleService: ArticleService) { }

  displayedColumns: string[] = ['id', 'title', 'category', 'writer', 'action'];
  dataSource = new MatTableDataSource(this.articleService.getAllArticles());
  controls: any;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  checkMe(type) {
    console.log("Action", type);
    type.editable = !type.editable;
  }

  updateField(index: any, field: any) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.articleService.update(index, field, control.value);
      console.log('sds', control.valid);
    }

  }

  getControl(index, fieldName) {
    const a = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}
