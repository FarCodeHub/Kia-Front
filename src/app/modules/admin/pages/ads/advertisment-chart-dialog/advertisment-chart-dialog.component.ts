import { Component, OnInit } from '@angular/core';
import { ReportData } from 'app/modules/landing/models/report.data.model';
import { Serie } from 'app/modules/landing/models/statistics';
import { ReportService } from 'app/modules/landing/services/report.service';
import { ApexOptions } from 'ng-apexcharts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-advertisment-chart-dialog',
  templateUrl: './advertisment-chart-dialog.component.html',
  styleUrls: ['./advertisment-chart-dialog.component.scss']
})
export class AdvertismentChartDialogComponent implements OnInit {
    reportData: ReportData;
    reportOptions: ApexOptions = {};
  constructor(private _reportService: ReportService) { }

  ngOnInit(): void {
    forkJoin([
        this._reportService.getCommunicationsStatistics('2021-01-01', '2022-06-01',1),
        this._reportService.getCommunicationsStatistics('2021-01-01', '2022-06-01',2),
      ]).subscribe(result => {

        this.reportData = new ReportData()
        this.reportData.addSerie(<Serie>{ name: 'میانگین تماس ها', type: 'area', stats: result[0] });
        this.reportData.addSerie(<Serie>{ name: 'تعداد تماس در بازه', type: 'area', stats: result[1] });

        this.prepareChartData();
      });

  }

  private prepareChartData() {
    this.reportOptions = {
        chart: {
            height: 350,
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },

      labels: this.reportData.labels(),

      series: this.reportData.data(),


    };
  }

}
