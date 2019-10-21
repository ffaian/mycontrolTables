namespace mycontrolTables; 
entity Holidays {
        key zDate  : DateTime @title: '{Holiday_date}';
        key Province_Id : String(2) @title: '{i18n>Province_id}';
            Holiday_Id : String(2) @title: '{i18n>Holiday_id}';
            Holiday1 : Association to Holiday_MD;
            Province1 : Association to Province_MD;
    };
entity Province_MD {
      key Province_id : String(2) @title: '{i18n>Province_id}';
            zName     : String(60) @title: '{i18n>Province_nm}';
            inhabitants : Association[*] to Holidays on inhabitants.Province_Id = Province_id;
};
entity Holiday_MD {
      key Holiday_Id : String(2) @title: '{i18n>Holiday_id}';
           zName     : String(60) @title: '{i18n>Holiday_nm}';
           inhabitants : Association[*] to Holidays on inhabitants.Holiday_Id = Holiday_Id;
};
    