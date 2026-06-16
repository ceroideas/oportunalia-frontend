import { environment } from '../environments/environment';

export class GlobalConstants {
  public static apiURL: string = environment.apiUrl;
  public static apiBase: string = environment.apiBase;
}
