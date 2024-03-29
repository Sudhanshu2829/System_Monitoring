import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {HttpClient} from "@angular/common/http";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-processtable',
  standalone: true,
  imports: [MatTableModule, MatButton],
  templateUrl: './processtable.component.html',
  styleUrl: './processtable.component.scss'
})
export class ProcesstableComponent implements OnInit{
  public getJsonValue:any=[];
  public displayColumn: string[]=["pid","name","status","cpu_times_user","cpu_times_system","memory_info_rss","memory_info_vms","num_threads","kill"];
  public dataSource:any=[];
  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod(){
    this.http.get("http://127.0.0.1:8000/process").subscribe((data)=>{
      //console.table(data);
      this.getJsonValue=data;
      this.dataSource=data;
    });
  }

  public killProcess(pid: number) {
    // Send HTTP DELETE request to backend to kill the process
    this.http.delete(`http://127.0.0.1:8000/process/${pid}`).subscribe(() => {
      // Process deleted successfully, remove it from the table
      this.dataSource = this.dataSource.filter((process: any) => process.pid !== pid);
      console.log("process deleted");
    });
  }

}
