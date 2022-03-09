import { union } from "lodash";
import { Serie, Statistics } from "./statistics";

export class ReportData {

    private _series: Serie[] = [];

    addSerie(serie: Serie) {
        this._series.push(serie);
    }

    serieData(index: number): any {
        return {
            name: this._series[0].name,
            type: this._series[0].type,
            data: this._series[0].stats.map(x => x.value)
        }
    }

    data(): any {
        return this._series.map(x => {
            return {
                name: x.name,
                type: x.type,
                data: x.stats.map(x => x.value)
            }
        });
    }

    labels(): string[] {
        let lablesArray = this._series.map(x => x.stats.map(x => x.label));
        return [...new Set([].concat(...lablesArray))];
    }
}
