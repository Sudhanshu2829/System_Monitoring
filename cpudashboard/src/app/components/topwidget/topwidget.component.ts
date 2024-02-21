import {Component, inject, OnInit} from '@angular/core';
import { faLocation,faShop,faBoxes,faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MainService} from "../main/main.service";

@Component({
  selector: 'app-topwidget',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './topwidget.component.html',
  styleUrl: './topwidget.component.scss'
})
export class TopwidgetComponent implements OnInit {

  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;
  private mainService = inject(MainService);
  memoryUsage!: number;
  diskUsage!: number;
  process!: number;
  CPU_cores!: number;

  ngOnInit(): void {
    this.getSystemInfo()
  }

  getSystemInfo(): void {
    this.mainService.getSystemInfo().subscribe((data: number[]) => {
      this.memoryUsage = data[0];
      this.diskUsage = data[1];
      this.process = data[2];
      this.CPU_cores = data[3];
    });

  }
}
