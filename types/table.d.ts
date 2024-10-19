import type { Component } from "vue";

export interface TableValueFilter {
    label: string;
    value: string;
    icon?: Component;
}

export interface TableFilter {
    name: string;
    label: string;
    values: TableValueFilter[];
}
