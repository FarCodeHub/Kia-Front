import { QuestionService } from 'app/modules/admin/services/question.service';
import { Question } from 'app/shared/models/question.model';
import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { ReportData } from '../../models/report.data.model';
import { Serie } from '../../models/statistics';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-home-page2',
  templateUrl: './home-page2.component.html',
  styleUrls: ['./home-page2.component.scss']
})
export class HomePage2Component implements OnInit {
  questionsData: ReportData;
  answersData: ReportData;
  questionsOptions: ApexOptions = {};
  answersOptions: ApexOptions = {};
  selectedQuestionId: number;
  questions: Question[];

  constructor(private _reportService: ReportService,
    private _questionService: QuestionService) { }

  ngOnInit(): void {
    forkJoin([
      this._reportService.getQuestionsStatistics('2021-01-01', '2022-06-01'),
      this._reportService.getAnswersStatistics('2021-01-01', '2022-06-01', 10),
      this._questionService.getAll(100, 1)
    ]).subscribe(result => {

      let report = new ReportData()
      report.addSerie(<Serie>{ name: 'سوالات', type: 'column', stats: result[0] });
      this.questionsData = report;



      this.questions = result[2].data;
      this.selectedQuestionId = this.questions[0].id;
      this.prepareChartData();
    });

  }

  onQuestionChanged() {
    this._reportService.getAnswersStatistics('2021-01-01', '2022-06-01', this.selectedQuestionId).subscribe(result => {
      let report2 = new ReportData()
      report2.addSerie(<Serie>{ name: 'جواب سوال', type: 'line', stats: result });
      this.answersData = report2;
      this.prepareChartData2();
    })
  }

  private prepareChartData(): void {
    // Github issues
    this.questionsOptions = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#64748B', '#94A3B8'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
          borderWidth: 0
        }
      },
      grid: {
        borderColor: 'var(--fuse-border)'
      },
      labels: this.questionsData.labels(),
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: this.questionsData.data(),
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75
          }
        }
      },
      stroke: {
        width: [3, 0]
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      }
    };

  }

  private prepareChartData2() {
    this.answersOptions = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'bar',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#64748B', '#94A3B8'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
          borderWidth: 0
        }
      },
      grid: {
        borderColor: 'var(--fuse-border)'
      },
      labels: this.answersData.labels(),
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: this.answersData.data(),
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75
          }
        }
      },
      stroke: {
        width: [3, 0]
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      }
    };
  }

}
