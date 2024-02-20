import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-processtable',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './processtable.component.html',
  styleUrl: './processtable.component.scss'
})
export class ProcesstableComponent implements OnInit{
  public getJsonValue:any=[];
  public displayColumn: string[]=["pid","name","status","cpu_times_user","cpu_times_system","memory_info_rss","memory_info_vms","num_threads"];
  public dataSource:any=[];
  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod(){
    this.http.get("http://127.0.0.1:8000/mongoprocess").subscribe((data)=>{
      //console.table(data);
      this.getJsonValue=data;
      this.dataSource=data;
    });
  }

}
