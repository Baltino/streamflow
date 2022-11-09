export enum StatusRequest {
  initial = 'initial',
  in_progress = 'inprogress',
  success = 'success',
  error = 'error'
}

export type StateResponse = {
  data: Array<any>;
  error: string;
  status: StatusRequest;
}