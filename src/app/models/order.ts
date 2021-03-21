import { Part } from "./part";

export interface Order {
    parts?: Array<Part>,
    processes?: string,
    diagnosis?: string,
    endedRepair?: boolean,
    refId?: string;
}