export interface Statistics {
    label: string;
    value: number;
}

export interface KeyValue {
    key: string;
    value: number;
}

export interface Serie {
    name: string;
    type: string;
    stats: Statistics[];
}