export interface ScanRule {
    name: string;
    id: string;
    regex: RegExp;
    severity: 'CRITICAL' | 'HIGH' | 'LOW';
    message: string;
}