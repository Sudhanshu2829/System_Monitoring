import {Component, inject, NgModule, OnInit} from '@angular/core';
import {MainService} from "./main.service";
import {TopwidgetComponent} from "../topwidget/topwidget.component";
import {compileNgModule} from "@angular/compiler";
import {ProcesstableComponent} from "../processtable/processtable.component";
import {CpuUsagechartComponent} from "../cpu-usagechart/cpu-usagechart.component";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TopwidgetComponent,
    ProcesstableComponent,
    CpuUsagechartComponent,
  ],
  providers:[MainService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent{

}

