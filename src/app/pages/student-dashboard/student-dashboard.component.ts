import { Component } from '@angular/core';
import { EChartsOption } from 'echarts'; // Correct type
import { NgxEchartsDirective } from "ngx-echarts";

import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/ui/navbar/navbar.component";
import { StudentLayoutComponent } from "../../components/layout/student-layout/student-layout.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule, NavbarComponent, StudentLayoutComponent], // Removed NgxEchartsModule
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'] // Fixed typo (styleUrls as array)
})
export class StudentDashboardComponent {
  progressChartOpt: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Math', 'Science', 'History', 'English', 'Art'],
      axisLabel: {
        show: true,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitNumber: 5,
      axisLabel: {
        show: true,
        formatter: '{value}%', // Display as percentage
      },
    },
    series: [
      {
        name: 'Completed',
        type: 'bar',
        stack: 'progress',
        data: [80, 60, 70, 90, 50],
        itemStyle: { color: '#8C0327' },
      },
      {
        name: 'In Progress',
        type: 'bar',
        stack: 'progress',
        data: [10, 20, 15, 5, 30],
        itemStyle: { color: '#BF3355' },
      },
      {
        name: 'Not Started',
        type: 'bar',
        stack: 'progress',
        data: [10, 20, 15, 5, 20],
        itemStyle: { color: '#F36686' },
      },
    ],
  };


  chartOption: EChartsOption = {
    title: {
      text: 'Reading/Content Completion Trend',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: { }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitNumber: 5,
      axisLabel: { formatter: '{value}%' }
    },
    series: [
      {
        name: 'Completion Rate',
        type: 'line',
        data: [10, 15, 25, 35, 50, 65, 80], // Sample completion data
        smooth: true,
        showSymbol: true,
        areaStyle: { opacity: 0.2 },
        lineStyle: { width: 3, color: '#8c0327' }, // Green line
        itemStyle: { color: '#8c0327' } // Green data points
      }
    ],
    grid: {
      left: '3%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    }
  };
}
