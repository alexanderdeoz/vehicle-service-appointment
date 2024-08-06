import { DataSource } from 'typeorm';

export declare class MakeDataSourceAbstract {
  public getData(database: string): Promise<DataSource>;
}
