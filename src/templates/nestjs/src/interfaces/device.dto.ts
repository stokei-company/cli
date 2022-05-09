export interface DeviceDTO {
  readonly type: string;
  readonly version: string;
  readonly system: string;
  readonly name: string;
  readonly language: string;
  readonly browser?: string;
  readonly browserVersion?: string;
}
