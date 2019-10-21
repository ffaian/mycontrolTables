using { mycontrolTables } from '../db/data-model';
service CatalogService {
  entity Holidays as projection on mycontrolTables.Holidays;
  entity Province_MD as projection on mycontrolTables.Province_MD;
  entity Holiday_MD as projection on mycontrolTables.Holiday_MD;
}