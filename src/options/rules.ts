import type { ScanRule } from "../types";

export const rules: ScanRule[] = [
    {
        id: 'aws-key',
        name: 'AWS Access Key',
        regex: /AKIA[0-9A-Z]{16}/g,
        severity: 'CRITICAL',
        message: 'AWS access key exposed. That is a high issue.'
    },
    {
        id: 'private-key',
        name: 'Private Key',
        regex: /-----BEGIN RSA PRIVATE KEY-----/g,
        severity: 'CRITICAL',
        message: 'Private RSA key exposed. That is a high issue.'
    },
    {
        id: "jwt-secret",
        name: "JWT Secret Token",
        regex: /(jwt|secret|token|auth).?[:=].?['"][a-zA-Z0-9_-]{32,}['"]/gi,
        severity: 'CRITICAL',
        message: "JWT secret key exposed. That is a high issue."
    },
    {
        id: "custom-secret",
        name: "",
        regex: /(key|pass|password|secret).?[:=].?['"][a-zA-Z0-9]{16,}['"]/gi,
        severity: "HIGH",
        message: "A custom or third-party secret key exposed."
    }
];