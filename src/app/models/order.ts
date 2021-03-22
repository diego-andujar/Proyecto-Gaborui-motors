import { Part } from "./part";

export interface Order {
    parts?: Array<Part>,
    processes?: Array<Part>,
    diagnosis?: string,
    endedRepair?: boolean,
    refId?: string;
}